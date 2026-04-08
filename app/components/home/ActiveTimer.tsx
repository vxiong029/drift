'use client';
import { useLogs } from "@/app/context/LogsContext";
import { LogEntry } from "@/app/types/log";
import { useEffect, useState } from "react";

export default function ActiveTimer({ activeLog }: { activeLog: LogEntry }) {
  const [now, setNow] = useState(Date.now());

  // Update the timer every second when there's an active log
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const start = new Date(activeLog.startTime).getTime();
  const elapsed = now - start;

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-2">
      <div className="text-sm text-neutral-400">
        {activeLog.type === "sleep" && "😴 Sleep in progress"}
        {activeLog.type === "feed" && "🍼 Feeding"}
        {activeLog.type === "diaper" && "🧷 Changing"}
      </div>

      <div className="text-3xl font-mono tracking-wider">
        {formatTime(elapsed)}
      </div>
    </div>
  );
}