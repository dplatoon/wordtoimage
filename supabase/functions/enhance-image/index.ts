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

    const { imageUrl, editPrompt, enhancementType = "edit" } = await req.json();

    if (!imageUrl) {
      throw new Error("Image URL is required");
    }

    console.log("Enhancing image for user:", user.id, "type:", enhancementType);

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

    // Build the enhancement prompt based on type
    let enhancementPrompt = "";
    switch (enhancementType) {
      case "upscale":
        enhancementPrompt = "Enhance this image to higher quality and resolution while preserving all details. Make it sharper and clearer.";
        break;
      case "denoise":
        enhancementPrompt = "Remove noise and grain from this image while preserving important details and textures.";
        break;
      case "colorize":
        enhancementPrompt = "Add vibrant, natural colors to this image while maintaining the composition and details.";
        break;
      case "style-transfer":
        enhancementPrompt = editPrompt || "Apply an artistic style to this image.";
        break;
      case "background-remove":
        enhancementPrompt = "Remove the background from this image, keeping only the main subject with a transparent background.";
        break;
      case "edit":
      default:
        enhancementPrompt = editPrompt || "Enhance this image while maintaining its core composition.";
        break;
    }

    console.log("Enhancement prompt:", enhancementPrompt);

    // Use Lovable AI for image editing
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
            content: [
              {
                type: "text",
                text: enhancementPrompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 429 }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 402 }
        );
      }
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      throw new Error(`Image enhancement failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const enhancedImageBase64 = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!enhancedImageBase64) {
      throw new Error("No enhanced image returned from AI");
    }

    console.log("Image enhanced successfully");

    // Convert base64 to blob and upload to Supabase Storage
    const base64Data = enhancedImageBase64.split(",")[1];
    const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    
    const fileName = `${user.id}/${crypto.randomUUID()}-enhanced.png`;
    const { error: uploadError } = await supabase.storage
      .from("generated-images")
      .upload(fileName, imageBuffer, {
        contentType: "image/png",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Failed to upload enhanced image");
    }

    // Get signed URL (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("generated-images")
      .createSignedUrl(fileName, 3600);

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error("Signed URL error:", signedUrlError);
      throw new Error("Failed to generate signed URL");
    }

    const enhancedImageUrl = signedUrlData.signedUrl;
    console.log("Enhanced image uploaded with signed URL");

    // Save enhancement to database as a generation
    const { data: generation, error: insertError } = await supabase
      .from("generations")
      .insert({
        user_id: user.id,
        prompt: `[${enhancementType}] ${enhancementPrompt}`,
        enhanced_prompt: enhancementPrompt,
        style: enhancementType,
        resolution: "1024x1024",
        image_url: enhancedImageUrl,
        storage_path: fileName,
        settings: { enhancementType, originalImage: imageUrl },
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error("Failed to save enhanced generation");
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

    console.log("Enhancement complete:", generation.id);

    return new Response(
      JSON.stringify({
        success: true,
        generation,
        enhancedImageUrl,
        creditsRemaining: profile.subscription_tier === "free" ? profile.credits - 1 : "unlimited",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in enhance-image:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
