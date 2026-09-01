"use client";

import React, { useState } from "react";
import { PasswordStrength, usePasswordStrength } from "@/components/ui/password-strength";

export default function Demo() {
  const [password, setPassword] = useState("");
  const { score, max } = usePasswordStrength(password);

  return (
    <div className="flex min-h-[440px] w-full items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-sm font-sans">
        <label htmlFor="password-input" className="text-xs font-semibold text-zinc-400 block mb-2">
          New password
        </label>
        <input
          id="password-input"
          type="password"
          value={password}
          autoComplete="new-password"
          placeholder="Type password..."
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-sky-500 transition-colors"
        />

        <PasswordStrength value={password} className="mt-4" />

        <button
          type="submit"
          disabled={score < max}
          className="mt-5 h-10 w-full rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
