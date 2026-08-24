"use client";

import React from "react";
import { CardStack } from "@/components/ui/card-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <CardStack />
    </div>
  );
}
