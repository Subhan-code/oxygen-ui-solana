import type { Metadata } from "next";
import TransitionsShowcase from "@/components/transitions/TransitionsShowcase";

export const metadata: Metadata = {
  title: "Transitions.dev — Component Documentation",
  description:
    "Interactive showcase of all 27 CSS and Motion transitions from transitions.dev.",
};

export default function DocsTransitionsPage() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="font-runde text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Transitions.dev Catalog
          </h1>
          <p className="text-sm text-muted-foreground">
            A complete collection of 27 essential CSS transitions for web apps. Test interactions live or copy individual snippets.
          </p>
        </header>

        <TransitionsShowcase />
      </div>
    </div>
  );
}
