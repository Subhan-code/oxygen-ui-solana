"use client";

import React, { useState } from "react";
import { FloatingLabelInput } from "@/components/ui/floating-label";

export default function Demo() {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="flex min-h-[380px] w-full items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 w-full max-w-sm">
        <FloatingLabelInput
          label="Work email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(val) => setEmail(val)}
          onBlur={() => setTouched(true)}
          invalid={isInvalid}
          hint={isInvalid ? "Needs to look like name@company.com" : "Receipts are sent here."}
        />

        <FloatingLabelInput
          label="Invoice reference"
          value={reference}
          onChange={(val) => setReference(val)}
          maxLength={16}
          hint="Printed on the statement header."
        />
      </form>
    </div>
  );
}
