"use client";

import React, { useState } from "react";
import { WizardSteps, type WizardStep } from "@/components/ui/wizard-steps";

export default function Demo() {
  const [value, setValue] = useState({ name: "", team: "" });
  const [done, setDone] = useState(false);

  const steps: WizardStep[] = [
    {
      id: "profile",
      label: "Your profile",
      content: (
        <div className="space-y-3">
          <label className="text-xs font-semibold text-zinc-400 block">Workspace Creator</label>
          <input
            value={value.name}
            onChange={(e) => setValue((v) => ({ ...v, name: e.target.value }))}
            placeholder="Full name (e.g. Alex Morgan)"
            className="h-9 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-xs text-white outline-none focus:border-sky-500 transition-colors"
          />
        </div>
      ),
    },
    {
      id: "team",
      label: "Invite your team",
      content: (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 block">Team Emails (one per line)</label>
          <textarea
            value={value.team}
            onChange={(e) => setValue((v) => ({ ...v, team: e.target.value }))}
            placeholder="alex@company.com&#10;sam@company.com"
            className="h-24 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-white outline-none focus:border-sky-500 transition-colors"
          />
        </div>
      ),
    },
    {
      id: "review",
      label: "Review & Create",
      content: (
        <div className="space-y-2 text-xs text-zinc-300">
          <p className="font-bold text-white text-sm">Summary</p>
          <p>• Creator: <span className="font-mono text-sky-400">{value.name || "Unnamed"}</span></p>
          <p>• Team invites: <span className="font-mono text-purple-400">{value.team.split("\n").filter(Boolean).length} invited</span></p>
          <p className="text-zinc-500 text-[11px] mt-2">Clicking Create workspace will finalize the setup.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-[440px] w-full flex-col items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800 font-sans">
      <div className="w-full max-w-sm">
        <WizardSteps
          steps={steps}
          height={190}
          complete={done}
          finishLabel="Create workspace"
          onComplete={() => setDone(true)}
        />
      </div>
    </div>
  );
}
