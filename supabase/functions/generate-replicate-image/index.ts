
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Replicate from "https://esm.sh/replicate@0.25.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body received");
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(requestBody);
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "Invalid JSON in request body",
          errors: [{ code: "VALIDATION_ERROR", message: "Invalid JSON format" }]
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const { prompt, sourceImage = null, userId = null, size = "1024x1024" } = parsedBody;

    // Get Replicate API key
    const replicateApiKey = Deno.env.get("REPLICATE_API_KEY");
    if (!replicateApiKey) {
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "Replicate API key not configured",
          errors: [{ code: "API_NOT_FOUND", message: "API key not found in environment" }]
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: "Invalid prompt",
          errors: [{ code: "VALIDATION_ERROR", message: "Prompt is required and must be a non-empty string" }]
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Initialize Replicate
    const replicate = new Replicate({
      auth: replicateApiKey,
    });

    console.log("Processing image generation request:", {
      prompt: prompt.substring(0, 30) + "...",
      hasSourceImage: !!sourceImage,
      userId: userId || "anonymous"
    });

    let output;
    try {
      if (sourceImage) {
        // Image-to-image generation using FLUX
        console.log("Using image-to-image generation with FLUX");
        output = await replicate.run(
          "black-forest-labs/flux-canny-pro",
          {
            input: {
              prompt: prompt,
              image: sourceImage,
              guidance_scale: 3.5,
              num_inference_steps: 28,
              width: parseInt(size.split('x')[0]) || 1024,
              height: parseInt(size.split('x')[1]) || 1024,
              output_format: "webp",
              output_quality: 90,
              safety_tolerance: 2
            }
          }
        );
      } else {
        // Text-to-image generation using FLUX Schnell
        console.log("Using text-to-image generation with FLUX Schnell");
        output = await replicate.run(
          "black-forest-labs/flux-schnell",
          {
            input: {
              prompt: prompt,
              go_fast: true,
              megapixels: "1",
              num_outputs: 1,
              aspect_ratio: size === "1024x1024" ? "1:1" : size === "1792x1024" ? "16:9" : "1:1",
              output_format: "webp",
              output_quality: 80,
              num_inference_steps: 4
            }
          }
        );
      }

      console.log("Replicate generation completed");

      if (!output || !output[0]) {
        throw new Error("No image URL received from Replicate");
      }

      const imageUrl = Array.isArray(output) ? output[0] : output;
      const promptId = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      
      const metadata = {
        model: sourceImage ? "flux-canny-pro" : "flux-schnell",
        promptId,
        size: size,
        createdAt,
        userId: userId || undefined,
        isImageToImage: !!sourceImage
      };

      // Log to database if Supabase is configured
      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && userId) {
        try {
          const logResponse = await fetch(`${SUPABASE_URL}/rest/v1/generations`, {
            method: 'POST',
            headers: {
              apikey: SUPABASE_SERVICE_ROLE_KEY,
              Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal'
            },
            body: JSON.stringify({
              user_id: userId,
              prompt: prompt,
              image_url: imageUrl,
              resolution: size,
              style: metadata.model,
              created_at: createdAt
            })
          });

          if (!logResponse.ok) {
            console.error("Failed to log image generation:", await logResponse.text());
          }
        } catch (logError) {
          console.error("Failed to log image generation:", logError);
        }
      }

      console.log("Successfully generated image, returning URL");
      return new Response(
        JSON.stringify({
          imageUrl: imageUrl,
          usingServerKey: true,
          metadata: metadata
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );

    } catch (err) {
      console.error("Replicate API Error:", err);
      
      let errorMessage = "Failed to generate image";
      let errorCode = "API_ERROR";
      
      if (err.message) {
        errorMessage = err.message;
        if (err.message.includes("NSFW")) {
          errorCode = "CONTENT_POLICY";
          errorMessage = "Content policy violation detected. Please try a different prompt.";
        } else if (err.message.includes("rate limit")) {
          errorCode = "RATE_LIMIT";
          errorMessage = "Rate limit exceeded. Please try again later.";
        }
      }

      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: errorMessage,
          errors: [{ code: errorCode, message: errorMessage }]
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

  } catch (error) {
    console.error("Edge function error:", error.stack || error);
    return new Response(
      JSON.stringify({
        error: true,
        errorMessage: error.message || "An unexpected error occurred",
        errors: [{ code: "RUNTIME_ERROR", message: error.message || "Unknown error" }]
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
