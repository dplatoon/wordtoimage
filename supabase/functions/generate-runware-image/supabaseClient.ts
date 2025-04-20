
export async function logImageGeneration({
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  data,
}: {
  SUPABASE_URL: string | undefined;
  SUPABASE_SERVICE_ROLE_KEY: string | undefined;
  data: {
    user_id?: string | null;
    prompt: string;
    image_url: string;
    size: string;
    model: string;
    quality: string;
    prompt_id: string;
    created_at: string;
  };
}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY; cannot log generation.");
    return { ok: false, error: "Missing configuration." };
  }

  try {
    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/image_generations`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{
        user_id: data.user_id || null,
        prompt: data.prompt,
        image_url: data.image_url,
        size: data.size,
        model: data.model,
        quality: data.quality,
        prompt_id: data.prompt_id,
        created_at: data.created_at
      }])
    });

    if (!dbRes.ok) {
      const errorBody = await dbRes.text();
      console.error("Failed to log image generation:", dbRes.status, errorBody);
      return { ok: false, error: errorBody };
    }
    console.log("Image generation logged to database");
    return { ok: true };
  } catch (err) {
    console.error("Error inserting generation log:", err);
    return { ok: false, error: String(err) };
  }
}
