import { getComponentBySlug } from "./registry";
import type { ComponentItem } from "./components";

export interface SolCategory {
  id: string;
  name: string;
  description: string;
  slugs: string[];
  items: ComponentItem[];
}

export const SOL_CATEGORY_DEFINITIONS: Array<{
  id: string;
  name: string;
  description: string;
  components: Array<{ name: string; slug: string }>;
}> = [
  {
    id: "wallet-identity",
    name: "Wallet & Identity",
    description: "Multi-wallet switchers, address displays, and QR code widgets.",
    components: [
      { name: "Multi Wallet Switcher", slug: "multiwalletswitcher" },
      { name: "Address Display", slug: "addressdisplay" },
      { name: "Qr Code", slug: "qrcode" },
    ],
  },
  {
    id: "tokens-assets",
    name: "Tokens & Assets",
    description: "Token list items, token pairs, icon groups, token commands, inputs, and price pills.",
    components: [
      { name: "Token List Item", slug: "tokenlistitem" },
      { name: "Token Pair", slug: "tokenpair" },
      { name: "Token Icon Group", slug: "tokenicongroup" },
      { name: "Token Command", slug: "tokencommand" },
      { name: "Token Input", slug: "tokeninput" },
      { name: "Crypto Price Pills", slug: "cryptopricepills" },
    ],
  },
  {
    id: "swap-trade-controls",
    name: "Trade Controls & Fees",
    description: "Execution controls: trade buttons, toggle pills, slippage selectors, leverage sliders, and priority fee selectors.",
    components: [
      { name: "Trade Buttons", slug: "tradebuttons" },
      { name: "Trade Toggle Pill", slug: "tradetogglepill" },
      { name: "Slippage Selector", slug: "slippageselector" },
      { name: "Leverage Slider", slug: "leverageslider" },
      { name: "Priority Fee Selector", slug: "priorityfeeselector" },
    ],
  },
  {
    id: "charts-gauges",
    name: "Tickers & Gauges",
    description: "Real-time price tickers, rate indicators, and visual gauges.",
    components: [
      { name: "Price Ticker", slug: "priceticker" },
      { name: "Gauge", slug: "gauge" },
    ],
  },
  {
    id: "transactions-activity",
    name: "Status & Alerts",
    description: "Solana transaction status cards, signature status badges, and transaction toasts.",
    components: [
      { name: "Solana Transaction Status", slug: "solanatransactionstatus" },
      { name: "Signature Status Badge", slug: "signaturestatusbadge" },
      { name: "Txn Toast", slug: "txntoast" },
    ],
  },
  {
    id: "actions-controls",
    name: "Actions & Controls",
    description: "Interactive buttons, draw checkboxes, toggles, liquid radio, gooey menus, and tabs.",
    components: [
      { name: "Button", slug: "uxbutton" },
      { name: "Draw Checkbox", slug: "drawcheckbox" },
      { name: "Toggle Pill", slug: "togglepill" },
      { name: "Liquid Radio", slug: "liquidradio" },
      { name: "Gooey Menu", slug: "gooeymenu" },
      { name: "Animated Tabs", slug: "animatedtabs" },
      { name: "Smooth Tabs", slug: "smoothtabs" },
    ],
  },
  {
    id: "forms-flows",
    name: "Forms & Inputs",
    description: "Morphing input notifications and micro-form primitives.",
    components: [
      { name: "Input Morph Message", slug: "inputmorphmessage" },
    ],
  },
  {
    id: "status-motion-brand",
    name: "Status, Motion & Brand",
    description: "Status badge pills, trend badges, verification checks, progress rings, counters, and brand motion.",
    components: [
      { name: "Status Badge Pill", slug: "statusbadgepill" },
      { name: "Multi State Badge", slug: "multistatebadge" },
      { name: "Trend Badge", slug: "trendbadge" },
      { name: "Verification Badges", slug: "verificationbadges" },
      { name: "Error State Shake", slug: "errorstateshake" },
      { name: "Success Check", slug: "successcheck" },
      { name: "Solana Progress Ring", slug: "progressring" },
      { name: "Balance Display", slug: "balancedisplay" },
      { name: "Spinning Counter", slug: "spinningcounter" },
      { name: "Digit Swap", slug: "digitswap" },
      { name: "Value Flash", slug: "valueflash" },
      { name: "Presence Avatars", slug: "presenceavatars" },
      { name: "Marquee", slug: "marquee" },
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
      id: catDef.id,
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
