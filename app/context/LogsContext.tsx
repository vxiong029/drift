'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { LogEntry, LogType } from "../types/log";
import * as storage from "../lib/storage";

// Define the shape of our context
interface LogsContextType {
  logs: LogEntry[];
  addLog: (type: LogType, description?: string) => void;
  clearLogs: () => void;
}

// Create the context
const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Load logs from localStorage on mount
    const storedLogs = storage.getLogs();
    setLogs(storedLogs);
  }, []);

  const addLog = (type: LogType, description?: string) => {
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      type,
      startTime: Date.now(),
      details: description,
    };
    
    const updatedLogs = storage.addLog(newLog);
    setLogs(updatedLogs);
  };

  const clearLogs = () => {
    storage.clearLogs();
    setLogs([]);
  };

  return (
    <LogsContext.Provider value={{ logs, addLog, clearLogs }}>
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