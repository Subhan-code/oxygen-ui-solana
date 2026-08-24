"use client";

import React from "react";
import { PasswordInput } from "@/components/ui/password-input";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <PasswordInput defaultValue="supersecret" />
    </div>
  );
}
