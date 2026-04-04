export type LogType = 'sleep' | 'feed' | 'diaper' 

export interface LogEntry {
  id: string;
  type: LogType;
  startTime: number;
  endTime?: number;
  details?: string;
}