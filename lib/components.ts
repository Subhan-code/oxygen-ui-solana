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

export type ComponentItem = RegistryItem;
export const components = REGISTRY;

const BLOCK_SLUG_SET = new Set([
  "accountcard",
  "authcard",
  "activityfeed",
  "bankbalancecard",
  "cardstack",
  "cryptocheckoutcard",
  "cryptoexplorecategories",
  "cryptopredictioncandidatecard",
  "cryptosalescandlestickchart",
  "cryptosalessegmentedbars",
  "cryptosalesverticalgraph",
  "cryptosubscriptioncard",
  "cryptoswapbox",
  "cryptotradingterminal",
  "cryptotvlanalyticschart",
  "cryptotvlsparkbarwidget",
  "cryptouserprofile",
  "cryptowalletdashboard",
  "cryptowalletdrawer",
  "cryptowalletmain",
  "cryptowalletmenusheet",
  "cryptowalletsettings",
  "familydialog",
  "familydrawer",
  "financialmetricsgrid",
  "liquiditypoolcard",
  "metrics01",
  "multichainswap",
  "notificationsstack",
  "orderbook",
  "orderform",
  "poolcard",
  "pooltable",
  "positioncard",
  "positiontable",
  "pricechart",
  "routesummary",
  "runstatsstacks",
  "secretkeywarningbox",
  "segmentedprogresscard",
  "solanaidentitycard",
  "solananftcard",
  "solanaeventcard",
  "solanawalletcard",
  "stakingcard",
  "statcard",
  "steptrackerwidget",
  "tasksteps",
  "timeline",
  "tradebox",
  "transactionmodal",
  "transactionreceipt",
  "txntable",
  "underlayactionsheet",
  "walletcard",
  "walletsheet",
  "withdrawalcard",
  "wizardsteps",
]);

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
  return `${PM_EXECUTORS[pm]} shadcn@latest add Subhan-code/oxygen_ui/${registryName}`;
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
