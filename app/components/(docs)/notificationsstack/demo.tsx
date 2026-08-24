"use client";

import React from "react";
import { NotificationsStack } from "@/components/ui/notifications-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <NotificationsStack />
    </div>
  );
}
