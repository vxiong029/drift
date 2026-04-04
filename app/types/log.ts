export type LogType = 'sleep' | 'feed' | 'diaper' 

export interface Log {
  id: string;
  type: LogType;
  startTime: number;
  endTime?: number;
  details?: string;
}