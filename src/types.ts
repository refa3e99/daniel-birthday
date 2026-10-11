export interface SystemStat {
  id: string;
  name: string;
  value: number; // e.g. 99
  category: 'core' | 'intelligence' | 'cyber' | 'chaos';
  description: string;
}

export interface MemoryItem {
  id: string;
  codeName: string;
  title: string;
  timestamp: string;
  year: string;
  image: string;
  summary: string;
  classifiedNote: string;
  tags: string[];
  clearanceLevel: string;
}

export interface AchievementItem {
  id: string;
  code: string;
  title: string;
  points: string;
  description: string;
  iconName: string;
  unlocked: boolean;
}

export interface TerminalLog {
  id: string;
  type: 'command' | 'output' | 'system' | 'error' | 'success';
  text: string;
  timestamp: string;
}
