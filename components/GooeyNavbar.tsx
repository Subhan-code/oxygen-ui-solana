"use client";

import DynamicIslandNavbar from "@/components/DynamicIslandNavbar";

export default function GooeyNavbar(props?: { stars?: number | null }) {
  return <DynamicIslandNavbar stars={props?.stars} />;
}
