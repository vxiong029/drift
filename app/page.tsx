"use client";
import QuickActions from "./components/home/QuickActions";
import Timeline from "./components/home/Timeline";
import { useLogs } from "./context/LogsContext";

export default function Home() {
  const { logs } = useLogs();
  // Filter logs to only include those from today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const todaysLogs = logs.filter(log => isToday(new Date(log.startTime)));
  return (
    <div className="space-y-6">        
      <QuickActions />
      <Timeline logs={todaysLogs} />
    </div>
  );
}
