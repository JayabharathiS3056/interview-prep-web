const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateInterviewQA = async (role, experience, description) => {
  const prompt = `
    You are an expert technical interviewer.
    Generate 10 interview questions and detailed answers for the following:
    - Job Role: ${role}
    - Experience Level: ${experience}
    - Additional Info: ${description || "None"}

    Respond ONLY in the following JSON format, no extra text, no markdown:
    {
      "questions": [
        {
          "question": "Question here",
          "answer": "Detailed answer here"
        }
      ]
    }
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const text = response.choices[0]?.message?.content || "";
  const cleaned = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  return parsed.questions;
};

const generateConceptExplanation = async (question, answer) => {
  const prompt = `
    Explain the following interview question and answer in simple terms
    that a beginner can understand. Use examples where helpful.

    Question: ${question}
    Answer: ${answer}

    Give a clear, structured explanation in 3-5 paragraphs.
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || "Could not generate explanation.";
};

module.exports = { generateInterviewQA, generateConceptExplanation };