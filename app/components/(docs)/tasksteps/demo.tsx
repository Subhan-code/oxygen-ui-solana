"use client";

import React, { useState, useEffect } from "react";
import { TaskSteps } from "@/components/ui/task-steps";
import { Play, RotateCcw, AlertTriangle } from "lucide-react";

const STEPS = [
  { id: "queue", label: "Queued", meta: "0.2s" },
  { id: "build", label: "Building", meta: "8.1s" },
  { id: "test", label: "Running checks", meta: "3.4s" },
  { id: "deploy", label: "Deploying", meta: "5.0s" },
];

export default function Demo() {
  const [current, setCurrent] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed || current >= STEPS.length) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev < STEPS.length ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(id);
  }, [current, failed]);

  const handleReset = () => {
    setFailed(false);
    setCurrent(0);
  };

  const handleFail = () => {
    setFailed(true);
  };

  return (
    <div className="flex min-h-[440px] w-full flex-col items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800 font-sans select-none">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight uppercase">Deploy Pipeline</h3>
            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">run_id #8491-prod</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            {current >= STEPS.length ? "Success" : failed ? "Error" : "Running"}
          </span>
        </div>

        <TaskSteps steps={STEPS} current={current} failed={failed} label="Deploy progress" />

        <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3.5" /> Re-run Build
          </button>
          <button
            type="button"
            onClick={handleFail}
            disabled={failed || current >= STEPS.length}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 border border-red-500/20 transition-colors cursor-pointer disabled:opacity-40"
          >
            <AlertTriangle className="size-3.5" /> Trigger Fail
          </button>
        </div>
      </div>
    </div>
  );
}
