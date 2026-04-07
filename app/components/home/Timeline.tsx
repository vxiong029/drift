import { LogEntry } from "@/app/types/log";
import { useLogs } from "@/app/context/LogsContext";
import Section from "./Section";

const groupByDay = (logs: LogEntry[]) => {
  return logs.reduce((groups: Record<string, LogEntry[]>, log) => {
    const dateKey = new Date(log.startTime).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(log);
    return groups;
  }, {});
}

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) return 'Today';

  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function Timeline({ logs }: { logs: LogEntry[] }) {
  const sortedLogs = [...logs].sort(
  (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return (
    <>  
      {Object.entries(groupByDay(sortedLogs))
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([date, dayLogs]) =>
        (
          <Section key={date} title={formatDateLabel(date)} logs={dayLogs} />
        ))}
    </>
  )
}