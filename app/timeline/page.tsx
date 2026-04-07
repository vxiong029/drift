"use client";
import Timeline from "../components/home/Timeline";
import { useLogs } from "../context/LogsContext";

export default function TimelinePage() {
  const { logs } = useLogs();

  return (
    <>
      <Timeline logs={logs} />
    </>
  )
}