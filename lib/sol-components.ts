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
    description: "Account cards, wallet cards, user profiles, address displays, authentication, QR codes, and balance overviews.",
    components: [
      { name: "Account Card", slug: "accountcard" },
      { name: "Solana Identity Card", slug: "solanaidentitycard" },
      { name: "Solana Wallet Card", slug: "solanawalletcard" },
      { name: "Crypto User Profile", slug: "cryptouserprofile" },
      { name: "Crypto Wallet Main", slug: "cryptowalletmain" },
      { name: "Crypto Wallet Dashboard", slug: "cryptowalletdashboard" },
      { name: "Crypto Wallet Settings", slug: "cryptowalletsettings" },
      { name: "Multi Wallet Switcher", slug: "multiwalletswitcher" },
      { name: "Address Display", slug: "addressdisplay" },
      { name: "Auth Card", slug: "authcard" },
      { name: "Qr Code", slug: "qrcode" },
      { name: "Bank Balance Card", slug: "bankbalancecard" },
    ],
  },
  {
    id: "tokens-assets",
    name: "Tokens & Assets",
    description: "SPL token displays, NFT cards, passes, token lists, inputs, pairs, and icon groups.",
    components: [
      { name: "Solana Token Card", slug: "solanatokencard" },
      { name: "Solana Nft Card", slug: "solananftcard" },
      { name: "Solana Card Stack", slug: "cardstack" },
      { name: "Token List Item", slug: "tokenlistitem" },
      { name: "Token Pair", slug: "tokenpair" },
      { name: "Token Icon Group", slug: "tokenicongroup" },
      { name: "Token Command", slug: "tokencommand" },
      { name: "Token Input", slug: "tokeninput" },
      { name: "Crypto Price Pills", slug: "cryptopricepills" },
      { name: "Crypto Explore Categories", slug: "cryptoexplorecategories" },
    ],
  },
  {
    id: "swap-trade-checkout",
    name: "Swap, Trade & Checkout",
    description: "Execution UI: swap boxes, trade boxes, order books, sliders, fees, and checkout surfaces.",
    components: [
      { name: "Crypto Swap Box", slug: "cryptoswapbox" },
      { name: "Trade Box", slug: "tradebox" },
      { name: "Trade Buttons", slug: "tradebuttons" },
      { name: "Trade Toggle Pill", slug: "tradetogglepill" },
      { name: "Order Book", slug: "orderbook" },
      { name: "Order Form", slug: "orderform" },
      { name: "Route Summary", slug: "routesummary" },
      { name: "Slippage Selector", slug: "slippageselector" },
      { name: "Leverage Slider", slug: "leverageslider" },
      { name: "Priority Fee Selector", slug: "priorityfeeselector" },
      { name: "Crypto Checkout Card", slug: "cryptocheckoutcard" },
      { name: "Solana Pay Button", slug: "solanapaybutton" },
      { name: "Request Withdrawal Card", slug: "withdrawalcard" },
    ],
  },
  {
    id: "defi-yield",
    name: "DeFi, Pools & Yield",
    description: "Liquidity pool cards, position tables, staking, and crypto subscriptions.",
    components: [
      { name: "Liquidity Pool Card", slug: "liquiditypoolcard" },
      { name: "Pool Card", slug: "poolcard" },
      { name: "Pool Table", slug: "pooltable" },
      { name: "Position Card", slug: "positioncard" },
      { name: "Position Table", slug: "positiontable" },
      { name: "Staking Card", slug: "stakingcard" },
      { name: "Crypto Subscription Card", slug: "cryptosubscriptioncard" },
    ],
  },
  {
    id: "charts-analytics",
    name: "Charts & Analytics",
    description: "Candlestick charts, spark bars, metrics grids, gauges, and progress cards.",
    components: [
      { name: "Price Chart", slug: "pricechart" },
      { name: "Price Ticker", slug: "priceticker" },
      { name: "Crypto Sales Candlestick Chart", slug: "cryptosalescandlestickchart" },
      { name: "Crypto Sales Segmented Bars", slug: "cryptosalessegmentedbars" },
      { name: "Crypto Sales Vertical Graph", slug: "cryptosalesverticalgraph" },
      { name: "Financial Metrics Grid", slug: "financialmetricsgrid" },
      { name: "Metrics 01", slug: "metrics01" },
      { name: "Stat Card", slug: "statcard" },
      { name: "Gauge", slug: "gauge" },
      { name: "Segmented Progress Card", slug: "segmentedprogresscard" },
    ],
  },
  {
    id: "transactions-activity",
    name: "Transactions & Activity",
    description: "Activity feeds, transaction timelines, receipts, tables, toasts, batch stacks, and event cards.",
    components: [
      { name: "Activity Feed", slug: "activityfeed" },
      { name: "Timeline", slug: "timeline" },
      { name: "Txn Table", slug: "txntable" },
      { name: "Transaction Modal", slug: "transactionmodal" },
      { name: "Transaction Receipt", slug: "transactionreceipt" },
      { name: "Solana Transaction Status", slug: "solanatransactionstatus" },
      { name: "Signature Status Badge", slug: "signaturestatusbadge" },
      { name: "Txn Toast", slug: "txntoast" },
      { name: "Solana Batch Stacks", slug: "runstatsstacks" },
      { name: "Crypto Prediction Candidate Card", slug: "cryptopredictioncandidatecard" },
      { name: "Solana Event Card", slug: "solanaeventcard" },
    ],
  },
  {
    id: "sheets-overlays",
    name: "Sheets & Overlays",
    description: "Wallet sheets, drawer surfaces, family dialogs, popovers, action sheets, and modal boxes.",
    components: [
      { name: "Wallet Sheet", slug: "walletsheet" },
      { name: "Crypto Wallet Drawer", slug: "cryptowalletdrawer" },
      { name: "Crypto Wallet Menu Sheet", slug: "cryptowalletmenusheet" },
      { name: "Family Dialog", slug: "familydialog" },
      { name: "Family Drawer", slug: "familydrawer" },
      { name: "Family Popover Menu", slug: "familypopovermenu" },
      { name: "Underlay Action Sheet", slug: "underlayactionsheet" },
      { name: "Action Box", slug: "actionbox" },
      { name: "Secret Key Warning Box", slug: "secretkeywarningbox" },
    ],
  },
  {
    id: "actions-controls",
    name: "Actions & Controls",
    description: "Interactive buttons, draw checkboxes, toggles, liquid radio, gooey menus, and tabs.",
    components: [
      { name: "Button", slug: "uxbutton" },
      { name: "Multi-State Action Button", slug: "multiplestatebutton" },
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
    name: "Forms & Flows",
    description: "Floating inputs, password strength meters, morph messages, and wizard/task step flows.",
    components: [
      { name: "Floating Label Input", slug: "floatinglabel" },
      { name: "Password Strength", slug: "passwordstrength" },
      { name: "Input Morph Message", slug: "inputmorphmessage" },
      { name: "Wizard Steps", slug: "wizardsteps" },
      { name: "Task Steps", slug: "tasksteps" },
      { name: "Step Tracker Widget", slug: "steptrackerwidget" },
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
