import { LogEntry } from "../types/log";

const STORAGE_KEY = "baby-logs";

/**
 * Safely parse JSON
 */
function parse<T>(value: string | null): T | null {
  try {
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

/**
 * Convert string dates back into Date objects
 */
function reviveDates(logs: any[]): LogEntry[] {
  return logs.map((log) => ({
    ...log,
    startTime: new Date(log.startTime),
    endTime: log.endTime ? new Date(log.endTime) : undefined,
  }))
}

export function saveLogs(logs: LogEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getLogs(): LogEntry[] {
  if (typeof window === 'undefined') return []; // localStorage is not available on the server

  const data = localStorage.getItem(STORAGE_KEY);
  const parsed = parse<any[]>(data)

  if (!parsed) {
    const seed: LogEntry[] = [
      {
        id: '1',
        type: 'sleep',
        startTime: new Date(Date.now()).getTime(), 
      },
    ]
    
    saveLogs(seed)
    return seed
  }

  return reviveDates(parsed)
}

export function clearLogs() {
  localStorage.removeItem(STORAGE_KEY);
}

export function addLog(newLog: LogEntry): LogEntry[] {
  const existing = getLogs()
  const updated = [newLog, ...existing]

  saveLogs(updated)

  return updated
}