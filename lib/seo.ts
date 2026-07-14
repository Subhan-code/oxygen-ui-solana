import type { Metadata } from "next";
import { components } from "@/lib/components";

export const SITE_KEYWORDS = [
  "react components",
  "next.js components",
  "shadcn registry",
  "shadcn components",
  "animated ui components",
  "framer motion components",
  "motion react",
  "tailwind css components",
  "free ui components",
  "copy paste components",
  "ui component library",
  "microinteractions",
];

export function componentPageMetadata(href: string): Metadata {
  const item = components.find((c) => c.href === href);
  if (!item) return {};

  const name = item.name.toLowerCase();

  return {
    title: `${item.name} — Animated React Component`,
    description: item.description,
    keywords: [
      name,
      `${name} react`,
      `${name} component`,
      `animated ${name}`,
      `${name} shadcn`,
      ...SITE_KEYWORDS,
    ],
    alternates: {
      canonical: item.href,
    },
  };
}
