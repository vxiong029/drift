import { LogEntry } from "@/app/types/log";
import { deleteLog } from "@/app/lib/storage";

export default function Timeline({ logs }: { logs: LogEntry[] }) {
  if (logs.length === 0) {
    return (
      <div className="bg-neutral-900 p-4 rounded-2xl text-sm text-neutral-400">
        No activity yet
      </div>
    )
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this log?')) {
      deleteLog(id);
    }    
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
              <button className="ml-2 text-xs text-neutral-500 hover:text-red-400 active:scale-95" onClick={() => handleDelete(log.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}