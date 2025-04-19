
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { positivePrompt, width = 1024, height = 1024 } = await req.json();
    const openaiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openaiKey) {
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: 'OpenAI API key not configured'
        }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Processing image generation request:', {
      prompt: positivePrompt,
      width,
      height,
      hasApiKey: !!openaiKey
    });

    // Make the API call to OpenAI
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: positivePrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url"
      }),
    });

    console.log('OpenAI API Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: errorData.error?.message || `Failed to generate image: ${response.statusText}`,
          errors: [{ code: 'API_ERROR', message: errorData.error?.message }]
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    console.log('OpenAI API Response:', data);

    if (!data.data?.[0]?.url) {
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: 'No image URL received from OpenAI'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ imageUrl: data.data[0].url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({
        error: true,
        errorMessage: error.message || 'An unexpected error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
