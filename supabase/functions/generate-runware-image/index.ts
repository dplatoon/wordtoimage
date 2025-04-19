
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
    const { positivePrompt, width, height, model, numberResults } = await req.json();
    const apiKey = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: true, 
          errorMessage: 'No API key provided' 
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing image generation request:', {
      positivePrompt,
      width,
      height,
      model,
      numberResults,
      hasApiKey: !!apiKey
    });

    // Prepare the request payload for Runware API
    const payload = [
      {
        taskType: "authentication",
        apiKey: apiKey
      },
      {
        taskType: "imageInference",
        taskUUID: crypto.randomUUID(),
        positivePrompt: positivePrompt,
        width: width || 1024,
        height: height || 1024,
        model: model || "runware:100@1",
        numberResults: numberResults || 1
      }
    ];

    // Make the API call to Runware
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Runware API Response Status:', response.status);

    // Check if response is HTML (error page) instead of JSON
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      console.error('Received HTML response instead of JSON from Runware API');
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: 'Invalid response from Runware API. Please verify your API key and try again.',
          errors: [{ code: 'INVALID_RESPONSE', message: 'Received HTML instead of JSON' }]
        }),
        { 
          status: 422, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Handle non-OK responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        const textResponse = await response.text();
        console.error('Raw response:', textResponse.substring(0, 500)); // Log first 500 chars
        
        return new Response(
          JSON.stringify({
            error: true,
            errorMessage: 'Failed to parse response from Runware API',
            statusCode: response.status,
            statusText: response.statusText
          }),
          { 
            status: 502, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      console.error('Runware API Error:', errorData);
      
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: errorData?.errorMessage || `Failed to generate image: ${response.statusText}`,
          errors: errorData?.errors || []
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse JSON response safely
    let result;
    try {
      result = await response.json();
      console.log('Received Runware API response:', result);
    } catch (parseError) {
      console.error('Failed to parse successful response:', parseError);
      const textResponse = await response.text();
      console.error('Raw response:', textResponse.substring(0, 500)); // Log first 500 chars
      
      return new Response(
        JSON.stringify({
          error: true,
          errorMessage: 'Invalid JSON response received from Runware API',
        }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Find the image data in the response
    const imageData = result.data?.find(item => item.taskType === "imageInference");
    
    if (!imageData || !imageData.imageURL) {
      return new Response(
        JSON.stringify({ 
          error: true, 
          errorMessage: 'No image URL received from Runware API' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Return successful response with image URL
    return new Response(
      JSON.stringify({ imageUrl: imageData.imageURL }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: true, 
        errorMessage: error.message || 'An unexpected error occurred',
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
