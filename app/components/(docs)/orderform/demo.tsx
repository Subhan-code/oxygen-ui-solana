"use client";

import React from "react";
import { OrderForm } from "@/components/ui/sol/order-form";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl transition-all duration-300">
      <OrderForm />
    </div>
  );
}
