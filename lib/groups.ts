export interface GroupInfo {
  name: string;
  description: string;
  slugs: string[];
}

export const GROUP_TAXONOMY: GroupInfo[] = [
  {
    name: "Tokens & Assets",
    description: "Token lists, inputs, pairs, market cap badges.",
    slugs: [
      "solanaeventcard",
      "solanatokencard",
      "tokencommand",
      "tokenicongroup",
      "tokeninput",
      "tokenlistitem",
      "tokenpair",
    ],
  },

  {
    name: "Wallet & Identity",
    description: "Address displays, balances, drawers, switchers.",
    slugs: [
      "addressdisplay",
      "authcard",
      "multiwalletswitcher",
      "solanaidentitycard",
      "solanawalletcard",
      "walletsheet",
    ],
  },
  {
    name: "Swap, Trade & Orders",
    description: "Execution UI: swap boxes, books, sliders, fees.",
    slugs: [
      "cryptoswapbox",
      "cryptotradingterminal",
      "leverageslider",
      "orderbook",
      "orderform",
      "priorityfeeselector",
      "routesummary",
      "slippageselector",
      "tradebox",
      "tradebuttons",
      "tradetogglepill",
    ],
  },
  {
    name: "DeFi Positions & Yield",
    description: "Positions, pools, staking, liquidity, health bars.",
    slugs: [
      "liquiditypoolcard",
      "poolcard",
      "pooltable",
      "positioncard",
      "positiontable",
      "stakingcard",
    ],
  },

  {
    name: "NFTs",
    description: "Gallery, listing, traits, offers, floor.",
    slugs: [
      "solananftcard",
    ],
  },
  {
    name: "Charts & Metrics",
    description: "Price, TVL, sales, gauges, progress.",
    slugs: [
      "cryptosalescandlestickchart",

      "cryptosalessegmentedbars",
      "cryptosalesverticalgraph",
      "cryptotvlanalyticschart",
      "cryptotvlsparkbarwidget",
      "financialmetricsgrid",
      "gauge",
      "pricechart",
      "priceticker",
      "progressring",
      "segmentedprogresscard",
      "statcard",
    ],
  },
  {
    name: "Predictions & Markets",
    description: "Up/down, odds, candidates, carousels.",
    slugs: [
      "cryptopredictioncandidatecard",
    ],
  },

  {
    name: "Transactions & Activity",
    description: "Status, receipts, tables, toasts, history.",
    slugs: [
      "activityfeed",
      "signaturestatusbadge",
      "solanatransactionstatus",

      "transactionmodal",
      "transactionreceipt",
      "txntable",
      "txntoast",
    ],
  },
  {
    name: "Buttons, Actions & Menus",
    description: "Click / hold / confirm / speed-dial patterns.",
    slugs: [
      "actionbox",
      "gooeymenu",
      "solanapaybutton",
      "uxbutton",
      "multiplestatebutton",
    ],
  },
  {
    name: "Inputs, Forms & Selectors",
    description: "Fields, sliders, toggles, OTP, command.",
    slugs: [
      "drawcheckbox",
      "inputmorphmessage",
      "liquidradio",
      "togglegroup",
      "togglepill",
    ],
  },


  {
    name: "Feedback, Status & Notifications",
    description: "Badges, alerts, toasts, success/error motion.",
    slugs: [
      "errorstateshake",
      "multistatebadge",
      "notificationsstack",
      "statusbadgepill",
      "successcheck",
      "trendbadge",
      "verificationbadges",

    ],
  },
  {
    name: "Navigation, Layout & Overlays",
    description: "Tabs, drawers, sheets, stacks, carousels.",
    slugs: [
      "animatedtabs",
      "cardstack",
      "cryptoexplorecategories",
      "familydialog",
      "familydrawer",
      "familypopovermenu",
      "marquee",
      "smoothtabs",
      "underlayactionsheet",


    ],
  },
  {
    name: "Network, Security & Infra",
    description: "RPC, gas, keys, health, pay.",
    slugs: [
      "qrcode",
      "secretkeywarningbox",
    ],
  },

  {
    name: "Engagement & Gamification",
    description: "Quests, streaks, leaderboards, airdrops, voting.",
    slugs: [
      "cryptosubscriptioncard",
      "runstatsstacks",
      "spinningcounter",
      "steptrackerwidget",
      "timeline",

    ],
  },

  {
    name: "Checkout & Commerce",
    description: "Pay / subscribe / checkout surfaces.",
    slugs: [
      "cryptocheckoutcard",
    ],
  },
  {
    name: "Visual / Motion primitives",
    description: "Look-and-feel helpers that wrap other components.",
    slugs: [
      "digitswap",
    ],
  },
  {
    name: "Special",
    description: "Specialized metrics sections, insights, and unique marketing blocks.",
    slugs: [
      "metrics01",
      "bankbalancecard",
      "withdrawalcard",
      "animatednumberflow",

      "floatinglabel",
      "passwordstrength",
      "tasksteps",
      "wizardsteps",
      "valueflash",
      "logomarquee",
      "presenceavatars",
    ],
  },
];

const SLUG_TO_GROUP = new Map<string, string>();

for (const group of GROUP_TAXONOMY) {
  for (const slug of group.slugs) {
    SLUG_TO_GROUP.set(slug.toLowerCase(), group.name);
  }
}

export function getGroupForSlug(slug: string): string {
  return SLUG_TO_GROUP.get(slug.toLowerCase()) || "Other";
}
