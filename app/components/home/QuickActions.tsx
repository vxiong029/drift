"use client";
import { start } from "repl";
import { useLogs } from "../../context/LogsContext";
import Button from "./Button";
import { LogType } from "@/app/types/log";

const actions: { type: LogType, icon: string, label: string }[] = [
  { type: 'sleep', icon: '😴', label: 'Sleep' },
  { type: 'feed', icon: '🍼', label: 'Feed' }
];

export default function QuickActions() {
  const { activeLog, addLog, startLog, stopLog } = useLogs();

  const handleClick = (type: LogType) => {
    if (activeLog) {
      if (activeLog.type == type) {
        stopLog(activeLog.id);
      }
      console.log("activeLog:", activeLog);
    } else {
      startLog(type);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map(({ type, icon, label }) => {
        const isActive = activeLog?.type === type;

        return (
          <Button
            key={type}
            label={
              isActive
                ? `⏹ Stop ${label}`
                : `${icon} ${label}`
            }
            onClickHandle={() => handleClick(type)}
            isActive={isActive}
            disabled={!!activeLog && !isActive} 
          />
        );
      })}
      <Button
        label="🧷 Diaper"
        onClickHandle={() => {addLog('diaper')}}
        isActive={false}
        disabled={false}
      />
    </div>
  )
}