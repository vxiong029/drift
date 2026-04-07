"use client";
import { LogEntry } from "@/app/types/log";
import { useLogs } from "../../context/LogsContext";

export default function Section({ title, logs }: { title: string, logs: LogEntry[] }) {
  const { deleteLog } = useLogs();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this log?')) {
      deleteLog(id);
    }    
  }

  if (logs.length === 0) {
    return (
      <div className="bg-neutral-900 p-4 rounded-2xl text-sm text-neutral-400">
        No activity yet
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <h2 className="text-sm text-neutral-400">{title}</h2>

      <div className="bg-neutral-900 rounded-2xl p-4 space-y-3">
        <ul className="space-y-2 text-sm">
          {logs.map((log) => (
            <li className="flex justify-between items-center" key={log.id}>
              <span>
                {log.type === 'sleep' && '😴 Nap'}
                {log.type === 'feed' && '🍼 Feed'}
                {log.type === 'diaper' && '🧷 Diaper'}
                {log.startTime && ` · ${new Date(log.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                {log.details && ` (${log.details})`}
              </span>
              
              <button className="text-xs text-neutral-500 hover:text-red-400" onClick={() => handleDelete(log.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}