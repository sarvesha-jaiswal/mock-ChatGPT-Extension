document.addEventListener("DOMContentLoaded", function () {
  const questionInput = document.getElementById("questionInput");
  const submitButton = document.getElementById("submitButton");
  const responseArea = document.getElementById("response-display");

  submitButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const question = questionInput.value;
    const response = await getResponse(question);
    responseArea.textContent = response;
  });

  async function getResponse(question) {
    if (isMockQuestion(question)) {
      return fetchMockApiResponse(question);
    } else {
      return fetchChatGPTResponse(question);
    }
  }

  function isMockQuestion(question) {
    const mockQuestions = ["how are you?", "what's your name?"];
    return mockQuestions.includes(question.toLowerCase());
  }

  async function fetchMockApiResponse(question) {
    try {
      const apiUrl = "http://localhost:3000/api/question"; // Update with your mock API URL
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching mock response:", error);
      return "An error occurred while fetching the mock response.";
    }
  }

  async function fetchChatGPTResponse(question) {
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
        return data.choices[0].text;
      } else {
        return "No response from the ChatGPT API.";
      }
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
      return "An error occurred while fetching the ChatGPT response.";
    }
  }
});
