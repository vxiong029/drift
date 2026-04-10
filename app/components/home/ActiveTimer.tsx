'use client';
import { useLogs } from "@/app/context/LogsContext";
import { LogEntry } from "@/app/types/log";
import { useEffect, useState } from "react";
import { AlertBanner } from "./AlertBanner";
import { ACTION_CONFIG } from "@/app/types/action";

export default function ActiveTimer({ activeLog }: { activeLog: LogEntry }) {
  const [now, setNow] = useState(Date.now());
  const [alertShown, setAlertShown] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const { stopLog } = useLogs();

  // Show alert if the active log has exceeded its alert threshold
  useEffect(() => {
    const config = ACTION_CONFIG[activeLog.type];
    const alertAfter = config.alertAfter;

    if (!alertAfter) return;

    const elapsed = now - activeLog.startTime;

    if (elapsed >= alertAfter && !hasAcknowledged) {
      setAlertShown(true);
    }

  }, [now, activeLog, alertShown]);

  // Reset alert and acknowledgment when a new log becomes active
  useEffect(() => {
    setAlertShown(false);
    setHasAcknowledged(false);
  }, [activeLog.id]);

  // Update the timer every second when there's an active log
  useEffect(() => {
    if (!activeLog) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeLog]);

  const start = new Date(activeLog.startTime).getTime();
  const elapsed = now - start;

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleOnClick = (action: 'stop' | 'continue') => {
    // Logic to stop the timer (e.g., update log status, set end time)
    if (action === 'stop') {
      stopLog(activeLog.id);
    } 
    
    setAlertShown(false);
    setHasAcknowledged(true);
  };

  const alertMessages = [
    {
      type: "sleep",
      message: `😴 Sleeping for ${formatTime(elapsed)}`,
      subtext: "Would you like to stop the timer?"
    },
    {
      type: "feed",
      message: `🍼 Feeding for ${formatTime(elapsed)}`,
      subtext: "Would you like to stop the timer?"
    }
  ];

  return (
    <>
    <div className="text-center space-y-2">
      <div className="text-sm text-neutral-400">
        {activeLog.type === "sleep" && "😴 Sleep in progress"}
        {activeLog.type === "feed" && "🍼 Feeding"}
        {activeLog.type === "diaper" && "🧷 Changing"}
      </div>

      <div className="text-3xl font-mono tracking-wider">
        {formatTime(elapsed)}
      </div>
    </div>

    {/* Show alert banner if the active log has exceeded its alert threshold */}
    {alertShown && (
      alertMessages.map(alert => alert.type === activeLog.type && (
        <AlertBanner 
          key={activeLog.id}
          onClick={(action) => handleOnClick(action)}
          message={alert.message}
          subtext={alert.subtext}
        />
      ))
    )}
    </>
  );
}