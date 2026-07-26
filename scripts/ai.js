import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey:import.meta.env.GEMINAI_API_KEY
});

export async function extractCommitment(text) {
  const prompt = `
You are an AI that extracts structured commitments.

Return ONLY valid JSON.

Schema:

{
  "task": "",
  "person": "",
  "reason": "",
  "emotion": "",
  "emotional_weight": 1,
  "due_date": null
}

Rules:

- emotional_weight must be between 1 and 10.
- If no person exists return null.
- If no due date exists return null.
- Don't explain anything.
- Return JSON only.

User Input:

${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let output = response.text.trim();

  if (output.startsWith("```")) {
    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  }

  return JSON.parse(output);
}