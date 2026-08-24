import { createElement, type ReactNode } from "react";
import { MotionIcon } from "@/components/Description/icons";

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

export type ComponentItem = {
  name: string;
  href: string;
  description?: string;
  registry?: string;
  source?: string;
  preview?: string;
  image?: string;
  featured?: boolean;
  dependencies?: Dependency[];
  interaction?: string;
  usage?: string;
  props?: ComponentProp[];
  credits?: string[];
};

export const REGISTRY_HOMEPAGE = "https://github.com/Subhan-code/oxygen_ui";
export const REGISTRY_REPO = "Subhan-code/oxygen_ui";

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

export const components: ComponentItem[] = [
  {
    name: "Timeline",
    href: "/components/timeline",
    description: "Timeline component for Oxygen UI.",
    registry: "timeline",
    source: `${REGISTRY_HOMEPAGE}/components/ui/timeline.tsx`,
  },
  {
    name: "Curved Bar",
    href: "/components/curvedtabbar",
    description: "Curved Tab Bar component for Oxygen UI.",
    registry: "curved-tab-bar",
    source: `${REGISTRY_HOMEPAGE}/components/ui/curved-tab-bar.tsx`,
  },
  {
    name: "Step Tracker",
    href: "/components/steptrackerwidget",
    description: "Step Tracker Widget component for Oxygen UI.",
    registry: "step-tracker-widget",
    source: `${REGISTRY_HOMEPAGE}/components/ui/step-tracker-widget.tsx`,
  },
  {
    name: "Smooth Tabs",
    href: "/components/smoothtabs",
    description: "Smooth Tabs component for Oxygen UI.",
    registry: "smooth-tabs",
    source: `${REGISTRY_HOMEPAGE}/components/ui/smooth-tabs.tsx`,
  },
  {
    name: "Progress Card",
    href: "/components/segmentedprogresscard",
    description: "Segmented Progress Card component for Oxygen UI.",
    registry: "segmented-progress-card",
    source: `${REGISTRY_HOMEPAGE}/components/ui/segmented-progress-card.tsx`,
  },
  {
    name: "QR Code",
    href: "/components/qrcode",
    description: "Qr Code component for Oxygen UI.",
    registry: "qr-code",
    source: `${REGISTRY_HOMEPAGE}/components/ui/qr-code.tsx`,
  },
  {
    name: "Password Input",
    href: "/components/passwordinput",
    description: "Password Input component for Oxygen UI.",
    registry: "password-input",
    source: `${REGISTRY_HOMEPAGE}/components/ui/password-input.tsx`,
  },
  {
    name: "Notifications",
    href: "/components/notificationsstack",
    description: "Notifications Stack component for Oxygen UI.",
    registry: "notifications-stack",
    source: `${REGISTRY_HOMEPAGE}/components/ui/notifications-stack.tsx`,
  },
  {
    name: "Status Badge",
    href: "/components/multistatebadge",
    description: "Multi State Badge component for Oxygen UI.",
    registry: "multi-state-badge",
    source: `${REGISTRY_HOMEPAGE}/components/ui/multi-state-badge.tsx`,
  },
  {
    name: "Marquee",
    href: "/components/marquee",
    description: "Marquee component for Oxygen UI.",
    registry: "marquee",
    source: `${REGISTRY_HOMEPAGE}/components/ui/marquee.tsx`,
  },
  {
    name: "Logo Carousel",
    href: "/components/logocarousel",
    description: "Logo Carousel component for Oxygen UI.",
    registry: "logo-carousel",
    source: `${REGISTRY_HOMEPAGE}/components/ui/logo-carousel.tsx`,
  },
  {
    name: "Liquid Radio",
    href: "/components/liquidradio",
    description: "Liquid Radio component for Oxygen UI.",
    registry: "liquid-radio",
    source: `${REGISTRY_HOMEPAGE}/components/ui/liquid-radio.tsx`,
  },
  {
    name: "Hold Button",
    href: "/components/holdtoconfirm",
    description: "Hold To Confirm component for Oxygen UI.",
    registry: "hold-to-confirm",
    source: `${REGISTRY_HOMEPAGE}/components/ui/hold-to-confirm.tsx`,
  },
  {
    name: "Heatmap Chart",
    href: "/components/heatmapchart",
    description: "Heatmap Chart component for Oxygen UI.",
    registry: "heatmap-chart",
    source: `${REGISTRY_HOMEPAGE}/components/ui/heatmap-chart.tsx`,
  },
  {
    name: "Glass Filter",
    href: "/components/glassfilter",
    description: "Glass Filter component for Oxygen UI.",
    registry: "glass-filter",
    source: `${REGISTRY_HOMEPAGE}/components/ui/glass-filter.tsx`,
  },
  {
    name: "Gauge",
    href: "/components/gauge",
    description: "Gauge component for Oxygen UI.",
    registry: "gauge",
    source: `${REGISTRY_HOMEPAGE}/components/ui/gauge.tsx`,
  },
  {
    name: "Action Button",
    href: "/components/floatingactionbutton",
    description: "Floating Action Button component for Oxygen UI.",
    registry: "floating-action-button",
    source: `${REGISTRY_HOMEPAGE}/components/ui/floating-action-button.tsx`,
  },
  {
    name: "Metrics Grid",
    href: "/components/financialmetricsgrid",
    description: "Financial Metrics Grid component for Oxygen UI.",
    registry: "financial-metrics-grid",
    source: `${REGISTRY_HOMEPAGE}/components/ui/financial-metrics-grid.tsx`,
  },
  {
    name: "Family Drawer",
    href: "/components/familydrawer",
    description: "Family Drawer component for Oxygen UI.",
    registry: "family-drawer",
    source: `${REGISTRY_HOMEPAGE}/components/ui/family-drawer.tsx`,
  },
  {
    name: "Family Dialog",
    href: "/components/familydialog",
    description: "Family Dialog component for Oxygen UI.",
    registry: "family-dialog",
    source: `${REGISTRY_HOMEPAGE}/components/ui/family-dialog.tsx`,
  },
  {
    name: "Exploding Menu",
    href: "/components/explodingmenu",
    description: "Exploding Menu component for Oxygen UI.",
    registry: "exploding-menu",
    source: `${REGISTRY_HOMEPAGE}/components/ui/exploding-menu.tsx`,
  },
  {
    name: "Event Pills",
    href: "/components/eventtagpills",
    description: "Event Tag Pills component for Oxygen UI.",
    registry: "event-tag-pills",
    source: `${REGISTRY_HOMEPAGE}/components/ui/event-tag-pills.tsx`,
  },
  {
    name: "Subscription Card",
    href: "/components/cryptosubscriptioncard",
    description: "Crypto Subscription Card component for Oxygen UI.",
    registry: "crypto-subscription-card",
    source: `${REGISTRY_HOMEPAGE}/components/ui/crypto-subscription-card.tsx`,
  },
  {
    name: "Checkout Card",
    href: "/components/cryptocheckoutcard",
    description: "Crypto Checkout Card component for Oxygen UI.",
    registry: "crypto-checkout-card",
    source: `${REGISTRY_HOMEPAGE}/components/ui/crypto-checkout-card.tsx`,
  },
  {
    name: "Copy Button",
    href: "/components/copybutton",
    description: "Copy Button component for Oxygen UI.",
    registry: "copy-button",
    source: `${REGISTRY_HOMEPAGE}/components/ui/copy-button.tsx`,
  },
  {
    name: "Cooldown Button",
    href: "/components/cooldownbutton",
    description: "Cooldown Button component for Oxygen UI.",
    registry: "cooldown-button",
    source: `${REGISTRY_HOMEPAGE}/components/ui/cooldown-button.tsx`,
  },
  {
    name: "Confetti Button",
    href: "/components/confettibutton",
    description: "Confetti Button component for Oxygen UI.",
    registry: "confetti-button",
    source: `${REGISTRY_HOMEPAGE}/components/ui/confetti-button.tsx`,
  },
  {
    name: "Command Palette",
    href: "/components/commandpalette",
    description: "Command Palette component for Oxygen UI.",
    registry: "command-palette",
    source: `${REGISTRY_HOMEPAGE}/components/ui/command-palette.tsx`,
  },
  {
    name: "Click To Copy",
    href: "/components/clicktocopy",
    description: "Click To Copy component for Oxygen UI.",
    registry: "click-to-copy",
    source: `${REGISTRY_HOMEPAGE}/components/ui/click-to-copy.tsx`,
  },
  {
    name: "Card Stack",
    href: "/components/cardstack",
    description: "Card Stack component for Oxygen UI.",
    registry: "card-stack",
    source: `${REGISTRY_HOMEPAGE}/components/ui/card-stack.tsx`,
  },
  {
    name: "Animated Tabs",
    href: "/components/animatedtabs",
    description: "Animated Tabs component for Oxygen UI.",
    registry: "animated-tabs",
    source: `${REGISTRY_HOMEPAGE}/components/ui/animated-tabs.tsx`,
  },
  {
    name: "Animated Switch",
    href: "/components/animatedswitch",
    description: "Animated Switch component for Oxygen UI.",
    registry: "animated-switch",
    source: `${REGISTRY_HOMEPAGE}/components/ui/animated-switch.tsx`,
  },
  {
    name: "Bounce sidebar",
    href: "/components/bouncesidebar",
    registry: "bounce-sidebar",
    description:
      "A vertical navigation list with a bouncy, spring-animated active indicator.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/bounce-sidebar.tsx`,
    preview: "/componentdemos/bouncesidebar.mp4",
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction: "Click any item to spring the bouncing marker over to it.",
    props: [
      {
        name: "items",
        type: "string[]",
        required: true,
        description: "Labels rendered as the vertical list of nav items.",
      },
      {
        name: "value",
        type: "number",
        description:
          "Active item index for controlled usage. When set, the component won't manage its own state.",
      },
      {
        name: "defaultValue",
        type: "number",
        default: "0",
        description:
          "Initial active index for uncontrolled usage. Ignored when value is provided.",
      },
      {
        name: "onChange",
        type: "(index: number) => void",
        description: "Called with the new index whenever an item is selected.",
      },
      {
        name: "dotColor",
        type: "string",
        default: '"#0066FF"',
        description:
          "Any CSS color for the bouncing active marker (hex, rgb, hsl, var).",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes merged onto the root <ul> element.",
      },
    ],
    usage: `import { BounceSidebar } from "@/components/ui/bounce-sidebar"
  
  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ]
  
  export function Demo() {
    return <BounceSidebar items={items} dotColor="#0066FF" />
  }`,
  },
  {
    name: "Proximity Sidebar",
    href: "/components/proximitysidebar",
    registry: "proximity-sidebar",
    description:
      "An interactive sidebar with proximity hover effects that appears while scrolling and responds to scroll intensity.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/proximity-sidebar.tsx`,
    preview: "/componentdemos/proximitysidebar.mp4",
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Scroll through content to track the current section, then move the pointer near dashes to expand them and click to smooth-scroll to a section.",
    props: [
      {
        name: "sections",
        type: 'Array<{ id: string; label: string; kind?: "title" | "subtitle" | "section" | "body"; level?: 1 | 2 | 3 | 4 | 5 | 6 }>',
        required: true,
        description:
          "Ordered section map used for rendering dashes and scroll targeting. Each id must match an element id present in the page.",
      },
      {
        name: "side",
        type: '"left" | "right"',
        default: '"left"',
        options: ["left", "right"],
        description:
          "Pins the minimap to the chosen side and flips dash transform origin accordingly.",
      },
      {
        name: "activeOffset",
        type: "number",
        default: "0.4",
        description:
          "Viewport anchor ratio used to detect the active section while scrolling (0 = top, 1 = bottom).",
      },
      {
        name: "className",
        type: "string",
        description: "Additional classes for the outer nav wrapper.",
      },
    ],
    usage: `import ProximitySidebar, { type ProximitySection } from "@/components/ui/proximity-sidebar"

const sections = [
  { id: "intro", label: "Introduction", level: 1 },
  { id: "setup", label: "Setup", level: 2 },
  { id: "api", label: "API", kind: "section" },
  { id: "faq", label: "FAQ", kind: "body" },
] satisfies ProximitySection[]

export function Demo() {
  return (
    <aside className="sticky top-20 h-[70vh]">
      <ProximitySidebar
        sections={sections}
        side="left"
        activeOffset={0.4}
      />
    </aside>
  )
}`,
    credits: ["Syed Subhan"],
  },
  {
    name: "Wallet Dashboard",
    href: "/components/cryptowalletdashboard",
    registry: "crypto-wallet-dashboard",
    description:
      "A mobile crypto wallet dashboard with account navigation, balance breakdown, drawer navigation, and settings sheet.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-wallet-dashboard.tsx`,
    interaction:
      "Click the avatar button to slide open the main menu drawer, or tap the plus icon to reveal settings overlay.",
    usage: `import { CryptoWalletDashboard } from "@/components/ui/crypto-wallet-dashboard"

export function Demo() {
  return <CryptoWalletDashboard />
}`,
  },
  {
    name: "User Profile",
    href: "/components/cryptouserprofile",
    registry: "crypto-user-profile",
    description:
      "A crypto user profile card displaying handle, trade volume metrics, follower statistics, and profile management actions.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-user-profile.tsx`,
    interaction:
      "Click Manage Profile or Share Profile to trigger profile actions.",
    usage: `import { CryptoUserProfile } from "@/components/ui/crypto-user-profile"

export function Demo() {
  return <CryptoUserProfile />
}`,
  },
  {
    name: "Explore Hub",
    href: "/components/cryptoexplorehub",
    registry: "crypto-explore-hub",
    description:
      "A market explore hub featuring category filter pills, watchlist assets, trending tokens list, and news feed.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-explore-hub.tsx`,
    interaction:
      "Switch between Tokens, People, and Sites categories or tap news items to explore markets.",
    usage: `import { CryptoExploreHub } from "@/components/ui/crypto-explore-hub"

export function Demo() {
  return <CryptoExploreHub />
}`,
  },
  {
    name: "Cookie Banner",
    href: "/components/cryptocookiebanner",
    registry: "crypto-cookie-banner",
    description:
      "A floating cookie policy consent dialog with customizable action pills and header bar.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-cookie-banner.tsx`,
    interaction:
      "Click Accept or Reject to dismiss the consent banner, or click policy links to view terms.",
    usage: `import { CryptoCookieBanner } from "@/components/ui/crypto-cookie-banner"

export function Demo() {
  return <CryptoCookieBanner />
}`,
  },
  {
    name: "Crypto swap card",
    href: "/components/cryptoswapcard",
    registry: "crypto-swap-card",
    description:
      "A token swap card featuring instant token flip animation, rate feedback, and market token rankings.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-swap-card.tsx`,
    interaction:
      "Click the swap arrow button to invert pay and receive tokens with animated position flip.",
    usage: `import { CryptoSwapCard } from "@/components/ui/crypto-swap-card"

export function Demo() {
  return <CryptoSwapCard />
}`,
  },
  {
    name: "Prediction Markets",
    href: "/components/cryptopredictionmarkets",
    registry: "crypto-prediction-markets",
    description:
      "A prediction market hub with quick 5-minute market bet cards and election event odds breakdown.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-prediction-markets.tsx`,
    interaction:
      "Tap any candidate odds row or 5-minute market tile to review bet parameters.",
    usage: `import { CryptoPredictionMarkets } from "@/components/ui/crypto-prediction-markets"

export function Demo() {
  return <CryptoPredictionMarkets />
}`,
  },
  {
    name: "Project Progress",
    href: "/components/cryptoprojectprogress",
    registry: "crypto-project-progress",
    description:
      "A project completion progress widget with dual segmented bar meters and weekly momentum indicator.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-project-progress.tsx`,
    interaction:
      "View real-time project progress rates and target sales indicators.",
    usage: `import { CryptoProjectProgress } from "@/components/ui/crypto-project-progress"

export function Demo() {
  return <CryptoProjectProgress />
}`,
  },
  {
    name: "Up Down Chart",
    href: "/components/cryptoupdownchart",
    registry: "crypto-up-down-chart",
    description:
      "A live binary options market card featuring glowing SVG sparkline, target price threshold, and countdown timer.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-up-down-chart.tsx`,
    interaction:
      "Click Up or Down buttons to place a prediction before the timer expires.",
    usage: `import { CryptoUpDownChart } from "@/components/ui/crypto-up-down-chart"

export function Demo() {
  return <CryptoUpDownChart />
}`,
  },
  {
    name: "Progress Ring",
    href: "/components/cryptoprogressring",
    registry: "crypto-progress-ring",
    description:
      "A circular SVG glow progress ring widget with expandable radial speed-dial action menu.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-progress-ring.tsx`,
    interaction:
      "Click the plus button to unfold radial quick action speed-dial menu items.",
    usage: `import { CryptoProgressRing } from "@/components/ui/crypto-progress-ring"

export function Demo() {
  return <CryptoProgressRing />
}`,
  },
  {
    name: "Sales Chart",
    href: "/components/cryptosaleschart",
    registry: "crypto-sales-chart",
    description:
      "A sales analytics summary card supporting candlestick, segmented status levels, and vertical bar chart views.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-sales-chart.tsx`,
    interaction:
      "Toggle top view mode buttons to switch chart rendering between candlestick, segmented, and bar modes.",
    usage: `import { CryptoSalesChart } from "@/components/ui/crypto-sales-chart"

export function Demo() {
  return <CryptoSalesChart />
}`,
  },
  {
    name: "TVL Analytics",
    href: "/components/cryptotvlanalytics",
    registry: "crypto-tvl-analytics",
    description:
      "A tactical TVL analytics card featuring interactive crosshair tooltip, net flow breakdown, and timeframe tabs.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-tvl-analytics.tsx`,
    interaction:
      "Hover over line chart points to inspect TVL and transaction counts for specific dates.",
    usage: `import { CryptoTvlAnalytics } from "@/components/ui/crypto-tvl-analytics"

export function Demo() {
  return <CryptoTvlAnalytics />
}`,
  },
  {
    name: "Leaderboard",
    href: "/components/cryptotraderleaderboard",
    registry: "crypto-trader-leaderboard",
    description:
      "A trader leaderboard and trending dApp directory featuring rank badges and follow toggles.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-trader-leaderboard.tsx`,
    interaction:
      "Click Follow buttons to toggle trader follow status.",
    usage: `import { CryptoTraderLeaderboard } from "@/components/ui/crypto-trader-leaderboard"

export function Demo() {
  return <CryptoTraderLeaderboard />
}`,
  },
  {
    name: "Trading Terminal",
    href: "/components/cryptotradingterminal",
    registry: "crypto-trading-terminal",
    description:
      "A dark crypto trading workspace with inline token swap, interactive balance chart, and multi-wallet asset cards.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-trading-terminal.tsx`,
    interaction:
      "Switch timeframe tabs to inspect balance history or toggle the swap and transfer switch.",
    usage: `import { CryptoTradingTerminal } from "@/components/ui/crypto-trading-terminal"

export function Demo() {
  return <CryptoTradingTerminal />
}`,
  },
  {
    name: "Crypto token details",
    href: "/components/cryptotokendetails",
    registry: "crypto-token-details",
    description:
      "A token detail view displaying live price line chart, position holdings, live chat status, and trade bar.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-token-details.tsx`,
    interaction:
      "Switch timeframe pills to update price chart resolution or tap the heart button to favorite.",
    usage: `import { CryptoTokenDetails } from "@/components/ui/crypto-token-details"

export function Demo() {
  return <CryptoTokenDetails />
}`,
  },
  {
    name: "Toggle Pill",
    href: "/components/togglepill",
    registry: "toggle-pill",
    description:
      "A 74x28px toggle track with 44x22px sliding capsule thumb supporting spring physics, CSS transitions, and styling presets.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/toggle-pill.tsx`,
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Click or press Space to toggle the capsule thumb with animated 24px horizontal shift.",
    usage: `import { TogglePill } from "@/components/ui/toggle-pill"

export function Demo() {
  return <TogglePill variant="monochrome-dark" defaultChecked />
}`,
    props: [
      {
        name: "checked",
        type: "boolean",
        description: "Controlled active state of the toggle switch.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        default: "false",
        description: "Initial state for uncontrolled usage.",
      },
      {
        name: "variant",
        type: '"monochrome-dark" | "monochrome-light" | "apple-ios" | "linear-indigo" | "spotify-green" | "electric-blue"',
        default: '"monochrome-dark"',
        description: "Styling profile preset determining track and thumb colors.",
      },
      {
        name: "showGuides",
        type: "boolean",
        default: "false",
        description: "Renders visual alignment guidelines for padding and margins.",
      },
      {
        name: "useCssTransition",
        type: "boolean",
        default: "false",
        description: "Switches transition engine from Framer Motion spring to pure CSS.",
      },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        description: "Callback invoked whenever switch state toggles.",
      },
    ],
  },
  {
    name: "Scroll Progress",
    href: "/components/scrollprogressindicator",
    registry: "scroll-progress",
    description:
      "A scroll progress pill that tracks reading position and expands into a squircle menu of sections you can jump to.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/scroll-progress.tsx`,
    preview: "/componentdemos/scrollprogress.mp4",
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Scroll to fill the ring and watch the active section label crossfade in. Click the pill to morph it into a squircle menu, then tap any section to smooth-scroll there. Click outside or press Escape to close.",
    props: [
      {
        name: "sections",
        type: "Array<{ id: string; label: string }>",
        default: "[]",
        description:
          "Ordered sections shown as the reader moves and listed in the menu. Each id must match an element id present in the scrolled content.",
      },
      {
        name: "containerRef",
        type: "React.RefObject<HTMLElement | null>",
        description:
          "Scroll container to track and scroll within. Defaults to the window when omitted.",
      },
      {
        name: "offset",
        type: "number",
        default: "120",
        description:
          "Distance in pixels below the scroller's top edge that a section must cross to be marked active.",
      },
      {
        name: "className",
        type: "string",
        description:
          "Extra classes merged onto the fixed root wrapper — use it to reposition the pill.",
      },
    ],
    usage: `"use client"

import { useRef } from "react"
import ScrollProgress from "@/components/ui/scroll-progress"

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "usage", label: "Usage" },
  { id: "faq", label: "FAQ" },
]

export function Demo() {
  const scrollRef = useRef<HTMLElement>(null)

  return (
    <main ref={scrollRef} className="relative h-full overflow-auto">
      <ScrollProgress containerRef={scrollRef} sections={sections} />

      <section id="intro">{/* ... */}</section>
      <section id="usage">{/* ... */}</section>
      <section id="faq">{/* ... */}</section>
    </main>
  )
}

// Tracks the window with no container ref:
// <ScrollProgress sections={sections} />`,
  },

  {
    name: "OTP Input",
    href: "/components/otpinput",
    registry: "otp-input",
    description:
      "A one-time-code input whose characters roll into place behind a caret that slides from slot to slot.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/otp-input.tsx`,
    preview: "/componentdemos/otpinput.mp4",
    featured: true,
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Type to fill each slot and move to the next one. Backspace clears a slot in place, then steps back on the next press. Arrow keys move between slots, and a caret slides along with you. Pasting a code, or letting the phone autofill one from a text message, drops it straight in. Set the status to turn the slots green, or shake them red on a wrong code.",
    props: [
      {
        name: "length",
        type: "number",
        default: "6",
        description:
          "How many boxes to render, so a 4 digit code is length={4}. Any count works.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        options: ["sm", "md", "lg"],
        description:
          "Overall scale of the boxes. Maps to 40px (sm), 48px (md), and 56px (lg), and carries the text, caret, and gaps with it.",
      },
      {
        name: "value",
        type: "string",
        description:
          "The current code. Pass it to control the input yourself; leave it out to let the component track its own state.",
      },
      {
        name: "defaultValue",
        type: "string",
        default: '""',
        description: "Starting code when the input is uncontrolled.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Fires on every edit with the full code so far.",
      },
      {
        name: "onComplete",
        type: "(value: string) => void",
        description: "Fires once the last slot is filled.",
      },
      {
        name: "type",
        type: '"numbers" | "letters" | "both"',
        default: '"numbers"',
        options: ["numbers", "letters", "both"],
        description:
          "Which characters a slot accepts. Anything else is ignored, including on paste.",
      },
      {
        name: "status",
        type: '"idle" | "success" | "error"',
        default: '"idle"',
        options: ["idle", "success", "error"],
        description:
          "Drives the feedback state. Success traces a green ring around each box in turn, error rings them red and shakes the row once.",
      },
      {
        name: "mask",
        type: "boolean",
        default: "false",
        description: "Hides the characters, like a password field.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Blocks input and dims every slot.",
      },
      {
        name: "autoFocus",
        type: "boolean",
        default: "false",
        description: "Focuses the first slot on mount.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes for the row that wraps the slots.",
      },
      {
        name: "slotClassName",
        type: "string",
        description: "Extra classes for each slot, for sizing and colors.",
      },
    ],
    usage: `import { useState } from "react"
import OtpInput, { type OtpStatus } from "@/components/ui/otp-input"

export function Demo() {
  const [status, setStatus] = useState<OtpStatus>("idle")

  return (
    <OtpInput
      length={6}
      size="md"
      status={status}
      onChange={() => setStatus("idle")}
      onComplete={(code) => setStatus(checkCode(code) ? "success" : "error")}
    />
  )
}`,
  },
  {
    name: "GitHub activity",
    href: "/components/githubactivity",
    registry: "github-activity",
    description:
      "A contribution heatmap with a footer panel that expands over the grid to rank your top repositories.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/github-activity.tsx`,
    preview: "/componentdemos/githubgraphcomponentblack.mp4",
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Click the chevron to expand the top repositories over the grid, and again to collapse them back into the stack. Hover any cell for its count and date.",
    props: [
      {
        name: "username",
        type: "string",
        description: "The GitHub username you want the data for.",
      },
      {
        name: "contributions",
        type: "Contribution[]",
        default: "[]",
        description: "Your own contribution data, instead of a username.",
      },
      {
        name: "repos",
        type: "RepoContribution[]",
        default: "[]",
        description: "The repositories listed in the footer, highest first.",
      },
      {
        name: "year",
        type: "number",
        description:
          "Year shown in the heading. Defaults to the year of the last contribution.",
      },
      {
        name: "accent",
        type: "string | string[]",
        default: '"#39d353"',
        description: "The color of the contribution squares.",
      },
      {
        name: "cellSize",
        type: "number",
        default: "11",
        description: "Size of each day square in pixels.",
      },
      {
        name: "months",
        type: "number",
        default: "12",
        description: "How many months of history to show.",
      },
      {
        name: "showMonths",
        type: "boolean",
        default: "false",
        description: "Adds a row of month names above the grid.",
      },
      {
        name: "label",
        type: "string",
        default: '"Top contributions in:"',
        description: "Text shown in the footer next to the avatars.",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        description:
          "Starts with the repository panel open. Ignored when open is set.",
      },
      {
        name: "open",
        type: "boolean",
        description:
          "Panel state for controlled usage. When set, the component stops managing its own state.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Called with the next state when the chevron is clicked.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes for the card that wraps the grid.",
      },
    ],
    usage: `import GitHubActivity from "@/components/ui/github-activity"

export function Demo() {
  return <GitHubActivity username="Subhan-code" />
}

// or pass everything yourself
<GitHubActivity
  contributions={contributions}
  repos={[{ name: "Zero mail", count: 412, logo: <ZeroIcon /> }]}
  accent={["#0e4429", "#006d32", "#26a641", "#39d353"]}
/>`,
  },
  {
    name: "Emoji reaction",
    href: "/components/emojireaction",
    registry: "emoji-reaction",
    description:
      "A tapback-style reaction button that opens a bar of Apple emoji and sends copies of your pick floating up out of it.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/emoji-reaction.tsx`,
    preview: "/componentdemos/emojireaction.mp4",
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
      { name: "react-apple-emojis" },
      { name: "lucide-react" },
      { name: "@radix-ui/react-slot" },
    ],
    interaction:
      "Click the button to pop the emoji bar open, or press and drag straight onto an emoji to pick it in one gesture. Hover an emoji to lift it. Pick one and 5 copies stream up off it, drifting apart, shrinking, and blurring out of focus as they climb. Hold the emoji down to keep them coming. The bar flips below the button when there's no room above, and arrow keys move along it. While it's open the button turns into a cross; click that, click outside, or press Escape to close. The button then shows your last pick.",
    props: [
      {
        name: "emojis",
        type: "string[]",
        default: "5 default faces",
        description:
          "Apple emoji names shown in the bar, hyphenated as on Emojipedia. Anything beyond the five defaults needs emojiData too.",
      },
      {
        name: "emojiData",
        type: "EmojiData",
        description:
          "Emoji name to image map passed to EmojiProvider. Defaults to the five bundled faces; pass react-apple-emojis/src/data.json for the full set.",
      },
      {
        name: "onReact",
        type: "(name: string) => void",
        description:
          "Called with the emoji name every time one is picked, including each repeat while it's held down.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        options: ["sm", "md", "lg"],
        description: "Scale of the button, the bar, and the emoji that fly up.",
      },
      {
        name: "align",
        type: '"left" | "center" | "right"',
        default: '"center"',
        options: ["left", "center", "right"],
        description:
          "Which edge of the bar lines up with the trigger. It still shifts inward when it would run off screen.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description:
          "Uses your own child as the trigger instead of the built-in button, so the bar can hang off a message, card, or image.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes merged onto the root element.",
      },
    ],
    usage: `import { EmojiReaction } from "@/components/ui/emoji-reaction"

export function Demo() {
  return <EmojiReaction onReact={(name) => console.log(name)} />
}

// or hang the bar off your own element
<EmojiReaction asChild>
  <button className="rounded-2xl bg-card p-4">Nice work</button>
</EmojiReaction>`,
  },
  {
    name: "Morph Input",
    href: "/components/inputmorphmessage",
    registry: "input-morph-message",
    description:
      "An input bar that morphs its text content into a message bubble when submitted.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/input-morph-message.tsx`,
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Type a message into the input field and press enter or click the plus button to send it.",
    usage: `import InputMorphMessage from "@/components/ui/input-morph-message"

export function Demo() {
  return <InputMorphMessage />
}`,
  },
  {
    name: "Gooey Menu",
    href: "/components/gooeymenu",
    registry: "gooey-menu",
    description:
      "A floating action menu with a fluid gooey SVG filter expansion.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/gooey-menu.tsx`,
    interaction:
      "Click the plus button to expand or collapse the menu items with a gooey spring animation.",
    usage: `import GooeyMenu from "@/components/ui/gooey-menu"

export function Demo() {
  return <GooeyMenu />
}`,
  },
  {
    name: "Stats Stack",
    href: "/components/runstatsstacks",
    registry: "run-stats-stacks",
    description:
      "A 3D stacked list of activity cards that unfolds into a vertical view on tap.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/run-stats-stacks.tsx`,
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Click the stacked cards to expand or collapse the run statistics list.",
    usage: `import RunStatsStacks from "@/components/ui/run-stats-stacks"

export function Demo() {
  return <RunStatsStacks />
}`,
  },
  {
    name: "Followers Popover",
    href: "/components/popoverslideselector",
    registry: "popover-slide-selector",
    description:
      "A follower popover menu that reveals a horizontal avatar list on click.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/popover-slide-selector.tsx`,
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Click the followers button to open the popover and scroll horizontally through avatars.",
    usage: `import PopoverSlideSelector from "@/components/ui/popover-slide-selector"

export function Demo() {
  return <PopoverSlideSelector />
}`,
  },
  {
    name: "Family Popover",
    href: "/components/familypopovermenu",
    registry: "family-popover-menu",
    description:
      "A circular trigger button that expands into a smooth menu card.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/family-popover-menu.tsx`,
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Click the plus icon button to expand the menu list, or click outside to dismiss it.",
    usage: `import FamilyPopoverMenu from "@/components/ui/family-popover-menu"

export function Demo() {
  return <FamilyPopoverMenu />
}`,
  },
  {
    name: "Action Sheet",
    href: "/components/underlayactionsheet",
    registry: "underlay-action-sheet",
    description:
      "An iOS-inspired underlay action sheet with drag-to-resize gesture physics.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/underlay-action-sheet.tsx`,
    dependencies: [
      {
        name: "motion",
        icon: createElement(MotionIcon, { className: "h-4 w-4" }),
      },
    ],
    interaction:
      "Drag the sheet handle up or down to expand or collapse the action sheet.",
    usage: `import UnderlayActionSheet from "@/components/ui/underlay-action-sheet"

export function Demo() {
  return <UnderlayActionSheet />
}`,
  },
  {
    name: "Gooey Button",
    href: "/components/buttongooy",
    registry: "button-gooey",
    description:
      "A call to action button with a gooey trailing arrow bubble on hover.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/button-gooey.tsx`,
    interaction:
      "Hover over the button to animate the arrow bubble.",
    usage: `import ButtonGooey from "@/components/ui/button-gooey"

export function Demo() {
  return <ButtonGooey />
}`,
  },
  {
    name: "Magnetic background tabs",
    href: "/components/magneticbackgroundtabs",
    registry: "magnetic-background-tabs",
    description:
      "A navigation tab bar with a magnetic hover spotlight effect.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/magnetic-background-tabs.tsx`,
    interaction:
      "Hover over the tab items to see the background follow cursor movement.",
    usage: `import MagneticBackgroundTabs from "@/components/ui/magnetic-background-tabs"

export function Demo() {
  return <MagneticBackgroundTabs />
}`,
  },
  {
    name: "Text typing effect",
    href: "/components/texttypingeffect",
    registry: "text-typing-effect",
    description:
      "A type-writer style text effect with a smooth fade sequence.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/text-typing-effect.tsx`,
    interaction:
      "Watch the text type word by word and transition smoothly between phrases.",
    usage: `import TextTypingEffectWithTextsFadeOut from "@/components/ui/text-typing-effect"

export function Demo() {
  return <TextTypingEffectWithTextsFadeOut />
}`,
  },
  {
    name: "Ripple Button",
    href: "/components/buttonrippleeffect",
    registry: "button-ripple-effect",
    description:
      "A click ripple animation originating from pointer coordinates.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/button-ripple-effect.tsx`,
    interaction:
      "Click anywhere on the button to emit an expanding material ripple wave.",
    usage: `import ButtonRippleEffect from "@/components/ui/button-ripple-effect"

export function Demo() {
  return <ButtonRippleEffect />
}`,
  },
  {
    name: "Spotlight Input",
    href: "/components/inputborderspotlight",
    registry: "input-border-spotlight",
    description:
      "An input container with a radial cursor-tracking spotlight border glow.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/input-border-spotlight.tsx`,
    interaction:
      "Move your mouse over the input or focus inside to reveal the glowing spotlight border.",
    usage: `import InputBorderSpotlight from "@/components/ui/input-border-spotlight"

export function Demo() {
  return <InputBorderSpotlight />
}`,
  },
  {
    name: "Panel reveal",
    href: "/components/panelreveal",
    registry: "panel-reveal",
    description:
      "A panel reveal effect featuring vertical translation and blur transition.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/panel-reveal.tsx`,
    interaction:
      "Click the button to reveal or collapse the panel with cross-blur interpolation.",
    usage: `import PanelReveal from "@/components/ui/panel-reveal"

export function Demo() {
  return <PanelReveal />
}`,
  },
  {
    name: "Modal transition",
    href: "/components/modaltransition",
    registry: "modal-transition",
    description:
      "A modal dialog transition with scale and opacity interpolation.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/modal-transition.tsx`,
    interaction:
      "Click the open button to animate the modal overlay and dialog frame into place.",
    usage: `import ModalTransition from "@/components/ui/modal-transition"

export function Demo() {
  return <ModalTransition />
}`,
  },
  {
    name: "Page side by side",
    href: "/components/pagesidebyside",
    registry: "page-side-by-side",
    description:
      "A page view transition with directional sliding and blur effects.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/page-side-by-side.tsx`,
    interaction:
      "Switch tabs to view side-by-side section transitions.",
    usage: `import PageSideBySide from "@/components/ui/page-side-by-side"

export function Demo() {
  return <PageSideBySide />
}`,
  },
  {
    name: "Input clear dissolve",
    href: "/components/inputcleardissolve",
    registry: "input-clear-dissolve",
    description:
      "An input field clear action with dissolving text flight animation.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/input-clear-dissolve.tsx`,
    interaction:
      "Type text into the input and click the clear button to watch text dissolve upward.",
    usage: `import InputClearDissolve from "@/components/ui/input-clear-dissolve"

export function Demo() {
  return <InputClearDissolve />
}`,
  },
  {
    name: "Skeleton Reveal",
    href: "/components/skeletonreveal",
    registry: "skeleton-reveal",
    description:
      "A skeleton placeholder loading shimmer that cross-fades into content.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/skeleton-reveal.tsx`,
    interaction:
      "Click the reveal button to cross-fade from skeleton pulse to loaded profile card.",
    usage: `import SkeletonReveal from "@/components/ui/skeleton-reveal"

export function Demo() {
  return <SkeletonReveal />
}`,
  },
  {
    name: "Error Shake",
    href: "/components/errorstateshake",
    registry: "error-state-shake",
    description:
      "An input validation error animation with multi-segment keyframe shake.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/error-state-shake.tsx`,
    interaction:
      "Submit an invalid input string to trigger the keyframe shake and error toast message.",
    usage: `import ErrorStateShake from "@/components/ui/error-state-shake"

export function Demo() {
  return <ErrorStateShake />
}`,
  },
  {
    name: "Spin Counter",
    href: "/components/spinningcounter",
    registry: "spinning-counter",
    description:
      "A mechanical reel counter with vertical digit column rolling.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/spinning-counter.tsx`,
    interaction:
      "Click the increment, decrement, or random buttons to roll the numeric columns.",
    usage: `import SpinningCounter from "@/components/ui/spinning-counter"

export function Demo() {
  return <SpinningCounter />
}`,
  },
  {
    name: "Spring toggle",
    href: "/components/springtoggle",
    registry: "spring-toggle",
    description:
      "A switch toggle button with spring overshoot keyframe physics.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/spring-toggle.tsx`,
    interaction:
      "Click the switch to trigger the spring thumb bounce animation.",
    usage: `import SpringToggle from "@/components/ui/spring-toggle"

export function Demo() {
  return <SpringToggle />
}`,
  },
  {
    name: "Success Check",
    href: "/components/successcheck",
    registry: "success-check",
    description:
      "A success checkmark icon with rotation, scale, blur, and stroke drawing animation.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/success-check.tsx`,
    interaction:
      "Click replay to trigger the checkmark entrance animation.",
    usage: `import SuccessCheck from "@/components/ui/success-check"

export function Demo() {
  return <SuccessCheck />
}`,
  },
  {
    name: "Notification Badge",
    href: "/components/notificationbadge",
    registry: "notification-badge",
    description:
      "An animated notification count badge that pops and slides into trigger position.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/notification-badge.tsx`,
    interaction:
      "Click the bell button to toggle the pop and scale badge animation.",
    usage: `import NotificationBadge from "@/components/ui/notification-badge"

export function Demo() {
  return <NotificationBadge />
}`,
  },
  {
    name: "Text states swap",
    href: "/components/textstatesswap",
    registry: "text-states-swap",
    description:
      "A text transition effect for action state labels.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/text-states-swap.tsx`,
    interaction:
      "Click the action button to sequence text label swaps.",
    usage: `import TextStatesSwap from "@/components/ui/text-states-swap"

export function Demo() {
  return <TextStatesSwap />
}`,
  },
  {
    name: "Identity Card",
    href: "/components/solanaidentitycard",
    registry: "solana-identity-card",
    description:
      "A Solana wallet identity card displaying domain name, cluster, balance, and one-click copy.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/solana-identity-card.tsx`,
    interaction:
      "Click the copy button to copy the wallet address or view on Solscan.",
    usage: `import { SolanaIdentityCard } from "@/components/ui/solana-identity-card"

export function Demo() {
  return <SolanaIdentityCard address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" domain="alex.sol" balanceSol={24.85} />
}`,
  },
  {
    name: "Token Card",
    href: "/components/solanatokencard",
    registry: "solana-token-card",
    description:
      "A token balance and portfolio card with hide/reveal toggle and SPL token metrics.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/solana-token-card.tsx`,
    interaction:
      "Click the eye icon to toggle portfolio balance visibility.",
    usage: `import { SolanaTokenCard } from "@/components/ui/solana-token-card"

export function Demo() {
  return <SolanaTokenCard portfolioName="Mainnet Vault" />
}`,
  },
  {
    name: "Transaction Status",
    href: "/components/solanatransactionstatus",
    registry: "solana-transaction-status",
    description:
      "A transaction activity status banner displaying signature, slot number, and state.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/solana-transaction-status.tsx`,
    interaction:
      "Click the signature link to open Solscan transaction details.",
    usage: `import { SolanaTransactionStatus } from "@/components/ui/solana-transaction-status"

export function Demo() {
  return <SolanaTransactionStatus status="finalized" amountSol={1.5} />
}`,
  },
  {
    name: "Network Health",
    href: "/components/solananetworkhealth",
    registry: "solana-network-health",
    description:
      "A Solana RPC cluster health monitor displaying ping latency, TPS throughput, and epoch progress.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/solana-network-health.tsx`,
    interaction:
      "Use the cluster dropdown to switch between mainnet-beta, devnet, and testnet.",
    usage: `import { SolanaNetworkHealth } from "@/components/ui/solana-network-health"

export function Demo() {
  return <SolanaNetworkHealth tps={2840} pingMs={18} />
}`,
  },
  {
    name: "NFT Card",
    href: "/components/solananftcard",
    registry: "solana-nft-card",
    description:
      "A Solana NFT asset showcase card featuring floor price, rarity rank, and trait attributes.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/solana-nft-card.tsx`,
    interaction:
      "Click the Attributes button to toggle trait percentage breakdowns.",
    usage: `import { SolanaNftCard } from "@/components/ui/solana-nft-card"

export function Demo() {
  return <SolanaNftCard name="Mad Lad #4821" floorPriceSol={142.5} />
}`,
  },
  {
    name: "Swap Card",
    href: "/components/solanaswapcard",
    registry: "solana-swap-card",
    description:
      "A Solana token swap interface with token selection, rate calculation, and flip animation.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/solana-swap-card.tsx`,
    interaction:
      "Click the flip button to swap pay and receive tokens or change input amounts.",
    usage: `import { SolanaSwapCard } from "@/components/ui/solana-swap-card"

export function Demo() {
  return <SolanaSwapCard defaultPayToken="SOL" defaultReceiveToken="USDC" />
}`,
  },
  {
    name: "Hero text transition",
    href: "/components/herotexttransition",
    registry: "hero-text-transition",
    description:
      "A spring-driven, staggered blur-and-rise entrance transition for hero headlines and subtitles.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/hero-text-transition.tsx`,
    interaction:
      "Headline, subtext, and call-to-action elements animate in sequence on component mount.",
    usage: `import { HeroTextTransition } from "@/components/ui/hero-text-transition"

export function Demo() {
  return (
    <HeroTextTransition
      headline="Craft Premium Solana Frontends in Minutes."
      sub="Oxygen UI is an open-source React component library built for Solana applications."
    />
  )
}`,
  },
  {
    name: "Blur shimmer text",
    href: "/components/blurshimmertext",
    registry: "blur-shimmer-text",
    description:
      "A character-staggered text reveal that loops through multiple phrases with a blur sweep effect.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/blur-shimmer-text.tsx`,
    interaction:
      "Phrases blur and reveal character-by-character on a timed looping interval.",
    usage: `import { BlurShimmerText } from "@/components/ui/blur-shimmer-text"

export function Demo() {
  return (
    <BlurShimmerText
      interval={2.5}
      blur={6}
      texts={[
        "Open-Source Solana UI Library",
        "Craft Premium Solana Frontends",
        "Composable Web3 React Primitives",
      ]}
    />
  )
}`,
  },
  {
    name: "Main Wallet",
    href: "/components/cryptowalletmain",
    registry: "crypto-wallet-main",
    description: "A mobile crypto wallet main balance screen with account switcher and SPL token balances.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-wallet-main.tsx`,
    interaction: "Tap top navigation pills or switch active Solana accounts.",
    usage: `import { CryptoWalletMain } from "@/components/ui/crypto-wallet-main"

export function Demo() {
  return <CryptoWalletMain />
}`,
  },
  {
    name: "Wallet Drawer",
    href: "/components/cryptowalletdrawer",
    registry: "crypto-wallet-drawer",
    description: "A dark slide-out wallet menu drawer displaying verified domain identity and network options.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-wallet-drawer.tsx`,
    interaction: "Click menu items to navigate wallet features or close the drawer.",
    usage: `import { CryptoWalletDrawer } from "@/components/ui/crypto-wallet-drawer"

export function Demo() {
  return <CryptoWalletDrawer />
}`,
  },
  {
    name: "Menu Sheet",
    href: "/components/cryptowalletmenusheet",
    registry: "crypto-wallet-menu-sheet",
    description: "A light navigation menu sheet featuring search bar and Web3 ecosystem links.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-wallet-menu-sheet.tsx`,
    interaction: "Click Connect Wallet or search Solana ecosystem resources.",
    usage: `import { CryptoWalletMenuSheet } from "@/components/ui/crypto-wallet-menu-sheet"

export function Demo() {
  return <CryptoWalletMenuSheet />
}`,
  },
  {
    name: "Wallet Settings",
    href: "/components/cryptowalletsettings",
    registry: "crypto-wallet-settings",
    description: "A dark wallet settings overlay with account management, RPC options, and developer settings.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-wallet-settings.tsx`,
    interaction: "Type in the search bar or tap settings rows to inspect configuration.",
    usage: `import { CryptoWalletSettings } from "@/components/ui/crypto-wallet-settings"

export function Demo() {
  return <CryptoWalletSettings />
}`,
  },
  {
    name: "Explore News",
    href: "/components/cryptoexplorenews",
    registry: "crypto-explore-news",
    description: "A market explore card featuring search input, watchlist assets, and ecosystem news feed.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-explore-news.tsx`,
    interaction: "Search news items or tap watchlist tokens to inspect market updates.",
    usage: `import { CryptoExploreNews } from "@/components/ui/crypto-explore-news"

export function Demo() {
  return <CryptoExploreNews />
}`,
  },
  {
    name: "Explore Categories",
    href: "/components/cryptoexplorecategories",
    registry: "crypto-explore-categories",
    description: "An explore categories hub with category pills, trending SPL tokens list, and oracle footnotes.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-explore-categories.tsx`,
    interaction: "Switch category pills to filter market rankings.",
    usage: `import { CryptoExploreCategories } from "@/components/ui/crypto-explore-categories"

export function Demo() {
  return <CryptoExploreCategories />
}`,
  },
  {
    name: "Crypto user profile card",
    href: "/components/cryptouserprofilecard",
    registry: "crypto-user-profile-card",
    description: "A user profile card displaying domain handle, trade volume metrics, and follower statistics.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-user-profile-card.tsx`,
    interaction: "Click Manage Profile or Share Profile buttons.",
    usage: `import { CryptoUserProfileCard } from "@/components/ui/crypto-user-profile-card"

export function Demo() {
  return <CryptoUserProfileCard />
}`,
  },
  {
    name: "Crypto cookie banner dialog",
    href: "/components/cryptocookiebannerdialog",
    registry: "crypto-cookie-banner-dialog",
    description: "A floating purple cookie policy consent dialog with customizable action pills.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-cookie-banner-dialog.tsx`,
    interaction: "Click Accept All or Reject Non-Essential buttons.",
    usage: `import { CryptoCookieBannerDialog } from "@/components/ui/crypto-cookie-banner-dialog"

export function Demo() {
  return <CryptoCookieBannerDialog />
}`,
  },
  {
    name: "Crypto cookie banner sheet",
    href: "/components/cryptocookiebannersheet",
    registry: "crypto-cookie-banner-sheet",
    description: "A privacy consent banner featuring header PDF link and cookie permission buttons.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-cookie-banner-sheet.tsx`,
    interaction: "Click Allow Cookies or Decline Optional to set consent preferences.",
    usage: `import { CryptoCookieBannerSheet } from "@/components/ui/crypto-cookie-banner-sheet"

export function Demo() {
  return <CryptoCookieBannerSheet />
}`,
  },
  {
    name: "Swap Box",
    href: "/components/cryptoswapbox",
    registry: "crypto-swap-box",
    description: "A token swap card with pay and receive input fields and instant token swap flip.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-swap-box.tsx`,
    interaction: "Click the arrow button to swap pay and receive tokens.",
    usage: `import { CryptoSwapBox } from "@/components/ui/crypto-swap-box"

export function Demo() {
  return <CryptoSwapBox />
}`,
  },
  {
    name: "Candidate Card",
    href: "/components/cryptopredictioncandidatecard",
    registry: "crypto-prediction-candidate-card",
    description: "A prediction market event card with YES and NO pool odds breakdown and total volume.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-prediction-candidate-card.tsx`,
    interaction: "Review market odds percentages and total pool liquidity.",
    usage: `import { CryptoPredictionCandidateCard } from "@/components/ui/crypto-prediction-candidate-card"

export function Demo() {
  return <CryptoPredictionCandidateCard />
}`,
  },
  {
    name: "Quick Grid",
    href: "/components/cryptopredictionquickgrid",
    registry: "crypto-prediction-quick-grid",
    description: "A 5-minute quick prediction markets grid featuring countdown timers and higher or lower tiles.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-prediction-quick-grid.tsx`,
    interaction: "Tap HIGHER or LOWER buttons on 5-minute market tiles.",
    usage: `import { CryptoPredictionQuickGrid } from "@/components/ui/crypto-prediction-quick-grid"

export function Demo() {
  return <CryptoPredictionQuickGrid />
}`,
  },
  {
    name: "Tab Selector",
    href: "/components/cryptopredictiontabselector",
    registry: "crypto-prediction-tab-selector",
    description: "A horizontal category pill selector for prediction market categories.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-prediction-tab-selector.tsx`,
    interaction: "Click category pills to filter prediction market views.",
    usage: `import { CryptoPredictionTabSelector } from "@/components/ui/crypto-prediction-tab-selector"

export function Demo() {
  return <CryptoPredictionTabSelector />
}`,
  },
  {
    name: "Search Bar",
    href: "/components/cryptopredictionsearchbar",
    registry: "crypto-prediction-search-bar",
    description: "A search header bar with filter controls for prediction markets.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-prediction-search-bar.tsx`,
    interaction: "Type in the input to filter active prediction markets.",
    usage: `import { CryptoPredictionSearchBar } from "@/components/ui/crypto-prediction-search-bar"

export function Demo() {
  return <CryptoPredictionSearchBar />
}`,
  },
  {
    name: "Odds Row",
    href: "/components/cryptopredictionoddsrow",
    registry: "crypto-prediction-odds-row",
    description: "A market candidate odds row with progress bar indicator and vote button.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-prediction-odds-row.tsx`,
    interaction: "Click the Vote button to place a vote.",
    usage: `import { CryptoPredictionOddsRow } from "@/components/ui/crypto-prediction-odds-row"

export function Demo() {
  return <CryptoPredictionOddsRow />
}`,
  },
  {
    name: "Crypto project progress bar",
    href: "/components/cryptoprojectprogressbar",
    registry: "crypto-project-progress-bar",
    description: "A project milestone progress card with dual segmented progress meters and epoch momentum.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-project-progress-bar.tsx`,
    interaction: "Inspect staked SOL targets and milestone completion rates.",
    usage: `import { CryptoProjectProgressBar } from "@/components/ui/crypto-project-progress-bar"

export function Demo() {
  return <CryptoProjectProgressBar />
}`,
  },
  {
    name: "Options Card",
    href: "/components/cryptoupdownoptionscard",
    registry: "crypto-up-down-options-card",
    description: "A live binary options market card with glowing SVG sparkline and target price threshold.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-up-down-options-card.tsx`,
    interaction: "Click SOL Higher or SOL Lower buttons before the countdown expires.",
    usage: `import { CryptoUpDownOptionsCard } from "@/components/ui/crypto-up-down-options-card"

export function Demo() {
  return <CryptoUpDownOptionsCard />
}`,
  },
  {
    name: "Target Line",
    href: "/components/cryptoupdowntargetline",
    registry: "crypto-up-down-target-line",
    description: "A binary options chart component highlighting target threshold level and payout multiplier.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-up-down-target-line.tsx`,
    interaction: "View current price level relative to target threshold.",
    usage: `import { CryptoUpDownTargetLine } from "@/components/ui/crypto-up-down-target-line"

export function Demo() {
  return <CryptoUpDownTargetLine />
}`,
  },
  {
    name: "Upcoming Carousel",
    href: "/components/cryptoupdownupcomingcarousel",
    registry: "crypto-up-down-upcoming-carousel",
    description: "An upcoming binary options rounds carousel displaying round IDs and start times.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-up-down-upcoming-carousel.tsx`,
    interaction: "Scroll horizontally to inspect upcoming option rounds.",
    usage: `import { CryptoUpDownUpcomingCarousel } from "@/components/ui/crypto-up-down-upcoming-carousel"

export function Demo() {
  return <CryptoUpDownUpcomingCarousel />
}`,
  },
  {
    name: "Crypto progress ring green",
    href: "/components/cryptoprogressringgreen",
    registry: "crypto-progress-ring-green",
    description: "A glowing green circular SVG progress ring card displaying percentage metrics.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-progress-ring-green.tsx`,
    interaction: "Animated SVG progress ring completes on mount.",
    usage: `import { CryptoProgressRingGreen } from "@/components/ui/crypto-progress-ring-green"

export function Demo() {
  return <CryptoProgressRingGreen />
}`,
  },
  {
    name: "Crypto progress ring red",
    href: "/components/cryptoprogressringred",
    registry: "crypto-progress-ring-red",
    description: "A glowing red circular SVG progress ring card displaying warning alert status.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-progress-ring-red.tsx`,
    interaction: "Displays critical liquidity warning state.",
    usage: `import { CryptoProgressRingRed } from "@/components/ui/crypto-progress-ring-red"

export function Demo() {
  return <CryptoProgressRingRed />
}`,
  },
  {
    name: "Speed Dial",
    href: "/components/cryptospeeddialactionmenu",
    registry: "crypto-speed-dial-action-menu",
    description: "A radial speed dial quick action menu unfolding action buttons.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-speed-dial-action-menu.tsx`,
    interaction: "Click the plus button to unfold radial quick action icons.",
    usage: `import { CryptoSpeedDialActionMenu } from "@/components/ui/crypto-speed-dial-action-menu"

export function Demo() {
  return <CryptoSpeedDialActionMenu />
}`,
  },
  {
    name: "Candlestick Chart",
    href: "/components/cryptosalescandlestickchart",
    registry: "crypto-sales-candlestick-chart",
    description: "A sales analytics card featuring candlestick sparkline bars with green glow.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-sales-candlestick-chart.tsx`,
    interaction: "Candlestick bars animate entrance on load.",
    usage: `import { CryptoSalesCandlestickChart } from "@/components/ui/crypto-sales-candlestick-chart"

export function Demo() {
  return <CryptoSalesCandlestickChart />
}`,
  },
  {
    name: "Segmented Bars",
    href: "/components/cryptosalessegmentedbars",
    registry: "crypto-sales-segmented-bars",
    description: "A sales analytics card featuring segmented horizontal status level bars.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-sales-segmented-bars.tsx`,
    interaction: "Segmented bars render multi-tier status levels.",
    usage: `import { CryptoSalesSegmentedBars } from "@/components/ui/crypto-sales-segmented-bars"

export function Demo() {
  return <CryptoSalesSegmentedBars />
}`,
  },
  {
    name: "Vertical Graph",
    href: "/components/cryptosalesverticalgraph",
    registry: "crypto-sales-vertical-graph",
    description: "A sales analytics card featuring vertical bar graph with top glow tips.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-sales-vertical-graph.tsx`,
    interaction: "Vertical bars rise with staggered animation.",
    usage: `import { CryptoSalesVerticalGraph } from "@/components/ui/crypto-sales-vertical-graph"

export function Demo() {
  return <CryptoSalesVerticalGraph />
}`,
  },
  {
    name: "TVL Chart",
    href: "/components/cryptotvlanalyticschart",
    registry: "crypto-tvl-analytics-chart",
    description: "A tactical TVL analytics card featuring crosshair line chart tooltip and timeframe tabs.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-tvl-analytics-chart.tsx`,
    interaction: "Hover over line chart points to inspect TVL data.",
    usage: `import { CryptoTvlAnalyticsChart } from "@/components/ui/crypto-tvl-analytics-chart"

export function Demo() {
  return <CryptoTvlAnalyticsChart />
}`,
  },
  {
    name: "Sparkbar Widget",
    href: "/components/cryptotvlsparkbarwidget",
    registry: "crypto-tvl-sparkbar-widget",
    description: "A mini transactions sparkbar widget with soundwave bar graph.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-tvl-sparkbar-widget.tsx`,
    interaction: "Displays transaction volume growth and soundwave bars.",
    usage: `import { CryptoTvlSparkbarWidget } from "@/components/ui/crypto-tvl-sparkbar-widget"

export function Demo() {
  return <CryptoTvlSparkbarWidget />
}`,
  },
  {
    name: "Crypto trader leaderboard card",
    href: "/components/cryptotraderleaderboardcard",
    registry: "crypto-trader-leaderboard-card",
    description: "A trader leaderboard and trending dApp directory featuring rank badges and follow toggles.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-trader-leaderboard-card.tsx`,
    interaction: "Click Follow buttons to toggle trader follow state.",
    usage: `import { CryptoTraderLeaderboardCard } from "@/components/ui/crypto-trader-leaderboard-card"

export function Demo() {
  return <CryptoTraderLeaderboardCard />
}`,
  },
  {
    name: "Crypto trading terminal workspace",
    href: "/components/cryptotradingterminalworkspace",
    registry: "crypto-trading-terminal-workspace",
    description: "A dark trading terminal workspace with swap module, balance chart, and multi-wallet asset cards.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-trading-terminal-workspace.tsx`,
    interaction: "Switch timeframe tabs or test token swap inputs.",
    usage: `import { CryptoTradingTerminalWorkspace } from "@/components/ui/crypto-trading-terminal-workspace"

export function Demo() {
  return <CryptoTradingTerminalWorkspace />
}`,
  },
  {
    name: "Token Details",
    href: "/components/cryptotokendetailsscreen",
    registry: "crypto-token-details-screen",
    description: "A token detail view displaying live price line chart, position holdings, and live chat status.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-token-details-screen.tsx`,
    interaction: "Switch timeframe pills or click heart button to favorite.",
    usage: `import { CryptoTokenDetailsScreen } from "@/components/ui/crypto-token-details-screen"

export function Demo() {
  return <CryptoTokenDetailsScreen />
}`,
  },
  {
    name: "Download Header",
    href: "/components/cryptodownloadheader",
    registry: "crypto-download-header",
    description: "A floating header banner with dApp branding, download call to action, and menu controls.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-download-header.tsx`,
    interaction: "Click the download button or open the mobile navigation menu.",
    usage: `import { CryptoDownloadHeader } from "@/components/ui/crypto-download-header"

export function Demo() {
  return <CryptoDownloadHeader />
}`,
  },
  {
    name: "Browser Bar",
    href: "/components/cryptomobilebrowserbar",
    registry: "crypto-mobile-browser-bar",
    description: "A Web3 mobile browser control bar with tab counter, URL status, and navigation actions.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-mobile-browser-bar.tsx`,
    interaction: "Click the tab counter to inspect open tabs, or use the back and menu actions.",
    usage: `import { CryptoMobileBrowserBar } from "@/components/ui/crypto-mobile-browser-bar"

export function Demo() {
  return <CryptoMobileBrowserBar />
}`,
  },
];


export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const PM_EXECUTORS: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};

export const PACKAGE_MANAGERS = Object.keys(PM_EXECUTORS) as PackageManager[];

export function installCommand(
  item: ComponentItem,
  pm: PackageManager = "npm",
): string | null {
  if (!item.registry) return null;
  // @latest matters: npx otherwise picks a stale local shadcn, and github registries need 4.16+
  return `${PM_EXECUTORS[pm]} shadcn@latest add ${REGISTRY_REPO}/${item.registry}`;
}

export function activeComponent(pathname: string): ComponentItem | undefined {
  return components.find((c) => c.href === pathname);
}

export function swatchProp(item?: ComponentItem): ComponentProp | undefined {
  return item?.props?.find((p) => p.control === "swatch" && p.optionColors);
}

export function cleanDefault(prop?: ComponentProp): string | undefined {
  return prop?.default?.replace(/^["']|["']$/g, "");
}
