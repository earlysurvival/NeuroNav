export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  TASK_BREAKDOWN = 'TASK_BREAKDOWN',
  IMPULSE_GUARD = 'IMPULSE_GUARD',
  BRAIN_DUMP = 'BRAIN_DUMP',
  BODY_DOUBLE = 'BODY_DOUBLE',
  ABOUT = 'ABOUT'
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