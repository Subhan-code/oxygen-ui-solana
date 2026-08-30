"use client";

import React from "react";
import { CategoryTagPills } from "@/components/ui/category-tag-pills";

export default function Demo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <CategoryTagPills />
      </div>
    </div>
  );
}
