import { LogEntry } from "@/app/types/log";
import Section from "./Section";
import { groupByDay, formatDateLabel } from "@/app/lib/groupedLogs";
import { useState } from "react";

export default function Timeline({ logs }: { logs: LogEntry[] }) {
  // Sort logs by startTime in descending order
  const sortedLogs = [...logs].sort(
  (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  if (sortedLogs.length === 0) {
    return (
      <div className="bg-neutral-900 p-4 rounded-2xl text-sm text-neutral-400">
        No activity for today yet.
      </div>
     )
  }
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