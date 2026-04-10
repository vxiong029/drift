'use client';
import { act, createContext, useContext, useEffect, useState } from "react";
import { LogEntry, LogType } from "../types/log";
import * as storage from "../lib/storage";

// Define the shape of our context
interface LogsContextType {
  logs: LogEntry[];
  activeLog: LogEntry | null;
  addLog: (type: LogType, description?: string) => void;
  startLog: (type: LogType, description?: string) => void;
  stopLog: (id: string) => void;
  clearLogs: () => void;
  deleteLog: (id: string) => void;
}

// Create the context
const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const activeLog = logs.find((log) => log.status === "active") || null;

  useEffect(() => {
    // Load logs from localStorage on mount
    const storedLogs = storage.getLogs();
    setLogs(storedLogs);
  }, []); 

  const addLog = (type: LogType, description?: string) => {
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      type,
      startTime: new Date().getTime(),
      details: description,
      status: 'completed',
    }

    const updatedLogs = storage.addLog(newLog);
    setLogs(updatedLogs);
  };

  const startLog = (type: LogType, description?: string) => {
    if (activeLog) {
      alert("Please stop the active log before starting a new one.");
      return;
    }

    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      type,
      startTime: new Date().getTime(),
      details: description,
      status: 'active',
    }
  
    const updatedLogs = storage.addLog(newLog);
    setLogs(updatedLogs);
  };

  const stopLog = (id: string) => {
    const logToStop = logs.find((log) => log.id === id);
    if (!logToStop) return;

    const updatedLog: LogEntry = {
      ...logToStop,
      endTime: new Date().getTime(),
      status: 'completed',
    };

    const updatedLogs = logs.map((log) =>
      log.id === id ? updatedLog : log
    );

    storage.saveLogs(updatedLogs);
    setLogs(updatedLogs);
  };

  const clearLogs = () => {
    storage.clearLogs();
    setLogs([]);
  };

  const deleteLog = (id: string) => {
    const updatedLogs = storage.deleteLog(id);
    setLogs(updatedLogs);
  }

  return (
    <LogsContext.Provider value={{ logs, activeLog, addLog, startLog, stopLog, clearLogs, deleteLog }}>
      {children}
    </LogsContext.Provider>
  );
}

// Custom hook for easy access to the context
export const useLogs = () => {
  const context = useContext(LogsContext);
  if (!context) {
    throw new Error("useLogs must be used within a LogsProvider");
  }
  return context;
}