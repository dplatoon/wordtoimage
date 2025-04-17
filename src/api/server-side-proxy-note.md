# Server-Side Proxy for Runware AI

For production use, you should implement a server-side proxy that securely handles the Runware AI API calls. Here's how you can implement this using Supabase Edge Functions:

## 1. Create a Supabase Edge Function

Create a new edge function at `supabase/functions/generate-runware-image/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RUNWARE_API_URL = "https://api.runware.ai/v1";

serve(async (req) => {
  try {
    // Get the request body (the image generation parameters)
    const params = await req.json();
    
    // Get the API key from environment variables (securely stored in Supabase)
    const apiKey = Deno.env.get("RUNWARE_API_KEY");
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare the Runware API request payload
    const payload = [
      {
        taskType: "authentication",
        apiKey: apiKey
      },
      {
        taskType: "imageInference",
        taskUUID: crypto.randomUUID(),
        positivePrompt: params.positivePrompt,
        width: params.width || 1024,
        height: params.height || 1024,
        model: params.model || "runware:100@1",
        numberResults: params.numberResults || 1
      }
    ];

    // Make the API call to Runware AI
    const response = await fetch(RUNWARE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    // Check for errors
    if (!response.ok || result.error || result.errors) {
      const errorMessage = result.errorMessage || 
                           result.errors?.[0]?.message || 
                           "Unknown error generating image";
      
      return new Response(
        JSON.stringify({ error: true, message: errorMessage }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the image information in the response
    const imageData = result.data.find(item => item.taskType === "imageInference");
    
    if (!imageData || !imageData.imageURL) {
      return new Response(
        JSON.stringify({ error: true, message: "No image was generated" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the image URL
    return new Response(
      JSON.stringify({ imageUrl: imageData.imageURL }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: true, message: error.message || "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
```

## 2. Set up the API key in Supabase Secrets

In your Supabase project dashboard:
1. Go to Settings > API
2. Look for "Edge Function Secrets"
3. Add a new secret with key `RUNWARE_API_KEY` and your actual API key as the value

## 3. Deploy the Edge Function

Deploy your edge function using the Supabase CLI:

```bash
supabase functions deploy generate-runware-image
```

## 4. Update the Frontend to Use the Edge Function

In your frontend code, make API calls to your Supabase edge function URL instead of directly to Runware:

```typescript
// Call your secure proxy endpoint
const response = await fetch('https://[YOUR-SUPABASE-PROJECT].supabase.co/functions/v1/generate-runware-image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    positivePrompt: prompt,
    // other parameters...
  })
});
```

This ensures that your API keys are never exposed to the client.
