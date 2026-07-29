import type { Metadata } from "next";
import Demo from "./demo";

// unreleased: its entry in lib/components.ts is still commented out, so keep it out of the index
export const metadata: Metadata = {
  title: "Family Drawer",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Demo />;
}
