import { Brain, ShieldAlert, ListTodo, Users, Zap, Clock, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export const APP_NAME = "NeuroNav";
export const HOURLY_RATE = 20;

export const MODE_CONFIG = {
  TASK_BREAKDOWN: {
    title: "Task Breakdown",
    icon: ListTodo,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    description: "Turn overwhelming messes into 5-minute micro-actions."
  },
  IMPULSE_GUARD: {
    title: "Impulse Guard",
    icon: ShieldAlert,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    description: "Pause before you buy. Calculate the real cost."
  },
  BRAIN_DUMP: {
    title: "Brain Dump",
    icon: Brain,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    description: "Organize chaos into a dopamine-ranked plan."
  },
  BODY_DOUBLE: {
    title: "Body Double",
    icon: Users,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    description: "Stay focused with a persistent digital companion."
  }
};

export const SYSTEM_INSTRUCTIONS = `
You are NeuroNav, an AI co-pilot for ADHD brains.
Your Tone: Empathetic, non-judgmental, clear, concise, and slightly humorous where appropriate.
Your Goal: Reduce executive dysfunction friction.

CRITICAL OUTPUT FORMATTING:
- Always use concise bullet points.
- Never write long paragraphs.
- Always provide a "Why-Wire" section at the end of your JSON response.

You must return responses in valid JSON format ONLY, matching this schema:
{
  "content": "The main formatted text response (markdown allowed)",
  "whyWire": "The 2-sentence scientific brain fact",
  "data": { ...any structured data relevant to the specific task... }
}
`;