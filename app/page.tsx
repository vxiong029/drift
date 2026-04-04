"use client";
import { useState } from "react";
import Header from "./components/home/Header";
import QuickActions from "./components/home/QuickActions";
import { LogEntry, LogType } from "./types/log";
import Timeline from "./components/home/Timeline";
import MicButton from "./components/voice/MicButton";

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (type: LogType, description?: string) => {
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      type,
      startTime: Date.now(),
      details: description,
    };

    console.log("Adding log:", newLog);
    setLogs((prevLogs) => [...prevLogs, newLog]);
  }
  return (
    <div className="space-y-6">        
      <QuickActions onLogAdd={addLog} />
      <Timeline logs={logs} />
    </div>
  );
}
