import { FEEDBACK_PROMPT } from "@/services/Constants";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {conversation} = await req.json();
  console.log('Conversation:', conversation);
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );

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
    console.error(
      "Error in Google GenAI API call:",
      e.response?.data || e.message || e
    );
    return NextResponse.json({
      error: "Something went wrong, please try again",
    });
  }
}
