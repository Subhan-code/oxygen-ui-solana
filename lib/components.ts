import type { ReactNode } from "react";
import { REGISTRY, type RegistryItem } from "./registry";

export type Dependency = {
  name: string;
  icon?: ReactNode;
};

export type ComponentProp = {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  options?: string[];
  control?: "swatch";
  optionColors?: Record<string, string>;
  description: string;
};

import { SOL_CATEGORY_DEFINITIONS } from "./sol-components";

export type ComponentItem = RegistryItem;
export const components = REGISTRY;

// official components shown in the /components catalog
export const COMPONENT_SLUG_SET = new Set(
  SOL_CATEGORY_DEFINITIONS.flatMap((cat) =>
    cat.components.map((c) => c.slug.toLowerCase()),
  ),
);

// strictly divided application blocks with zero overlap with components
export const BLOCK_SLUG_SET = new Set(
  REGISTRY.map((item) => item.slug.toLowerCase()).filter(
    (slug) => !COMPONENT_SLUG_SET.has(slug),
  ),
);

export function isBlockComponent(item: ComponentItem): boolean {
  return BLOCK_SLUG_SET.has(item.slug.toLowerCase());
}

export const blockComponents = REGISTRY.filter((item) => isBlockComponent(item));
export const uiComponents = REGISTRY.filter((item) => !isBlockComponent(item));


export {
  REGISTRY,
  REGISTRY_HOMEPAGE,
  REGISTRY_REPO,
  getAllSlugs,
  getComponentBySlug,
  validateRegistry,
} from "./registry";

export const PANEL_INFO = {
  sourceHint:
    "Click the code icon in the top-right corner to view the source code.",
  keepInMind:
    "Oxygen UI provides composable primitives tailored for Solana applications, including account interfaces, token balance cards, transaction status states, and network metrics. Built for performance and seamless dApp integration.",
  contactEmail: "syedsubhan.official@gmail.com",
  contactNote: "Found a bug or issue? Feel free to drop a DM.",
  license: [
    "Free to use and modify in both personal and commercial Solana dApps.",
    "Attribution to Oxygen UI is appreciated when using a component.",
    "Please do not resell the components as standalone paid kits.",
  ],
} as const;

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const PM_EXECUTORS: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};

export const PACKAGE_MANAGERS = Object.keys(PM_EXECUTORS) as PackageManager[];

export function installCommand(
  item?: ComponentItem,
  pm: PackageManager = "npm",
): string | null {
  if (!item) return null;
  const registryName = item.registry || item.slug;
  return `${PM_EXECUTORS[pm]} shadcn add oxygen/${registryName}`;
}

export function activeComponent(pathname: string): ComponentItem | undefined {
  return components.find((c) => c.href === pathname);
}

export function swatchProp(item?: ComponentItem): ComponentProp | undefined {
  return item?.props?.find((p: ComponentProp) => p.control === "swatch" && p.optionColors);
}

export function cleanDefault(prop?: ComponentProp): string | undefined {
  if (!prop?.default) return undefined;
  return prop.default.replace(/^["']|["']$/g, "");
}
