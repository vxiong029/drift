import { LogEntry } from "@/app/types/log";

let logs: LogEntry[] = [
  { id: "1", type: "sleep", startTime: Date.now() - 1000 * 60 * 60 },
  { id: "2", type: "feed", startTime: Date.now() - 1000 * 60 * 30, details: "left" },
  { id: "3", type: "diaper", startTime: Date.now() - 1000 * 60 * 10 },
];

export default function TimelinePage() {
  if (logs.length === 0) {
    return (
      <div className="bg-neutral-900 p-4 rounded-2xl text-sm text-neutral-400">
        No activity yet
      </div>
    )
  }
  return (
    <div className="space-y-4">
      <h2 className="text-sm text-neutral-400">Today</h2>

      <div className="bg-neutral-900 rounded-2xl p-4 space-y-3">
        <ul className="mt-2 space-y-2 text-sm">
          {logs.map((log) => (
            <li key={log.id}>
              {log.type === 'sleep' && '😴 Nap'}
              {log.type === 'feed' && '🍼 Feed'}
              {log.type === 'diaper' && '🧷 Diaper'}
              {log.startTime && ` · ${new Date(log.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              {log.details && ` (${log.details})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}