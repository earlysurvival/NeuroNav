
export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  VISION = 'VISION',
  PLANNER = 'PLANNER',
  COACH = 'COACH',
  IMPULSE = 'IMPULSE',
  MINDFULNESS = 'MINDFULNESS',
  REFLECTION = 'REFLECTION',
  DEVELOPER = 'DEVELOPER'
}

export type ThemeType = 'zen' | 'neon' | 'swiss' | 'monarch' | 'vapor' | 'executive';
export type AppTheme = ThemeType;

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priorityFactor?: 'Interest' | 'Novelty' | 'Challenge' | 'Urgency' | 'Passion';
  priority?: 'High' | 'Medium' | 'Low';
  estimatedTime?: string;
  date?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface ReflectionResponse {
  bigWin: string;
  neuralPivot: string;
  successQuote: string;
  biology: string;
  strategy: string;
}

export interface MicroAction {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ActionPlan {
  content: string;
  whyWire: string;
  actions: MicroAction[];
}

export interface BrainDumpTask {
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  timeEstimate: string;
  dopamine: number;
}

export interface BrainDumpResult {
  whyWire: string;
  tasks: BrainDumpTask[];
}