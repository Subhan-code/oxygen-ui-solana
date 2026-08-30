"use client";

import React from "react";
import { SpringPhysicsVisualizer } from "@/components/ui/spring-physics-visualizer";

export default function Demo() {
  return (
    <div className="flex min-h-[440px] w-full flex-col items-center justify-center p-6">
      <SpringPhysicsVisualizer />
    </div>
  );
}
