"use client";

import React, { useState } from "react";
import { PresenceAvatars, type PresencePerson } from "@/components/ui/presence-avatars";
import { UserPlus, UserMinus } from "lucide-react";

const INITIAL_PEOPLE: PresencePerson[] = [
  { id: "1", name: "Ana Ruiz", src: "/account-pfp.jpg" },
  { id: "2", name: "Ivo Bergman" },
  { id: "3", name: "Noor Haddad", src: "/account-pfp.jpg" },
];

const POOL: PresencePerson[] = [
  { id: "4", name: "Sarah Chen", src: "/account-pfp.jpg" },
  { id: "5", name: "Marcus Vance" },
  { id: "6", name: "Elena Rostova", src: "/account-pfp.jpg" },
];

export default function Demo() {
  const [people, setPeople] = useState<PresencePerson[]>(INITIAL_PEOPLE);
  const [roster, setRoster] = useState<PresencePerson[] | null>(null);

  const handleJoin = () => {
    const remaining = POOL.filter((p) => !people.some((existing) => existing.id === p.id));
    if (remaining.length > 0) {
      setPeople((prev) => [...prev, remaining[0]]);
    }
  };

  const handleLeave = () => {
    if (people.length > 1) {
      setPeople((prev) => prev.slice(1));
    }
  };

  return (
    <div className="flex min-h-[440px] w-full flex-col items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800 font-sans select-none">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl space-y-6">
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-800">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white tracking-tight truncate">Design System Board</h3>
            <p className="text-xs text-zinc-400 mt-0.5 truncate font-mono">
              {people.map((p) => p.name).join(", ")}
            </p>
          </div>

          <PresenceAvatars
            people={people}
            max={3}
            size={36}
            label="Active collaborators"
            onOverflowSelect={(hidden) => setRoster(hidden)}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleJoin}
            disabled={people.length >= INITIAL_PEOPLE.length + POOL.length}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white transition-all cursor-pointer disabled:opacity-40 shadow-md"
          >
            <UserPlus className="size-4" /> Someone joins
          </button>
          <button
            type="button"
            onClick={handleLeave}
            disabled={people.length <= 1}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-all cursor-pointer disabled:opacity-40"
          >
            <UserMinus className="size-4" /> Longest leaves
          </button>
        </div>

        {roster && (
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
            <span className="font-bold text-white block mb-1">Overflow Roster ({roster.length}):</span>
            {roster.map((p) => p.name).join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}
