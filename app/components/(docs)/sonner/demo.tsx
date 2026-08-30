"use client";

import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center p-6 gap-4">
      <Toaster />
      <button
        type="button"
        onClick={() => toast.success("Notification toast triggered!")}
        className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold text-xs shadow-lg cursor-pointer"
      >
        Trigger Sonner Toast
      </button>
    </div>
  );
}
