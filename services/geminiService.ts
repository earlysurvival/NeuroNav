
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT, HOURLY_RATE } from "../constants";
import { ReflectionResponse, BrainDumpResult, ActionPlan } from "../types";

/**
 * Apex Neuro-Architect API Service
 * Adheres to @google/genai coding guidelines.
 */

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Vision Engine: Intent Extraction from images
 */
export const analyzeImageForBreakdown = async (base64Data: string, mimeType: string): Promise<ActionPlan> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: "Analyze this visual context. Perform 'Intent Extraction'. Provide 3-5 micro-actions to lower the activation barrier. Include a WhyWire explanation." }
      ]
    },
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          content: { type: Type.STRING, description: "A sophisticated intro message." },
          whyWire: { type: Type.STRING, description: "The biological reason for the struggle." },
          actions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                text: { type: Type.STRING },
                isCompleted: { type: Type.BOOLEAN }
              },
              required: ["id", "text", "isCompleted"]
            }
          }
        },
        required: ["content", "whyWire", "actions"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

/**
 * Executive Planner: Categorize brain dumps
 */
export const processBrainDump = async (input: string): Promise<{ data: BrainDumpResult }> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Categorize the following brain dump: "${input}". Focus on strategic anchors.`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          data: {
            type: Type.OBJECT,
            properties: {
              whyWire: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    task: { type: Type.STRING },
                    priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                    timeEstimate: { type: Type.STRING },
                    dopamine: { type: Type.NUMBER, description: "Reward score 1-10" }
                  },
                  required: ["task", "priority", "timeEstimate", "dopamine"]
                }
              }
            },
            required: ["whyWire", "tasks"]
          }
        }
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

/**
 * Neuro-Coach: High-status body doubling and focus check-ins
 */
export const chatWithFriend = async (history: any[], message: string) => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Conversation History: ${JSON.stringify(history)}\n\nUser: ${message}`,
    config: {
      systemInstruction: SYSTEM_PROMPT + "\nYou are Kai, the high-status Neuro-Coach. Provide a tactical pivot or validation.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          content: { type: Type.STRING },
          whyWire: { type: Type.STRING }
        },
        required: ["content", "whyWire"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

/**
 * Body Double: Periodic check-in messages
 */
export const getBodyDoubleCheckin = async (minutes: number) => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user has been focusing for ${minutes} minutes. Provide a calm, high-status check-in message.`,
    config: {
      systemInstruction: SYSTEM_PROMPT + "\nYou are the Virtual Body Double. Stay present and focused.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          content: { type: Type.STRING },
          whyWire: { type: Type.STRING }
        },
        required: ["content", "whyWire"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

/**
 * Impulse Guard: Financial-to-Time conversion analysis
 */
export const calculateImpulseCost = async (item: string, price: number) => {
  const ai = getClient();
  const hours = price / HOURLY_RATE;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze impulse purchase of "${item}" costing $${price}. Life-cost is approximately ${hours.toFixed(1)} hours of deep work.`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          content: { type: Type.STRING },
          whyWire: { type: Type.STRING },
          data: {
            type: Type.OBJECT,
            properties: {
              hoursCost: { type: Type.NUMBER },
              waitMessage: { type: Type.STRING }
            }
          }
        }
      }
    }
  });

  const res = JSON.parse(response.text || "{}");
  if (res.data) res.data.hoursCost = hours;
  return res;
};

/**
 * Apex Reflection: Evening ritual generator
 */
export const generateEveningReflection = async (tasks: any[]): Promise<ReflectionResponse> => {
  const ai = getClient();
  const taskSummary = tasks.map(t => `${t.title} (${t.completed ? 'Done' : 'Pending'})`).join(', ');
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Summarize the day's performance based on these tasks: ${taskSummary}. Perform an 'Apex Reflection'.`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bigWin: { type: Type.STRING },
          neuralPivot: { type: Type.STRING, description: "What to shield against tomorrow." },
          successQuote: { type: Type.STRING, description: "Sophisticated quote for high performers." },
          biology: { type: Type.STRING },
          strategy: { type: Type.STRING }
        },
        required: ["bigWin", "neuralPivot", "successQuote", "biology", "strategy"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};