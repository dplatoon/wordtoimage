import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { prompt, style, resolution = "1024x1024", settings = {} } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      throw new Error("Prompt is required");
    }

    console.log("Generating image for user:", user.id, "prompt:", prompt);

    // Check user credits
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits, subscription_tier")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      throw new Error("Failed to fetch user profile");
    }

    if (profile.subscription_tier === "free" && profile.credits <= 0) {
      return new Response(
        JSON.stringify({ error: "Insufficient credits. Please upgrade or wait for daily refresh." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 402 }
      );
    }

    // Apply style template if provided
    let enhancedPrompt = prompt;
    if (style) {
      const { data: template } = await supabase
        .from("style_templates")
        .select("prompt_template")
        .eq("name", style)
        .single();

      if (template) {
        enhancedPrompt = template.prompt_template.replace("{prompt}", prompt);
      }
    }

    console.log("Enhanced prompt:", enhancedPrompt);

    // Generate image using Lovable AI Gateway
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: enhancedPrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`Image generation failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const imageBase64 = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageBase64) {
      throw new Error("No image returned from AI");
    }

    console.log("Image generated successfully");

    // Convert base64 to blob and upload to Supabase Storage
    const base64Data = imageBase64.split(",")[1];
    const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    
    const fileName = `${user.id}/${crypto.randomUUID()}.png`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("generated-images")
      .upload(fileName, imageBuffer, {
        contentType: "image/png",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Failed to upload image");
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("generated-images")
      .getPublicUrl(fileName);

    console.log("Image uploaded to storage:", publicUrl);

    // Save generation to database
    const { data: generation, error: insertError } = await supabase
      .from("generations")
      .insert({
        user_id: user.id,
        prompt,
        enhanced_prompt: enhancedPrompt,
        style,
        resolution,
        image_url: publicUrl,
        storage_path: fileName,
        settings,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error("Failed to save generation");
    }

    // Deduct credit for free tier users
    if (profile.subscription_tier === "free") {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ credits: profile.credits - 1 })
        .eq("id", user.id);

      if (updateError) {
        console.error("Credit update error:", updateError);
      }
    }

    console.log("Generation complete:", generation.id);

    return new Response(
      JSON.stringify({
        success: true,
        generation,
        creditsRemaining: profile.subscription_tier === "free" ? profile.credits - 1 : "unlimited",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-image:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
