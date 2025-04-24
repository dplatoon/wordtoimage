
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
  // Clean prompt - DALL-E has strict requirements for prompt formatting
  const cleanedPrompt = prompt.trim();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: cleanedPrompt,
      n: 1, // DALL-E 3 only supports n=1
      size: size,
      quality: quality,
      response_format: "url"
    })
  };

  console.log('OpenAI Request:', JSON.stringify({
    model: "dall-e-3",
    prompt: cleanedPrompt.substring(0, 30) + "...",
    size: size,
    quality: quality
  }));

  try {
    console.log('Sending request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/images/generations', requestOptions);
    console.log('Response status:', response.status, response.statusText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }
      
      console.error('OpenAI API Error Status:', response.status, response.statusText);
      if (errorData) console.error('OpenAI API Error Details:', errorData);
      
      throw {
        isOpenAI: true,
        response,
        errorData
      };
    }

    const responseData = await response.json();
    console.log('OpenAI API response received successfully');
    return responseData;
  } catch (error) {
    console.error('OpenAI API Error Details:', error);
    throw error;
  }
}
