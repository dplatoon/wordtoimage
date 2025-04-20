
export async function generateDalleImage({
  prompt,
  n,
  size,
  quality,
  openaiKey
}: {
  prompt: string;
  n: number;
  size: string;
  quality: string;
  openaiKey: string;
}) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n,
      size,
      quality,
      response_format: "url"
    })
  };

  const response = await fetch('https://api.openai.com/v1/images/generations', requestOptions);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }
    throw {
      isOpenAI: true,
      response,
      errorData
    };
  }

  return response.json();
}
