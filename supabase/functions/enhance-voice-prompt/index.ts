import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { transcript, language = 'en-US' } = await req.json();

    if (!transcript || typeof transcript !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Transcript is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Limit transcript length for security
    const cleanTranscript = transcript.slice(0, 500).trim();

    const systemPrompt = language.startsWith('bn') 
      ? `You are an AI image prompt enhancer. The user spoke a prompt in Bengali. 
         Transform their spoken words into a detailed, vivid image generation prompt in English.
         Add artistic details, lighting, composition, and style suggestions.
         Keep it under 200 words. Return ONLY the enhanced prompt, nothing else.`
      : `You are an AI image prompt enhancer. The user spoke a prompt naturally.
         Transform their spoken words into a detailed, vivid image generation prompt.
         Add artistic details like lighting, composition, colors, mood, and style.
         Keep it under 200 words. Return ONLY the enhanced prompt, nothing else.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Enhance this spoken prompt: "${cleanTranscript}"` }
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error('Failed to enhance prompt');
    }

    const data = await response.json();
    const enhancedPrompt = data.choices?.[0]?.message?.content?.trim();

    if (!enhancedPrompt) {
      return new Response(
        JSON.stringify({ enhancedPrompt: cleanTranscript }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Voice prompt enhanced:', { original: cleanTranscript, enhanced: enhancedPrompt.slice(0, 100) });

    return new Response(
      JSON.stringify({ enhancedPrompt, originalTranscript: cleanTranscript }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in enhance-voice-prompt:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to enhance voice prompt' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
