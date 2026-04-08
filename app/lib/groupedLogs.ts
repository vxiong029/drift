import { LogEntry } from "../types/log";

export function groupByDay(logs: LogEntry[]) {
  return logs.reduce((groups: Record<string, LogEntry[]>, log) => {
    const dateKey = new Date(log.startTime).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(log);
    return groups;
  }, {});
}

export function formatDateLabel(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) return 'Today';

  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDuration(log: LogEntry) {
  const start = new Date(log.startTime).getTime();
  const end = log.endTime ? new Date(log.endTime).getTime() : Date.now();
  const elapsed = end - start;

  const totalSeconds = Math.floor(elapsed / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;
}