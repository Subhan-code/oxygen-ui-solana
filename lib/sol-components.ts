import { getComponentBySlug } from "./registry";
import type { ComponentItem } from "./components";

export interface SolCategory {
  name: string;
  description: string;
  slugs: string[];
  items: ComponentItem[];
}

export const SOL_CATEGORY_DEFINITIONS: Array<{
  name: string;
  description: string;
  components: Array<{ name: string; slug: string }>;
}> = [
  {
    name: "Account & Identity",
    description: "Account cards, wallet cards, address displays, and identity primitives.",
    components: [
      { name: "Account Card", slug: "accountcard" },
      { name: "Solana Identity Card", slug: "solanaidentitycard" },
      { name: "Solana Wallet Card", slug: "solanawalletcard" },
      { name: "Address Display", slug: "addressdisplay" },
      { name: "Multi Wallet Switcher", slug: "multiwalletswitcher" },
      { name: "Wallet Connect Button", slug: "walletsheet" },
      { name: "QR Code", slug: "qrcode" },
      { name: "Secret Key Warning Box", slug: "secretkeywarningbox" },
    ],
  },
  {
    name: "Tokens & Assets",
    description: "SPL token displays, NFT cards, inputs, pairs, and icon groups.",
    components: [
      { name: "Solana Token Card", slug: "solanatokencard" },
      { name: "Solana NFT Card", slug: "solananftcard" },
      { name: "Solana Event Card", slug: "solanaeventcard" },
      { name: "Token Input", slug: "tokeninput" },
      { name: "Token List Item", slug: "tokenlistitem" },
      { name: "Token Pair", slug: "tokenpair" },
      { name: "Token Icon Group", slug: "tokenicongroup" },
      { name: "Token Command", slug: "tokencommand" },
      { name: "Crypto Price Pills", slug: "cryptopricepills" },
      { name: "Balance Display", slug: "balancedisplay" },
    ],
  },
  {
    name: "Swap & Trading",
    description: "DEX execution UI, order books, forms, fees, and leverage controls.",
    components: [
      { name: "Crypto Swap Box", slug: "cryptoswapbox" },
      { name: "Trade Buttons", slug: "tradebuttons" },
      { name: "Order Book", slug: "orderbook" },
      { name: "Order Form", slug: "orderform" },
      { name: "Slippage Selector", slug: "slippageselector" },
      { name: "Priority Fee Selector", slug: "priorityfeeselector" },
      { name: "Leverage Slider", slug: "leverageslider" },
      { name: "Route Summary", slug: "routesummary" },
    ],
  },
  {
    name: "Charts, Metrics & Portfolio",
    description: "Price charts, tickers, gauges, stat cards, and portfolio widgets.",
    components: [
      { name: "Price Chart", slug: "pricechart" },
      { name: "Price Ticker", slug: "priceticker" },
      { name: "Gauge", slug: "gauge" },
      { name: "Stat Card", slug: "statcard" },
      { name: "Segmented Progress Card", slug: "segmentedprogresscard" },
      { name: "Pool Card", slug: "poolcard" },
      { name: "Position Card", slug: "positioncard" },
      { name: "Portfolio Allocation", slug: "financialmetricsgrid" },
    ],
  },
  {
    name: "Transactions & Activity",
    description: "Transaction status, pipelines, batch stacks, modals, receipts, tables, toasts, and history feeds.",
    components: [
      { name: "Solana Transaction Status", slug: "solanatransactionstatus" },
      { name: "Solana Txn Pipeline", slug: "steptrackerwidget" },
      { name: "Solana Batch Stacks", slug: "runstatsstacks" },
      { name: "Transaction Modal", slug: "transactionmodal" },
      { name: "Transaction Receipt", slug: "transactionreceipt" },
      { name: "Transaction Table", slug: "txntable" },
      { name: "Transaction Toast", slug: "txntoast" },
      { name: "Activity Feed", slug: "activityfeed" },
    ],
  },
  {
    name: "Status, Feedback & Network",
    description: "Signatures, badges, status pills, feedback indicators, and network status.",
    components: [
      { name: "Signature Status Badge", slug: "signaturestatusbadge" },
      { name: "Status Badge Pill", slug: "statusbadgepill" },
      { name: "Trend Badge", slug: "trendbadge" },
      { name: "Success Check", slug: "successcheck" },
      { name: "Error State Shake", slug: "errorstateshake" },
      { name: "Progress Ring", slug: "progressring" },
      { name: "Network Status Indicator", slug: "multistatebadge" },
      { name: "Solana Pay Button", slug: "solanapaybutton" },
    ],
  },
  {
    name: "Core Primitives",
    description: "Fundamental input controls, buttons, counters, and motion primitives.",
    components: [
      { name: "Button", slug: "uxbutton" },
      { name: "Digit Swap", slug: "digitswap" },
      { name: "Toggle Pill", slug: "togglepill" },
      { name: "Toggle Group", slug: "togglegroup" },
      { name: "Draw Checkbox", slug: "drawcheckbox" },
      { name: "Spinning Counter", slug: "spinningcounter" },
      { name: "Animated Number Flow", slug: "animatednumberflow" },
      { name: "Oxygen UI Pill", slug: "oxygenuipill" },
    ],
  },
];

export function getSolCategories(): SolCategory[] {
  return SOL_CATEGORY_DEFINITIONS.map((catDef) => {
    const items: ComponentItem[] = catDef.components
      .map((comp) => {
        const original = getComponentBySlug(comp.slug);
        if (!original) return null;
        return {
          ...original,
          title: comp.name,
          name: comp.name,
          group: catDef.name,
          category: catDef.name,
        };
      })
      .filter((item): item is ComponentItem => Boolean(item));

    return {
      name: catDef.name,
      description: catDef.description,
      slugs: catDef.components.map((c) => c.slug),
      items,
    };
  });
}

export function getSolComponents(): ComponentItem[] {
  return getSolCategories().flatMap((cat) => cat.items);
}
