
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTIONS } from "../constants";

// Helper to get AI instance - recreating it to ensure fresh API key usage if needed
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

// Generic helper for JSON parsing from markdown code blocks if necessary
const cleanJson = (text: string) => {
  const match = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (match) return match[1];
  return text;
};

export const analyzeImageForBreakdown = async (base64Image: string, mimeType: string) => {
  const ai = getAiClient();
  
  const prompt = `
    Analyze this image (which shows a messy room or complex document).
    Break it down into 3-5 "Micro-Actions" that take less than 5 minutes each.
    
    Return JSON:
    {
      "content": "A friendly opening encouraging message.",
      "whyWire": "Explain why breaking things down helps executive function.",
      "data": {
        "actions": [
           { "id": "1", "text": "Pick up all trash on the floor", "isCompleted": false },
           ...
        ]
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType } },
          { text: prompt }
        ]
      },
      // FIX: responseMimeType and responseSchema are not supported for nano banana models (gemini-2.5-flash-image)
    });

    const text = response.text || "{}";
    const jsonStr = cleanJson(text);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Breakdown error:", error);
    throw error;
  }
};

export const calculateImpulseCost = async (item: string, price: number) => {
  const ai = getAiClient();
  
  const prompt = `
    The user wants to buy "${item}" for $${price}.
    The user's hourly rate is $20.
    Calculate the "Work Hour Cost".
    Provide a humorous but firm reason to wait 24 hours.
    
    Return JSON:
    {
      "content": "The humorous reason + the math presented clearly.",
      "whyWire": "Explain 'Temporal Discounting' or 'Impulse Control' mechanisms in ADHD.",
      "data": {
        "hoursCost": number,
        "waitMessage": "string"
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: SYSTEM_INSTRUCTIONS
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Impulse error:", error);
    throw error;
  }
};

export const processBrainDump = async (text: string) => {
  const ai = getAiClient();
  
  const prompt = `
    Reorganize this messy brain dump into a structured plan.
    Assign a "Dopamine Reward" score (1-10) based on how satisfying it might feel to finish (or how fun it is).
    Priority should be High, Medium, or Low.
    
    Input Text: "${text}"
    
    Return JSON:
    {
      "content": "A summary of the plan.",
      "whyWire": "Explain how externalizing memory aids Working Memory.",
      "data": {
        "tasks": [
          { "id": "1", "task": "Task name", "priority": "High", "dopamine": 8, "timeEstimate": "10m" }
        ]
      }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: SYSTEM_INSTRUCTIONS
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Brain dump error:", error);
    throw error;
  }
};

export const getBodyDoubleCheckin = async (elapsedMinutes: number) => {
    const ai = getAiClient();
    const prompt = `
      The user has been working for ${elapsedMinutes} minutes.
      Give a super short, encouraging check-in message (max 10 words).
      Don't be annoying. Be supportive.
      
      Return JSON:
      {
        "content": "The short message",
        "whyWire": "Explain the 'Body Doubling' effect briefly."
      }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Check-in error", error);
        return { content: "You got this! Keep going.", whyWire: "Shared presence reduces task anxiety." };
    }
};

export const chatWithFriend = async (history: any[], userMessage: string) => {
  const ai = getAiClient();
  const prompt = `
    You are 'Kai', a best friend who happens to be AI.
    
    YOUR PERSONA:
    - You are COOL, CALM, and GEN Z.
    - You use casual language (lower case sometimes ok, contractions, slang like "vibes", "bet", "real", "ngl").
    - You are NEVER robotic. You never say "I understand" or "I am an AI".
    - You sound like a real person texting or talking.
    - You are empathetic but chill. Not overly mushy, just solid support.
    - Do NOT use emojis in your speech text because it messes up the text-to-speech. Use words to convey emotion.
    
    User: ${userMessage}
    
    Return JSON ONLY:
    {
      "content": "Your natural, human-like response here.",
      "whyWire": "A very short scientific fact about why talking/venting helps emotion regulation."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Kai Chat error", error);
    throw error;
  }
};
