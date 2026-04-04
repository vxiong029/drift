import { LogEntry } from "@/app/types/log";

export default function Timeline({ logs }: { logs: LogEntry[] }) {
  if (logs.length === 0) {
    return (
      <div className="bg-neutral-900 p-4 rounded-2xl text-sm text-neutral-400">
        No activity yet
      </div>
    )
  }
  return (
    <div className="bg-neutral-900 p-4 rounded-2xl">
      <p className="text-sm text-neutral-400">Today</p>
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
  )
}