export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  TASK_BREAKDOWN = 'TASK_BREAKDOWN',
  IMPULSE_GUARD = 'IMPULSE_GUARD',
  BRAIN_DUMP = 'BRAIN_DUMP',
  BODY_DOUBLE = 'BODY_DOUBLE',
  AI_FRIEND = 'AI_FRIEND',
  MINDFULNESS = 'MINDFULNESS',
  REWARD = 'REWARD',
  TASK_BOARD = 'TASK_BOARD',
  ABOUT = 'ABOUT',
  DEVELOPER = 'DEVELOPER'
}

export type AppTheme = 'vapor' | 'neon' | 'swiss' | 'executive';

export interface Task {
  id: string;
  title: string;
  date?: string;
  time?: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface MicroAction {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface BrainDumpTask {
  id: string;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  dopamine: number; // 1-10 scale
  timeEstimate: string;
}

export interface NeuroResponse {
  content: string; // The main formatted response
  whyWire: string; // The scientific fact
  structuredData?: any; // Optional parsed data for charts/lists
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'breakdown' | 'impulse' | 'braindump';
  data?: any;
  whyWire?: string;
}