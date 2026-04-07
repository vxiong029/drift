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