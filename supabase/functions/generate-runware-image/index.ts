
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
    // Log the request body
    const requestBody = await req.text();
    console.log('Request body:', requestBody);
    
    // Parse the JSON body
    const { prompt, n = 1, size = '1024x1024', quality = 'standard' } = JSON.parse(requestBody);
    
    // Get the OpenAI API key and validate it
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    console.log('OpenAI API Key available:', !!openaiKey);

    if (!openaiKey) {
      console.error('OpenAI API key is not set in environment variables');
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: 'OpenAI API key not configured',
          errors: [{ code: 'API_ERROR', message: 'API key not found in environment' }]
        }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Validate the prompt
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      console.error('Invalid prompt provided:', prompt);
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: 'Invalid prompt',
          errors: [{ code: 'VALIDATION_ERROR', message: 'Prompt is required and must be a non-empty string' }]
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Processing DALL-E 3 image generation request:', {
      prompt: prompt.substring(0, 30) + '...',
      size,
      quality,
      n
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
        prompt: prompt,
        n: n,
        size: size,
        quality: quality,
        response_format: "url"
      }),
    });

    console.log('OpenAI API Response Status:', response.status);
    
    // Handle API response errors
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('OpenAI API Error:', JSON.stringify(errorData));
        
        return new Response(
          JSON.stringify({
            error: true,
            errorMessage: errorData.error?.message || `Failed to generate image: ${response.statusText}`,
            errors: [{ 
              code: 'API_ERROR', 
              message: errorData.error?.message || `HTTP Error: ${response.status}` 
            }]
          }),
          {
            status: response.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      } catch (jsonError) {
        console.error('Failed to parse error response:', jsonError);
        return new Response(
          JSON.stringify({
            error: true,
            errorMessage: `Failed to generate image (HTTP ${response.status})`,
            errors: [{ code: 'API_ERROR', message: `HTTP Error: ${response.status}` }]
          }),
          {
            status: response.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Parse and validate the response
    const data = await response.json();
    console.log('OpenAI API Response:', JSON.stringify(data).substring(0, 200) + '...');

    if (!data.data?.[0]?.url) {
      console.error('No image URL received from OpenAI');
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: 'No image URL received from OpenAI',
          errors: [{ code: 'API_ERROR', message: 'Invalid response format' }]
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Return the successful response
    return new Response(
      JSON.stringify({ imageUrl: data.data[0].url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // Handle any uncaught exceptions
    console.error('Edge function error:', error.stack || error);
    return new Response(
      JSON.stringify({
        error: true,
        errorMessage: error.message || 'An unexpected error occurred',
        errors: [{ code: 'RUNTIME_ERROR', message: error.message || 'Unknown error' }]
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
