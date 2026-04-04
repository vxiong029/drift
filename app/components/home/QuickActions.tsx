import { LogEntry } from "@/app/types/log"

type QuickActionsProps = {
  onLogAdd: (type: LogEntry['type'], description?: string) => void;
}

export default function QuickActions({ onLogAdd }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <button className="bg-neutral-800 p-4 rounded-2xl active:scale-95 transition" onClick={() => onLogAdd('sleep')}>😴 Sleep</button>
      <button className="bg-neutral-800 p-4 rounded-2xl active:scale-95 transition" onClick={() => onLogAdd('feed', 'left')}>🍼 Feed</button>
      <button className="bg-neutral-800 p-4 rounded-2xl active:scale-95 transition" onClick={() => onLogAdd('diaper')}>🧷 Diaper</button>
    </div>
  )
}