import dotenv from "dotenv";
dotenv.config()

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "hi \n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Hi there! How can I help you today?\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    // console.log(result.response.text());
    return result;
  }
  
  export default run;
//   run();