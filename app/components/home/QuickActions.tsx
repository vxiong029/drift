"use client";
import { useLogs } from "../../context/LogsContext";

export default function QuickActions() {
  const { addLog } = useLogs();

  return (
    <div className="grid grid-cols-3 gap-3">
      <button className="bg-neutral-800 p-4 rounded-2xl active:scale-95 transition" onClick={() => addLog('sleep')}>😴 Sleep</button>
      <button className="bg-neutral-800 p-4 rounded-2xl active:scale-95 transition" onClick={() => addLog('feed')}>🍼 Feed</button>
      <button className="bg-neutral-800 p-4 rounded-2xl active:scale-95 transition" onClick={() => addLog('diaper')}>🧷 Diaper</button>
    </div>
  )
}