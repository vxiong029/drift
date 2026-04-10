"use client";
import { useLogs } from "../../context/LogsContext";
import Button from "./Button";
import { LogType } from "@/app/types/log";
import { useState } from "react";
import { ActionCard } from "./ActionCard";
import { ACTION_CONFIG } from "@/app/types/action";
import { typedEntries } from "@/app/lib/helper";

export default function QuickActions() {
  const { activeLog, addLog, startLog, stopLog } = useLogs();
  const [expandedAction, setExpandedAction] = useState<LogType | null>(null);

  const handleMainActionClick = (type: LogType) => {
    const config = ACTION_CONFIG[type];

    // If there's an active log of the same type, stop it
    if (activeLog && activeLog.type === type) {
      stopLog(activeLog.id);
      setExpandedAction(null);
      return;
    }
    // For actions that require details, we expand the options instead of starting immediately
    if (config.requiresDetails) {
      setExpandedAction(prev => (prev === type ? null : type));
      return;
    }

    // For instant actions, we can directly add the log without expanding options
    startLog(type);
  }

  const handleOptionSelect = (type: LogType, value: string) => {
    const config = ACTION_CONFIG[type];
    // For instant actions, we add the log immediately with the selected detail
    if (config.kind === 'instant') {
      addLog(type, value);
    } else {
      startLog(type, value);
    }

    setExpandedAction(null);
  };

  return (
    <div className="space-y-3">
      <div className="bg-neutral-900 rounded-2xl overflow-hidden">
        {typedEntries(ACTION_CONFIG).map(([type, config]) => {
          const isActive = activeLog?.type === type;
          const isOpen = expandedAction === type;

          return (
            <div key={type}>
            <Button
              label={
                isActive
                  ? `⏹ Stop ${config.label}`
                  : `${config.icon} ${config.label}`
              }
              onClickHandle={() => handleMainActionClick(type)}
              isOpen={isOpen}
              isActive={isActive}
              disabled={!!activeLog && !isActive}
            />

            {isOpen && config.requiresDetails && (
              <ActionCard
                isOpen={isOpen}
                description={`${config.description}`}
                options={config.options || []}
                onClick={(value) => {
                  handleOptionSelect(type, value);
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