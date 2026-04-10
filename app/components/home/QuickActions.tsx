"use client";
import { start } from "repl";
import { useLogs } from "../../context/LogsContext";
import Button from "./Button";
import { LogType } from "@/app/types/log";
import { useState } from "react";
import { ActionCard } from "./ActionCard";

const actions: { type: LogType, icon: string, label: string, description?: string }[] = [
  { type: 'sleep', icon: '😴', label: 'Sleep' },
  { type: 'feed', icon: '🍼', label: 'Feed', description: 'Select which side the baby fed on' },
  { type: 'diaper', icon: '🧷', label: 'Diaper', description: 'Select which type of diaper change' },
];

export default function QuickActions() {
  const { activeLog, addLog, startLog, stopLog } = useLogs();
  const [expandedAction, setExpandedAction] = useState<'feed' | 'diaper' | null>(null);

  const toggle = (type: LogType) => {
    if (activeLog && activeLog.type === type) {
      handleClick(type);
      return;
    }

    if (type === 'feed' || type === 'diaper') {
      setExpandedAction(prev => prev === type ? null : type);
    } else {
      handleClick(type);
    }
  };

  const handleClick = (type: LogType, detail?: string) => {
    if (activeLog) {
      if (activeLog.type == type) {
        stopLog(activeLog.id);
        setExpandedAction(null);
      }
    } else {
      startLog(type, detail);
      setExpandedAction(null);
      console.log('Starting log:', { type, detail });
    }
  };

  return (
    <div className="space-y-3">
      <div className="bg-neutral-900 rounded-2xl overflow-hidden">
        {actions.map((action) => {
          const isActive = activeLog?.type === action.type;
          const isOpen = expandedAction === action.type;

          return (
            <div key={action.type}>
            <Button
              key={action.type}
              label={
                isActive
                  ? `⏹ Stop ${action.label}`
                  : `${action.icon} ${action.label}`
              }
              onClickHandle={() => toggle(action.type)}
              isOpen={isOpen}
              isActive={isActive}
              disabled={!!activeLog && !isActive}
            />

            {isOpen && (
              <ActionCard
                key={action.type}
                isOpen={isOpen}
                description={`${action.description}`}
                type={action.type}
                onClick={(detail) => {
                  handleClick(action.type, detail);
                }}
              />
            )}
            </div>
          );
        })}
      </div>
    </div>
  )
}