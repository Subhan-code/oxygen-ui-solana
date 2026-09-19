"use client";

import DynamicIslandNavbar from "@/components/DynamicIslandNavbar";

export default function GooeyNavbar({ stars }: { stars?: number | null }) {
  return <DynamicIslandNavbar stars={stars} />;
}
