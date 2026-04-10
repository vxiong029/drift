import { LogType } from './log';

type ActionType = {
  label: string;
  description?: string;
  icon: string;
  kind: 'instant' | 'timed';
  requiresDetails: boolean;
  options?: {
    label: string;
    value: string;
  }[];
}

export const ACTION_CONFIG: Record<LogType, ActionType> = {
  sleep: {
    label: 'Sleep',
    icon: '😴',
    kind: 'timed',
    requiresDetails: false
  },
  feed: {
    label: 'Feed',
    description: 'Which side?',
    icon: '🍼',
    kind: 'timed',
    requiresDetails: true,
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
      { label: 'Both', value: 'both' }
    ]
  },
  diaper: {
    label: 'Diaper',
    description: 'What type of change?',
    icon: '🧷',
    kind: 'instant',
    requiresDetails: true,
    options: [
      { label: '💧', value: 'pee' },
      { label: '💩', value: 'poop' },
      { label: '💧💩', value: 'both' }
    ]
  }
};