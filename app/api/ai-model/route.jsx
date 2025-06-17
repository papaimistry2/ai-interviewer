import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();
  const FINAL_PROMPT = QUESTIONS_PROMPT
    .replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);
  console.log("Final Prompt:", FINAL_PROMPT);

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GENAI_API_KEY, // Ensure this is set in your .env file
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: FINAL_PROMPT,
    });

    console.log("Full Completion Response:", response);

    // Validate response
    if (!response || !response.text) {
      console.error("Invalid or empty response from Google GenAI:", response);
      return NextResponse.json({ error: "Invalid response from AI model" });
    }

    // Wrap response in a `data` object
    return NextResponse.json({
      data: {
        content: response.text,
      },
    });
  } catch (e) {
    console.error("Error in Google GenAI API call:", e.response?.data || e.message || e);
    return NextResponse.json({ error: "Something went wrong, please try again" });
  }
}