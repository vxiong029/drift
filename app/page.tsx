"use client";
import QuickActions from "./components/home/QuickActions";
import Timeline from "./components/home/Timeline";
import { useLogs } from "./context/LogsContext";

export default function Home() {
  const { logs } = useLogs();
  return (
    <div className="space-y-6">        
      <QuickActions />
      <Timeline logs={logs} />
    </div>
  );
}
