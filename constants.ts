import { Brain, ShieldAlert, ListTodo, Users, Zap, Clock, CheckCircle2, AlertTriangle, Sparkles, MessageCircleHeart, Flower, Trophy, CalendarDays, Terminal } from 'lucide-react';

export const APP_NAME = "NeuroNav";
export const HOURLY_RATE = 20;

export const MODE_CONFIG = {
  TASK_BOARD: {
    title: "Smart Plan",
    icon: CalendarDays,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    description: "Calendar & tasks."
  },
  TASK_BREAKDOWN: {
    title: "Task Breakdown",
    icon: ListTodo,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    description: "Visual de-overwhelm tool."
  },
  AI_FRIEND: {
    title: "Kai (Therapeutic Pet)",
    icon: MessageCircleHeart,
    color: "text-pink-500 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    description: "Your soothing digital emotional support creature."
  },
  IMPULSE_GUARD: {
    title: "Impulse Guard",
    icon: ShieldAlert,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    description: "Stop the spending spiral."
  },
  MINDFULNESS: {
    title: "Mindfulness",
    icon: Flower,
    color: "text-teal-500 dark:text-teal-400",
    bgColor: "bg-teal-100 dark:bg-teal-900/30",
    description: "Reset your nervous system."
  },
  BRAIN_DUMP: {
    title: "Brain Dump",
    icon: Brain,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30",
    description: "Chaos to structure."
  },
  REWARD: {
    title: "Dopamine Depot",
    icon: Trophy,
    color: "text-yellow-500 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    description: "Gamified wins & streaks."
  },
  BODY_DOUBLE: {
    title: "Body Double",
    icon: Users,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    description: "Presence without judgment."
  },
  DEVELOPER: {
    title: "Dev Console",
    icon: Terminal,
    color: "text-gray-800 dark:text-gray-200",
    bgColor: "bg-gray-200 dark:bg-gray-800",
    description: "Restricted Access."
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