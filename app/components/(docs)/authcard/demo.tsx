"use client";

import React, { useState } from "react";
import { AuthCard, type AuthSocialProvider } from "@/components/ui/auth-card";

export default function Demo() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSocial = (provider: AuthSocialProvider) => {
    console.log("Social sign-in:", provider);
    setStatus(`Provider: ${provider}`);
  };

  const handleEmail = (email: string) => {
    console.log("Email sign-in:", email);
    setPending(true);
    setStatus(`Authenticating ${email}...`);
    setTimeout(() => {
      setPending(false);
      setStatus(`Submitted email: ${email}`);
    }, 800);
  };

  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center p-6 gap-3">
      <div className="w-full max-w-sm">
        <AuthCard
          onSocial={handleSocial}
          onEmail={handleEmail}
          pending={pending}
        />
      </div>
      {status && (
        <p className="text-xs font-mono text-zinc-400">
          {status}
        </p>
      )}
    </div>
  );
}