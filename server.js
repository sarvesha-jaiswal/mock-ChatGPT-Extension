const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/question', (req, res) => {
  const question = req.body.question;
  const response = getMockResponse(question);
  res.json({ response });
});

function getMockResponse(question) {
  // Customize the mock response based on the question
  if (question.toLowerCase() === 'how are you?') {
    return "I'm doing well, thank you!";
  } else {
    return 'Hello from GenAI!';
  }
}

app.listen(PORT, () => {
  console.log(`Mock API server is running on port ${PORT}`);
});
