import { getComponentBySlug, type RegistryItem } from "./registry";

export interface SolCatalogItemDef {
  name: string;
  slug: string;
  ships?: string;
  builtFrom?: string;
}

export interface SolCatalogCategory {
  id: string;
  name: string;
  items: SolCatalogItemDef[];
}

export interface SolResolvedItem extends RegistryItem {
  ships?: string;
  builtFrom?: string;
}

export interface SolResolvedCategory {
  id: string;
  name: string;
  items: SolResolvedItem[];
}

export const SOL_CATALOG_CATEGORIES: SolCatalogCategory[] = [
  {
    id: "wallet-identity",
    name: "Wallet & identity",
    items: [
      { name: "Multi Wallet Switcher", slug: "multiwalletswitcher" },
      { name: "Address Display", slug: "addressdisplay" },
      { name: "Qr Code", slug: "qrcode" },
      { name: "Solana Identity Card", slug: "solanaidentitycard" },
      { name: "Solana Wallet Card", slug: "solanawalletcard" },
      {
        name: "Wallet Sheet",
        slug: "walletsheet",
        ships: "connect / switch / disconnect",
      },
      {
        name: "Auth Card",
        slug: "authcard",
        ships: "sign-in / session",
      },
      {
        name: "Account Card",
        slug: "accountcard",
        ships: "profile + explorer + copy",
      },
      {
        name: "Crypto User Profile",
        slug: "cryptouserprofile",
        ships: "profile + volume + stats",
      },
    ],
  },
  {
    id: "tokens-trading",
    name: "Tokens & trading",
    items: [
      {
        name: "Crypto Swap Box",
        slug: "cryptoswapbox",
        ships: "full swap widget",
      },
      {
        name: "Order Book",
        slug: "orderbook",
        ships: "depth + spread + live bids",
      },
      {
        name: "Price Ticker",
        slug: "priceticker",
        ships: "continuous token marquee",
      },
      {
        name: "Solana Token Card",
        slug: "solanatokencard",
        ships: "balances + list",
      },
      {
        name: "Solana Nft Card",
        slug: "solananftcard",
        ships: "collectible grid",
      },
      { name: "Token Input", slug: "tokeninput" },
      { name: "Token Pair", slug: "tokenpair" },
      { name: "Token List Item", slug: "tokenlistitem" },
      { name: "Token Icon Group", slug: "tokenicongroup" },
      { name: "Token Command", slug: "tokencommand" },
      {
        name: "Trade Box",
        slug: "tradebox",
        ships: "buy/sell ticket",
      },
      { name: "Trade Buttons", slug: "tradebuttons" },
      { name: "Trade Toggle Pill", slug: "tradetogglepill" },
      { name: "Order Form", slug: "orderform" },
    ],
  },
  {
    id: "pools-positions-finance",
    name: "Pools, positions & finance",
    items: [
      { name: "Pool Card", slug: "poolcard" },
      {
        name: "Liquidity Pool Card",
        slug: "liquiditypoolcard",
        ships: "LP + open position",
      },
      { name: "Position Card", slug: "positioncard" },
      {
        name: "Candlestick Chart",
        slug: "cryptosalescandlestickchart",
        ships: "volume candlesticks",
      },
      {
        name: "Segmented Bars",
        slug: "cryptosalessegmentedbars",
        ships: "matrix bar metrics",
      },
      {
        name: "Solana Batch Stacks",
        slug: "runstatsstacks",
        ships: "3D stacked run batches",
      },
      {
        name: "Staking Card",
        slug: "stakingcard",
        ships: "stake / unstake / APY",
      },
      { name: "Balance Display", slug: "balancedisplay" },
      { name: "Bank Balance Card", slug: "bankbalancecard" },
      {
        name: "Request Withdrawal Card",
        slug: "withdrawalcard",
        ships: "presets + fee split",
      },
      {
        name: "Financial Metrics Grid",
        slug: "financialmetricsgrid",
        ships: "KPI header",
      },
    ],
  },
  {
    id: "status-feedback-motion",
    name: "Status, feedback & motion",
    items: [
      { name: "Step Tracker Widget", slug: "steptrackerwidget", ships: "pipeline progress + steps" },
      { name: "Signature Status Badge", slug: "signaturestatusbadge" },
      { name: "Status Badge Pill", slug: "statusbadgepill" },
      { name: "Multi State Badge", slug: "multistatebadge" },
      { name: "Trend Badge", slug: "trendbadge" },
      { name: "Solana Transaction Status", slug: "solanatransactionstatus" },
      { name: "Txn Toast", slug: "txntoast" },
      { name: "Success Check", slug: "successcheck" },
      { name: "Error State Shake", slug: "errorstateshake" },
      { name: "Value Flash", slug: "valueflash" },
      { name: "Digit Swap", slug: "digitswap" },
      { name: "Spinning Counter", slug: "spinningcounter" },
      { name: "Solana Progress Ring", slug: "progressring" },
      {
        name: "Activity Feed",
        slug: "activityfeed",
        ships: "recent txns",
      },
      {
        name: "Transaction Modal",
        slug: "transactionmodal",
        ships: "modal -> receipt",
      },
    ],
  },
  {
    id: "controls-primitives",
    name: "Controls & primitives",
    items: [
      { name: "Button", slug: "uxbutton" },
      { name: "Family Popover Menu", slug: "familypopovermenu", ships: "spring expanding popover" },
      { name: "Smooth Tabs", slug: "smoothtabs" },
      { name: "Animated Tabs", slug: "animatedtabs" },
      { name: "Toggle Pill", slug: "togglepill" },
      { name: "Liquid Radio", slug: "liquidradio" },
      { name: "Draw Checkbox", slug: "drawcheckbox" },
      { name: "Leverage Slider", slug: "leverageslider" },
      { name: "Slippage Selector", slug: "slippageselector" },
      { name: "Priority Fee Selector", slug: "priorityfeeselector" },
      { name: "Password Strength", slug: "passwordstrength" },
    ],
  },
  {
    id: "layout-presence-brand",
    name: "Layout, presence & brand",
    items: [
      { name: "Presence Avatars", slug: "presenceavatars" },
      { name: "Solana Card Stack", slug: "cardstack", ships: "spring swipe card deck" },
      { name: "Verification Badges", slug: "verificationbadges" },
      {
        name: "Solana Event Card",
        slug: "solanaeventcard",
        ships: "date + join + share",
      },
      {
        name: "Crypto Price Pills",
        slug: "cryptopricepills",
        ships: "prices + 24h",
      },
      { name: "Marquee", slug: "marquee" },
      {
        name: "Oxygen UI Pill",
        slug: "oxygenuipill",
        ships: "marketing chrome",
      },
    ],
  },
];

export function getSolCatalogMergedCategories(): SolResolvedCategory[] {
  const seenSlugs = new Set<string>();

  return SOL_CATALOG_CATEGORIES.map((cat) => {
    const items: SolResolvedItem[] = [];

    for (const entry of cat.items) {
      if (seenSlugs.has(entry.slug)) continue;
      seenSlugs.add(entry.slug);

      const item = getComponentBySlug(entry.slug);
      if (item) {
        items.push({
          ...item,
          name: entry.name,
          title: entry.name,
          ships: entry.ships,
          builtFrom: entry.builtFrom,
        });
      }
    }

    return {
      id: cat.id,
      name: cat.name,
      items,
    };
  });
}
