"use client";
import { LogEntry } from "@/app/types/log";
import { useLogs } from "../../context/LogsContext";
import { useState } from "react";
import { formatDuration } from "@/app/lib/groupedLogs";

export default function Section({ title, logs }: { title: string, logs: LogEntry[] }) {
  const { deleteLog } = useLogs();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const handleDelete = (id: string) => {
    // if (confirm('Are you sure you want to delete this log?')) {
    setDeletingIds([...deletingIds, id]);

    setTimeout(() => {
      deleteLog(id)
      setDeletingIds((prev) => prev.filter((i) => i !== id))
    }, 350);
    // }
  }

  const formatTime = (log: LogEntry) => {
    return new Date(log.startTime).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xs text-neutral-500 uppercase tracking-wide px-1">
        {title}
      </h2>

      <div className="bg-neutral-900/70 backdrop-blur rounded-2xl divide-y divide-neutral-800">
        <ul className="space-y-2 text-sm">
          {logs.map((log) => (
            <li className={`flex items-center justify-between px-4 py-3 
              ${deletingIds.includes(log.id) ? 'bg-neutral-800/50 transition duration-350 ease-in-out opacity-0 scale-95 max-h-0 py-0 overflow-hidden'
                : 'opacity-100 scale-100 max-h-20'}`}
              key={log.id}>
              <span>
                {log.type === 'sleep' && '😴 Sleep'}
                {log.type === 'feed' && '🍼 Feed'}
                {log.type === 'diaper' && '🧷 Diaper'}
                {log.details && ` (${log.details})`}
              </span>

              <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-400">
                  {formatTime(log)} 
                </span>

                {log.type !== 'diaper' && log.status === 'completed' &&
                  <>
                    <span className="text-sm text-neutral-400">
                      {`·`}
                    </span>

                    <span className="text-sm text-neutral-400">
                      {formatDuration(log)}
                    </span>
                  </>
                }

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(log.id);
                  }}
                  className="text-neutral-500 text-red-400 text-sm transition active:scale-90"
                >
                  ✕
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}