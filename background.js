chrome.runtime.onMessage.addListener(async function (message) {
  const question = message.question;
  const response = await getResponseFromAPI(question);
  return Promise.resolve(response);
});

async function getResponseFromAPI(question) {
  try {
    const apiKey = "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"; // Replace with your actual ChatGPT API key
    const response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: question,
        max_tokens: 50, // Adjust as needed
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].text; // Extract the response text from the API
    } else {
      return "No response from the API.";
    }
  } catch (error) {
    console.error("Error fetching response:", error);
    return "An error occurred while fetching the response.";
  }
}
