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
  category?: string;
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
    name: "Identity Card",
    href: "/components/solanaidentitycard",
    category: "Solana & Web3 Primitives",
    registry: "solana-identity-card",
    description:
      "A Solana wallet identity card displaying domain name, cluster, balance, and one-click copy.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/solana-identity-card.tsx`,
    interaction:
      "Click the copy button to copy the wallet address or view on Solscan.",
    usage: `import { SolanaIdentityCard } from "@/components/ui/solana-identity-card"

export default function Demo() {
  return (
    <SolanaIdentityCard
      address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
      handle="@oxygenui"
      domain="oxygen.sol"
    />
  )
}`,
  },
  {
    name: "Wallet Card",
    href: "/components/solanawalletcard",
    category: "Solana & Web3 Primitives",
    registry: "solana-wallet-card",
    description:
      "A light glassmorphic wallet card featuring overlapping token avatars, PnL percentage badge, and Swap/Send action buttons.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/solana-wallet-card.tsx`,
    interaction:
      "Click copy to copy wallet address, or trigger Swap and Send action pills.",
    usage: `import { SolanaWalletCard } from "@/components/ui/solana-wallet-card"

export default function Demo() {
  return (
    <SolanaWalletCard
      walletLabel="Main wallet"
      address="0x3ddedt...ac563"
      balanceFiat="$37,521"
      pnlPercent="+17.56%"
    />
  )
}`,
  },
{
    name: "Network Health",
    href: "/components/solananetworkhealth",
    category: "Solana & Web3 Primitives",
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
    name: "Swap Card",
    href: "/components/solanaswapcard",
    category: "Solana & Web3 Primitives",
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
    name: "Token Card",
    href: "/components/solanatokencard",
    category: "Solana & Web3 Primitives",
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
    name: "NFT Card",
    href: "/components/solananftcard",
    category: "Solana & Web3 Primitives",
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
    name: "Transaction Status",
    href: "/components/solanatransactionstatus",
    category: "Solana & Web3 Primitives",
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
    name: "Main Wallet",
    href: "/components/cryptowalletmain",
    category: "Solana & Web3 Primitives",
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
    name: "Wallet Dashboard",
    href: "/components/cryptowalletdashboard",
    category: "Solana & Web3 Primitives",
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
    name: "Wallet Drawer",
    href: "/components/cryptowalletdrawer",
    category: "Solana & Web3 Primitives",
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
    category: "Solana & Web3 Primitives",
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
    category: "Solana & Web3 Primitives",
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
    name: "User Profile",
    href: "/components/cryptouserprofile",
    category: "Solana & Web3 Primitives",
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
    name: "Trading Terminal",
    href: "/components/cryptotradingterminal",
    category: "Solana & Web3 Primitives",
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
    name: "Token Details",
    href: "/components/cryptotokendetailsscreen",
    category: "Solana & Web3 Primitives",
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
    name: "Swap Box",
    href: "/components/cryptoswapbox",
    category: "Solana & Web3 Primitives",
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
    name: "Browser Bar",
    href: "/components/cryptomobilebrowserbar",
    category: "Solana & Web3 Primitives",
    registry: "crypto-mobile-browser-bar",
    description: "A Web3 mobile browser control bar with tab counter, URL status, and navigation actions.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-mobile-browser-bar.tsx`,
    interaction: "Click the tab counter to inspect open tabs, or use the back and menu actions.",
    usage: `import { CryptoMobileBrowserBar } from "@/components/ui/crypto-mobile-browser-bar"

export function Demo() {
  return <CryptoMobileBrowserBar />
}`,
  },
{
    name: "Prediction Markets",
    href: "/components/cryptopredictionmarkets",
    category: "Markets & Trading Hubs",
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
    name: "Candidate Card",
    href: "/components/cryptopredictioncandidatecard",
    category: "Markets & Trading Hubs",
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
    name: "Odds Row",
    href: "/components/cryptopredictionoddsrow",
    category: "Markets & Trading Hubs",
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
    name: "Quick Grid",
    href: "/components/cryptopredictionquickgrid",
    category: "Markets & Trading Hubs",
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
    name: "Search Bar",
    href: "/components/cryptopredictionsearchbar",
    category: "Markets & Trading Hubs",
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
    name: "Tab Selector",
    href: "/components/cryptopredictiontabselector",
    category: "Markets & Trading Hubs",
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
    name: "Leaderboard",
    href: "/components/cryptotraderleaderboard",
    category: "Markets & Trading Hubs",
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
    name: "Explore Hub",
    href: "/components/cryptoexplorehub",
    category: "Markets & Trading Hubs",
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
    name: "Explore Categories",
    href: "/components/cryptoexplorecategories",
    category: "Markets & Trading Hubs",
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
    name: "Explore News",
    href: "/components/cryptoexplorenews",
    category: "Markets & Trading Hubs",
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
    name: "Checkout Card",
    href: "/components/cryptocheckoutcard",
    category: "Markets & Trading Hubs",
    description: "A crypto checkout card with token selection, live conversion rates, and transaction state.",
    registry: "crypto-checkout-card",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/crypto-checkout-card.tsx`,
    interaction: "Select a token from the dropdown and click Pay to process the transaction.",
    usage: `import { CryptoCheckoutCard } from "@/components/ui/crypto-checkout-card"\n\nexport function Demo() {\n  return <CryptoCheckoutCard />\n}`,
  },
{
    name: "Subscription Card",
    href: "/components/cryptosubscriptioncard",
    category: "Markets & Trading Hubs",
    description: "Crypto Subscription Card component for Oxygen UI.",
    registry: "crypto-subscription-card",
    source: `${REGISTRY_HOMEPAGE}/components/ui/crypto-subscription-card.tsx`,
  },
{
    name: "Download Header",
    href: "/components/cryptodownloadheader",
    category: "Markets & Trading Hubs",
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
    name: "Cookie Banner",
    href: "/components/cryptocookiebanner",
    category: "Markets & Trading Hubs",
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
    name: "TVL Analytics",
    href: "/components/cryptotvlanalytics",
    category: "Analytics & Data Charts",
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
    name: "TVL Chart",
    href: "/components/cryptotvlanalyticschart",
    category: "Analytics & Data Charts",
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
    category: "Analytics & Data Charts",
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
    name: "Candlestick Chart",
    href: "/components/cryptosalescandlestickchart",
    category: "Analytics & Data Charts",
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
    name: "Sales Chart",
    href: "/components/cryptosaleschart",
    category: "Analytics & Data Charts",
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
    name: "Segmented Bars",
    href: "/components/cryptosalessegmentedbars",
    category: "Analytics & Data Charts",
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
    category: "Analytics & Data Charts",
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
    name: "Up Down Chart",
    href: "/components/cryptoupdownchart",
    category: "Analytics & Data Charts",
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
    name: "Options Card",
    href: "/components/cryptoupdownoptionscard",
    category: "Analytics & Data Charts",
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
    category: "Analytics & Data Charts",
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
    category: "Analytics & Data Charts",
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
    name: "Heatmap Chart",
    href: "/components/heatmapchart",
    category: "Analytics & Data Charts",
    description: "Heatmap Chart component for Oxygen UI.",
    registry: "heatmap-chart",
    source: `${REGISTRY_HOMEPAGE}/components/ui/heatmap-chart.tsx`,
  },
{
    name: "Metrics Grid",
    href: "/components/financialmetricsgrid",
    category: "Analytics & Data Charts",
    description: "Financial Metrics Grid component for Oxygen UI.",
    registry: "financial-metrics-grid",
    source: `${REGISTRY_HOMEPAGE}/components/ui/financial-metrics-grid.tsx`,
  },
{
    name: "Gooey Button",
    href: "/components/buttongooy",
    category: "Buttons & Action Controls",
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
    name: "Ripple Button",
    href: "/components/buttonrippleeffect",
    category: "Buttons & Action Controls",
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
    name: "Confetti Button",
    href: "/components/confettibutton",
    category: "Buttons & Action Controls",
    description: "Confetti Button component for Oxygen UI.",
    registry: "confetti-button",
    source: `${REGISTRY_HOMEPAGE}/components/ui/confetti-button.tsx`,
  },
{
    name: "Cooldown Button",
    href: "/components/cooldownbutton",
    category: "Buttons & Action Controls",
    description: "Cooldown Button component for Oxygen UI.",
    registry: "cooldown-button",
    source: `${REGISTRY_HOMEPAGE}/components/ui/cooldown-button.tsx`,
  },
{
    name: "Evil Buttons Showcase",
    href: "/components/evilbuttonsgroup",
    category: "Buttons & Action Controls",
    registry: "evil-buttons-group",
    description: "A collection of interactive button micro-interactions built with spring physics.",
    source: `${REGISTRY_HOMEPAGE}/blob/main/components/ui/evil-buttons-group.tsx`,
    interaction: "Click, hold, or hover over buttons to trigger spring micro-interactions.",
    usage: `import { EvilButtonsGroup } from "@/components/ui/evil-buttons-group"\n\nexport function Demo() {\n  return <EvilButtonsGroup />\n}`,
  },
{
    name: "Action Button",
    href: "/components/floatingactionbutton",
    category: "Buttons & Action Controls",
    description: "Floating Action Button component for Oxygen UI.",
    registry: "floating-action-button",
    source: `${REGISTRY_HOMEPAGE}/components/ui/floating-action-button.tsx`,
  },
{
    name: "Hold Button",
    href: "/components/holdtoconfirm",
    category: "Buttons & Action Controls",
    description: "Hold To Confirm component for Oxygen UI.",
    registry: "hold-to-confirm",
    source: `${REGISTRY_HOMEPAGE}/components/ui/hold-to-confirm.tsx`,
  },
{
    name: "Copy Button",
    href: "/components/copybutton",
    category: "Buttons & Action Controls",
    description: "Copy Button component for Oxygen UI.",
    registry: "copy-button",
    source: `${REGISTRY_HOMEPAGE}/components/ui/copy-button.tsx`,
  },
{
    name: "Click To Copy",
    href: "/components/clicktocopy",
    category: "Buttons & Action Controls",
    description: "Click To Copy component for Oxygen UI.",
    registry: "click-to-copy",
    source: `${REGISTRY_HOMEPAGE}/components/ui/click-to-copy.tsx`,
  },
{
    name: "Speed Dial",
    href: "/components/cryptospeeddialactionmenu",
    category: "Buttons & Action Controls",
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
    name: "Animated Tabs",
    href: "/components/animatedtabs",
    category: "Navigation & Menus",
    description: "Animated Tabs component for Oxygen UI.",
    registry: "animated-tabs",
    source: `${REGISTRY_HOMEPAGE}/components/ui/animated-tabs.tsx`,
  },
{
    name: "Curved Bar",
    href: "/components/curvedtabbar",
    category: "Navigation & Menus",
    description: "Curved Tab Bar component for Oxygen UI.",
    registry: "curved-tab-bar",
    source: `${REGISTRY_HOMEPAGE}/components/ui/curved-tab-bar.tsx`,
  },
{
    name: "Smooth Tabs",
    href: "/components/smoothtabs",
    category: "Navigation & Menus",
    description: "Smooth Tabs component for Oxygen UI.",
    registry: "smooth-tabs",
    source: `${REGISTRY_HOMEPAGE}/components/ui/smooth-tabs.tsx`,
  },
{
    name: "Command Palette",
    href: "/components/commandpalette",
    category: "Navigation & Menus",
    description: "Command Palette component for Oxygen UI.",
    registry: "command-palette",
    source: `${REGISTRY_HOMEPAGE}/components/ui/command-palette.tsx`,
  },
{
    name: "Gooey Menu",
    href: "/components/gooeymenu",
    category: "Navigation & Menus",
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
    name: "Exploding Menu",
    href: "/components/explodingmenu",
    category: "Navigation & Menus",
    description: "Exploding Menu component for Oxygen UI.",
    registry: "exploding-menu",
    source: `${REGISTRY_HOMEPAGE}/components/ui/exploding-menu.tsx`,
  },
{
    name: "Followers Popover",
    href: "/components/popoverslideselector",
    category: "Navigation & Menus",
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
    name: "Action Sheet",
    href: "/components/underlayactionsheet",
    category: "Navigation & Menus",
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
    name: "Family Drawer",
    href: "/components/familydrawer",
    category: "Navigation & Menus",
    description: "Family Drawer component for Oxygen UI.",
    registry: "family-drawer",
    source: `${REGISTRY_HOMEPAGE}/components/ui/family-drawer.tsx`,
  },
{
    name: "Family Dialog",
    href: "/components/familydialog",
    category: "Navigation & Menus",
    description: "Family Dialog component for Oxygen UI.",
    registry: "family-dialog",
    source: `${REGISTRY_HOMEPAGE}/components/ui/family-dialog.tsx`,
  },
{
    name: "Family Popover",
    href: "/components/familypopovermenu",
    category: "Navigation & Menus",
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
    name: "OTP Input",
    href: "/components/otpinput",
    category: "Inputs & Form Controls",
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
    name: "Password Input",
    href: "/components/passwordinput",
    category: "Inputs & Form Controls",
    description: "Password Input component for Oxygen UI.",
    registry: "password-input",
    source: `${REGISTRY_HOMEPAGE}/components/ui/password-input.tsx`,
  },
{
    name: "Spotlight Input",
    href: "/components/inputborderspotlight",
    category: "Inputs & Form Controls",
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
    name: "Morph Input",
    href: "/components/inputmorphmessage",
    category: "Inputs & Form Controls",
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
    name: "Liquid Radio",
    href: "/components/liquidradio",
    category: "Inputs & Form Controls",
    description: "Liquid Radio component for Oxygen UI.",
    registry: "liquid-radio",
    source: `${REGISTRY_HOMEPAGE}/components/ui/liquid-radio.tsx`,
  },
{
    name: "Animated Switch",
    href: "/components/animatedswitch",
    category: "Inputs & Form Controls",
    description: "Animated Switch component for Oxygen UI.",
    registry: "animated-switch",
    source: `${REGISTRY_HOMEPAGE}/components/ui/animated-switch.tsx`,
  },
{
    name: "Toggle Pill",
    href: "/components/togglepill",
    category: "Inputs & Form Controls",
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
    name: "Event Pills",
    href: "/components/eventtagpills",
    category: "Inputs & Form Controls",
    description: "Event Tag Pills component for Oxygen UI.",
    registry: "event-tag-pills",
    source: `${REGISTRY_HOMEPAGE}/components/ui/event-tag-pills.tsx`,
  },
{
    name: "Progress Ring",
    href: "/components/cryptoprogressring",
    category: "Progress & Feedback",
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
    name: "Project Progress",
    href: "/components/cryptoprojectprogress",
    category: "Progress & Feedback",
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
    name: "Progress Card",
    href: "/components/segmentedprogresscard",
    category: "Progress & Feedback",
    description: "Segmented Progress Card component for Oxygen UI.",
    registry: "segmented-progress-card",
    source: `${REGISTRY_HOMEPAGE}/components/ui/segmented-progress-card.tsx`,
  },
{
    name: "Gauge",
    href: "/components/gauge",
    category: "Progress & Feedback",
    description: "Gauge component for Oxygen UI.",
    registry: "gauge",
    source: `${REGISTRY_HOMEPAGE}/components/ui/gauge.tsx`,
  },
{
    name: "Spin Counter",
    href: "/components/spinningcounter",
    category: "Progress & Feedback",
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
    name: "Step Tracker",
    href: "/components/steptrackerwidget",
    category: "Progress & Feedback",
    description: "Step Tracker Widget component for Oxygen UI.",
    registry: "step-tracker-widget",
    source: `${REGISTRY_HOMEPAGE}/components/ui/step-tracker-widget.tsx`,
  },
{
    name: "Stats Stack",
    href: "/components/runstatsstacks",
    category: "Progress & Feedback",
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
    name: "Success Check",
    href: "/components/successcheck",
    category: "Progress & Feedback",
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
    name: "Error Shake",
    href: "/components/errorstateshake",
    category: "Progress & Feedback",
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
    name: "Status Badge",
    href: "/components/multistatebadge",
    category: "Progress & Feedback",
    description: "Multi State Badge component for Oxygen UI.",
    registry: "multi-state-badge",
    source: `${REGISTRY_HOMEPAGE}/components/ui/multi-state-badge.tsx`,
  },
{
    name: "Notification Badge",
    href: "/components/notificationbadge",
    category: "Progress & Feedback",
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
    name: "Notifications",
    href: "/components/notificationsstack",
    category: "Progress & Feedback",
    description: "Notifications Stack component for Oxygen UI.",
    registry: "notifications-stack",
    source: `${REGISTRY_HOMEPAGE}/components/ui/notifications-stack.tsx`,
  },
{
    name: "Skeleton Reveal",
    href: "/components/skeletonreveal",
    category: "Progress & Feedback",
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
    name: "Card Stack",
    href: "/components/cardstack",
    category: "Cards & Layout Primitives",
    description: "Card Stack component for Oxygen UI.",
    registry: "card-stack",
    source: `${REGISTRY_HOMEPAGE}/components/ui/card-stack.tsx`,
  },
{
    name: "Timeline",
    href: "/components/timeline",
    category: "Cards & Layout Primitives",
    description: "Timeline component for Oxygen UI.",
    registry: "timeline",
    source: `${REGISTRY_HOMEPAGE}/components/ui/timeline.tsx`,
  },
{
    name: "Marquee",
    href: "/components/marquee",
    category: "Cards & Layout Primitives",
    description: "Marquee component for Oxygen UI.",
    registry: "marquee",
    source: `${REGISTRY_HOMEPAGE}/components/ui/marquee.tsx`,
  },
{
    name: "Logo Carousel",
    href: "/components/logocarousel",
    category: "Cards & Layout Primitives",
    description: "Logo Carousel component for Oxygen UI.",
    registry: "logo-carousel",
    source: `${REGISTRY_HOMEPAGE}/components/ui/logo-carousel.tsx`,
  },
{
    name: "Glass Filter",
    href: "/components/glassfilter",
    category: "Cards & Layout Primitives",
    description: "Glass Filter component for Oxygen UI.",
    registry: "glass-filter",
    source: `${REGISTRY_HOMEPAGE}/components/ui/glass-filter.tsx`,
  },
{
    name: "QR Code",
    href: "/components/qrcode",
    category: "Cards & Layout Primitives",
    description: "Qr Code component for Oxygen UI.",
    registry: "qr-code",
    source: `${REGISTRY_HOMEPAGE}/components/ui/qr-code.tsx`,
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
