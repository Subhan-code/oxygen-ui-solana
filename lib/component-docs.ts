export interface ComponentPropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  category:
    | "Wallet & identity"
    | "Tokens & trading"
    | "Pools & finance"
    | "Status & motion"
    | "Controls"
    | "Layout & brand";
  code: string;
  props: ComponentPropDoc[];
}

export const COMPONENT_DOCS: ComponentDoc[] = [
  /* ---------------- Wallet & identity (8) ---------------- */
  {
    slug: "multiwalletswitcher",
    title: "Multi Wallet Switcher",
    description: "Compact multi-wallet connection modal with brand SVG icons and terms notice.",
    category: "Wallet & identity",
    code: `// Import
import { MultiWalletSwitcher } from "@/components/ui/multi-wallet-switcher";

// Usage
export default function Example() {
  return (
    <MultiWalletSwitcher
      title="Connect wallet"
      activeId="phantom"
      onSelectWallet={(wallet) => console.log("Selected:", wallet.name)}
    />
  );
}`,
    props: [
      { name: "title", type: "string", default: '"Connect wallet"', description: "Header title of the wallet connection card." },
      { name: "description", type: "string", default: '"Get started by connecting..."', description: "Instructional subtitle below heading." },
      { name: "activeId", type: "string", default: '"phantom"', description: "ID of currently active or selected wallet." },
      { name: "wallets", type: "WalletOption[]", default: "DEFAULT_WALLETS", description: "Array of wallet objects containing id, name, and SVG." },
      { name: "onSelectWallet", type: "(wallet: WalletOption) => void", default: "undefined", description: "Callback triggered when a wallet row is clicked." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "addressdisplay",
    title: "Address Display",
    description: "Trunkated Solana public key badge with explorer link and one-click copy feedback.",
    category: "Wallet & identity",
    code: `// Import
import { AddressDisplay } from "@/components/ui/address-display";

// Usage
export default function Example() {
  return (
    <AddressDisplay
      address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
      showCopy={true}
      showExplorer={true}
    />
  );
}`,
    props: [
      { name: "address", type: "string", default: '""', description: "Solana base58 wallet address or public key." },
      { name: "showCopy", type: "boolean", default: "true", description: "Whether to display the copy-to-clipboard button." },
      { name: "showExplorer", type: "boolean", default: "true", description: "Whether to render external link to Solana Explorer." },
      { name: "cluster", type: '"mainnet-beta" | "devnet" | "testnet"', default: '"mainnet-beta"', description: "Target Solana cluster for explorer URLs." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "qrcode",
    title: "Qr Code",
    description: "High-contrast QR code widget with center brand logo and scan prompt.",
    category: "Wallet & identity",
    code: `// Import
import { QRCode } from "@/components/ui/qr-code";

// Usage
export default function Example() {
  return (
    <QRCode
      value="solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
      size={200}
      title="Scan to Send"
    />
  );
}`,
    props: [
      { name: "value", type: "string", default: '""', description: "Payload string, deep link, or payment address." },
      { name: "size", type: "number", default: "180", description: "Width and height dimension in pixels." },
      { name: "title", type: "string", default: '"Scan with wallet"', description: "Card title displayed above the QR code." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "solanaidentitycard",
    title: "Solana Identity Card",
    description: "User identity card featuring avatar, SNS domain (.sol), balance, and verified badge.",
    category: "Wallet & identity",
    code: `// Import
import { SolanaIdentityCard } from "@/components/ui/solana-identity-card";

// Usage
export default function Example() {
  return (
    <SolanaIdentityCard
      name="Subhan"
      domain="subhan.sol"
      address="7xKX...gAsU"
      solBalance={42.85}
      verified={true}
    />
  );
}`,
    props: [
      { name: "name", type: "string", default: '"Anonymous"', description: "Display name or handle." },
      { name: "domain", type: "string", default: 'undefined', description: "Solana Name Service (.sol) domain." },
      { name: "address", type: "string", default: '""', description: "Truncated or full base58 public key." },
      { name: "solBalance", type: "number", default: "0", description: "Current SOL balance to show on card." },
      { name: "verified", type: "boolean", default: "false", description: "Whether to render verified identity checkmark." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "solanawalletcard",
    title: "Solana Wallet Card",
    description: "Debit-styled Web3 wallet card with balance, network tag, and address details.",
    category: "Wallet & identity",
    code: `// Import
import { SolanaWalletCard } from "@/components/ui/solana-wallet-card";

// Usage
export default function Example() {
  return (
    <SolanaWalletCard
      balance={1250.75}
      currency="USDC"
      address="7xKX...gAsU"
      network="Solana Mainnet"
    />
  );
}`,
    props: [
      { name: "balance", type: "number", default: "0", description: "Total fiat or token balance amount." },
      { name: "currency", type: "string", default: '"USD"', description: "Currency ticker symbol." },
      { name: "address", type: "string", default: '""', description: "Public wallet address shown on the card." },
      { name: "network", type: "string", default: '"Solana"', description: "Active blockchain network name." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "walletsheet",
    title: "Wallet Sheet",
    description: "Slide-over drawer for switching wallets, checking balances, and viewing seed info.",
    category: "Wallet & identity",
    code: `// Import
import { WalletSheet } from "@/components/ui/wallet-sheet";

// Usage
export default function Example() {
  return (
    <WalletSheet
      open={true}
      balance="42.50 SOL"
      address="7xKX...gAsU"
      onDisconnect={() => console.log("Disconnect")}
    />
  );
}`,
    props: [
      { name: "open", type: "boolean", default: "false", description: "Controls whether the wallet sheet is visible." },
      { name: "onOpenChange", type: "(open: boolean) => void", default: "undefined", description: "Triggered on backdrop click or close button." },
      { name: "balance", type: "string", default: '"0.00 SOL"', description: "Formatted wallet balance text." },
      { name: "address", type: "string", default: '""', description: "Public key displayed inside the sheet." },
      { name: "onDisconnect", type: "() => void", default: "undefined", description: "Callback triggered when user clicks disconnect." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "authcard",
    title: "Auth Card",
    description: "Apple-styled glass sign-in card with Google, X, Apple buttons and email magic link.",
    category: "Wallet & identity",
    code: `// Import
import { AuthCard } from "@/components/ui/auth-card";

// Usage
export default function Example() {
  return (
    <AuthCard
      title="Sign in"
      description="Continue with a provider or email"
      onSocial={(provider) => console.log("Provider:", provider)}
      onEmail={(email) => console.log("Email:", email)}
    />
  );
}`,
    props: [
      { name: "title", type: "string", default: '"Sign in"', description: "Card title heading text." },
      { name: "description", type: "string", default: '"Continue with a provider or email"', description: "Subtitle below the heading." },
      { name: "onSocial", type: '(provider: "google" | "x" | "apple") => void', default: "undefined", description: "Callback triggered when social button is pressed." },
      { name: "onEmail", type: "(email: string) => void", default: "undefined", description: "Callback triggered upon valid email form submission." },
      { name: "pending", type: "boolean", default: "false", description: "Disables inputs and displays loading state." },
      { name: "error", type: "string", default: "undefined", description: "Validation or server error message shown beneath email input." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "accountcard",
    title: "Account Card",
    description: "Account overview card with profile avatar, total net worth, and quick actions.",
    category: "Wallet & identity",
    code: `// Import
import { AccountCard } from "@/components/ui/account-card";

// Usage
export default function Example() {
  return (
    <AccountCard
      username="Subhan"
      handle="@subhancodes"
      netWorth="$14,250.00"
      address="7xKX...gAsU"
    />
  );
}`,
    props: [
      { name: "username", type: "string", default: '"User"', description: "Primary account display name." },
      { name: "handle", type: "string", default: '""', description: "Handle or username identifier." },
      { name: "netWorth", type: "string", default: '"$0.00"', description: "Formatted total portfolio value." },
      { name: "address", type: "string", default: '""', description: "Wallet public key associated with account." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  {
    slug: "cryptouserprofile",
    title: "Crypto User Profile",
    description: "Solana identity profile card with trade volume, follower statistics, and on-chain activity feed.",
    category: "Wallet & identity",
    code: `// Import
import { CryptoUserProfile } from "@/components/ui/crypto-user-profile";

// Usage
export default function Example() {
  return (
    <CryptoUserProfile
      username="alex.sol"
      tradeVolumeUsd={14250}
      followersCount={1240}
      followingCount={380}
      onManageProfile={() => console.log("manage")}
      onShareProfile={() => console.log("share")}
    />
  );
}`,
    props: [
      { name: "username", type: "string", default: '"alex.sol"', description: "Solana user domain or address handle." },
      { name: "tradeVolumeUsd", type: "number", default: "14250", description: "Cumulative lifetime trading volume in USD." },
      { name: "followersCount", type: "number", default: "1240", description: "Follower count on social graph." },
      { name: "followingCount", type: "number", default: "380", description: "Count of followed accounts." },
      { name: "onManageProfile", type: "() => void", default: "undefined", description: "Callback triggered when clicking Manage Profile." },
      { name: "onShareProfile", type: "() => void", default: "undefined", description: "Callback triggered when clicking Share Profile." },
      { name: "onClose", type: "() => void", default: "undefined", description: "Optional close button callback." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  /* ---------------- Tokens & trading (12) ---------------- */
  {
    slug: "cryptoswapbox",
    title: "Crypto Swap Box",
    description: "Turnkey token swap interface with input/output tokens, route quote, and invert button.",
    category: "Tokens & trading",
    code: `// Import
import { CryptoSwapBox } from "@/components/ui/crypto-swap-box";

// Usage
export default function Example() {
  return (
    <CryptoSwapBox
      fromToken="SOL"
      toToken="USDC"
      fromAmount="2.5"
      toAmount="375.00"
      onSwap={() => console.log("Execute swap")}
    />
  );
}`,
    props: [
      { name: "fromToken", type: "string", default: '"SOL"', description: "Ticker of input token." },
      { name: "toToken", type: "string", default: '"USDC"', description: "Ticker of output token." },
      { name: "fromAmount", type: "string", default: '"0"', description: "Input amount string value." },
      { name: "toAmount", type: "string", default: '"0"', description: "Estimated output amount value." },
      { name: "slippage", type: "number", default: "0.5", description: "Slippage tolerance percentage." },
      { name: "onSwap", type: "() => void", default: "undefined", description: "Action callback when swap button is pressed." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "solanatokencard",
    title: "Solana Token Card",
    description: "Token metrics card showing logo, 24h price change, market cap, and circulating volume.",
    category: "Tokens & trading",
    code: `// Import
import { SolanaTokenCard } from "@/components/ui/solana-token-card";

// Usage
export default function Example() {
  return (
    <SolanaTokenCard
      symbol="SOL"
      name="Solana"
      price="$148.50"
      change24h="+4.25%"
      volume="$1.8B"
    />
  );
}`,
    props: [
      { name: "symbol", type: "string", default: '"SOL"', description: "Token symbol or ticker." },
      { name: "name", type: "string", default: '"Solana"', description: "Full token name." },
      { name: "price", type: "string", default: '"$0.00"', description: "Current USD price." },
      { name: "change24h", type: "string", default: '"+0.00%"', description: "24-hour percentage change string." },
      { name: "volume", type: "string", default: 'undefined', description: "24-hour trading volume formatted text." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "solananftcard",
    title: "Solana Nft Card",
    description: "NFT asset card with media preview, collection name, rarity rank, and floor price.",
    category: "Tokens & trading",
    code: `// Import
import { SolanaNftCard } from "@/components/ui/solana-nft-card";

// Usage
export default function Example() {
  return (
    <SolanaNftCard
      name="Mad Lad #4290"
      collection="Mad Lads"
      floorPrice="182 SOL"
      image="/assets/nft-preview.png"
    />
  );
}`,
    props: [
      { name: "name", type: "string", default: '""', description: "Individual NFT item name or token ID." },
      { name: "collection", type: "string", default: '""', description: "Parent collection name." },
      { name: "floorPrice", type: "string", default: '"0 SOL"', description: "Current collection floor price." },
      { name: "image", type: "string", default: '""', description: "Image asset URI or CDN URL." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "tokeninput",
    title: "Token Input",
    description: "Numeric input with token selector dropdown, balance shortcut, and USD estimation.",
    category: "Tokens & trading",
    code: `// Import
import { TokenInput } from "@/components/ui/token-input";

// Usage
export default function Example() {
  return (
    <TokenInput
      value="10.5"
      token="SOL"
      balance="42.15"
      onChange={(val) => console.log("New amount:", val)}
    />
  );
}`,
    props: [
      { name: "value", type: "string", default: '""', description: "Controlled input value string." },
      { name: "token", type: "string", default: '"SOL"', description: "Currently chosen token symbol." },
      { name: "balance", type: "string", default: '"0"', description: "Available wallet balance for quick-fill." },
      { name: "onChange", type: "(val: string) => void", default: "undefined", description: "Fired when user types amount." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "tokenpair",
    title: "Token Pair",
    description: "Overlapping dual-token avatar icon lockup with pair label and pool fee badge.",
    category: "Tokens & trading",
    code: `// Import
import { TokenPair } from "@/components/ui/token-pair";

// Usage
export default function Example() {
  return (
    <TokenPair
      baseToken="SOL"
      quoteToken="USDC"
      feeTier="0.05%"
    />
  );
}`,
    props: [
      { name: "baseToken", type: "string", default: '"SOL"', description: "Base token ticker symbol." },
      { name: "quoteToken", type: "string", default: '"USDC"', description: "Quote token ticker symbol." },
      { name: "feeTier", type: "string", default: '"0.05%"', description: "Pool fee tier percentage badge." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "tokenlistitem",
    title: "Token List Item",
    description: "Compact token row showing icon, ticker, balance, and real-time USD value.",
    category: "Tokens & trading",
    code: `// Import
import { TokenListItem } from "@/components/ui/token-list-item";

// Usage
export default function Example() {
  return (
    <TokenListItem
      name="Solana"
      symbol="SOL"
      balance="14.8"
      usdValue="$2,197.80"
      change="+3.4%"
    />
  );
}`,
    props: [
      { name: "name", type: "string", default: '""', description: "Token name." },
      { name: "symbol", type: "string", default: '""', description: "Token ticker symbol." },
      { name: "balance", type: "string", default: '"0"', description: "Held amount." },
      { name: "usdValue", type: "string", default: '"$0.00"', description: "Equivalent fiat value." },
      { name: "change", type: "string", default: 'undefined', description: "24-hour price change percentage." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "tokenicongroup",
    title: "Token Icon Group",
    description: "Stacked circular token avatar avatars with configurable max count and overflow badge.",
    category: "Tokens & trading",
    code: `// Import
import { TokenIconGroup } from "@/components/ui/token-icon-group";

// Usage
export default function Example() {
  return (
    <TokenIconGroup
      tokens={["SOL", "USDC", "BONK", "JUP"]}
      maxVisible={3}
      size="md"
    />
  );
}`,
    props: [
      { name: "tokens", type: "string[]", default: "[]", description: "List of token symbol keys to render." },
      { name: "maxVisible", type: "number", default: "4", description: "Maximum icons rendered before +N overflow." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Icon size variant." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "tokencommand",
    title: "Token Command",
    description: "Command palette search modal for filtering and selecting SPL tokens by address or ticker.",
    category: "Tokens & trading",
    code: `// Import
import { TokenCommand } from "@/components/ui/token-command";

// Usage
export default function Example() {
  return (
    <TokenCommand
      placeholder="Search name or mint address..."
      onSelectToken={(token) => console.log("Picked:", token)}
    />
  );
}`,
    props: [
      { name: "placeholder", type: "string", default: '"Search tokens..."', description: "Input placeholder text." },
      { name: "onSelectToken", type: "(token: any) => void", default: "undefined", description: "Callback when a token row is selected." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "tradebox",
    title: "Trade Box",
    description: "Order entry box with Buy/Sell side toggle, limit/market tabs, and leverage preset.",
    category: "Tokens & trading",
    code: `// Import
import { TradeBox } from "@/components/ui/trade-box";

// Usage
export default function Example() {
  return (
    <TradeBox
      pair="SOL-PERP"
      side="buy"
      leverage={5}
      onSubmit={(order) => console.log("Order:", order)}
    />
  );
}`,
    props: [
      { name: "pair", type: "string", default: '"SOL/USD"', description: "Active market pair ticker." },
      { name: "side", type: '"buy" | "sell"', default: '"buy"', description: "Initial order direction." },
      { name: "leverage", type: "number", default: "1", description: "Current leverage multiplier." },
      { name: "onSubmit", type: "(order: any) => void", default: "undefined", description: "Callback on trade submission." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "tradebuttons",
    title: "Trade Buttons",
    description: "Dual Buy (green) and Sell (red) action buttons with tactile press micro-animations.",
    category: "Tokens & trading",
    code: `// Import
import { TradeButtons } from "@/components/ui/trade-buttons";

// Usage
export default function Example() {
  return (
    <TradeButtons
      onBuy={() => console.log("Buy Long")}
      onSell={() => console.log("Sell Short")}
      disabled={false}
    />
  );
}`,
    props: [
      { name: "onBuy", type: "() => void", default: "undefined", description: "Action callback for buy/long button." },
      { name: "onSell", type: "() => void", default: "undefined", description: "Action callback for sell/short button." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables user clicks on both buttons." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "tradetogglepill",
    title: "Trade Toggle Pill",
    description: "Segmented Buy/Sell pill toggle with smooth slider indicator and accessible keyboard navigation.",
    category: "Tokens & trading",
    code: `// Import
import { TradeTogglePill } from "@/components/ui/trade-toggle-pill";

// Usage
export default function Example() {
  return (
    <TradeTogglePill
      side="buy"
      onChange={(side) => console.log("Active side:", side)}
    />
  );
}`,
    props: [
      { name: "side", type: '"buy" | "sell"', default: '"buy"', description: "Selected trading side." },
      { name: "onChange", type: '(side: "buy" | "sell") => void', default: "undefined", description: "Triggered on side change." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "orderform",
    title: "Order Form",
    description: "Comprehensive order ticket with price input, size slider, estimated liquidation, and execute button.",
    category: "Tokens & trading",
    code: `// Import
import { OrderForm } from "@/components/ui/order-form";

// Usage
export default function Example() {
  return (
    <OrderForm
      market="SOL/USDC"
      currentPrice={148.5}
      onExecuteOrder={(data) => console.log("Placed:", data)}
    />
  );
}`,
    props: [
      { name: "market", type: "string", default: '"SOL/USDC"', description: "Market symbol string." },
      { name: "currentPrice", type: "number", default: "0", description: "Benchmark reference price." },
      { name: "onExecuteOrder", type: "(data: any) => void", default: "undefined", description: "Callback triggered upon order placement." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  {
    slug: "orderbook",
    title: "Order Book",
    description: "Live order book with smooth depth bar transitions, ask/bid levels, and mid-market spread metrics.",
    category: "Tokens & trading",
    code: `// Import
import { OrderBook } from "@/components/ui/order-book";

// Usage
export default function Example() {
  const bids = [
    { price: 182.46, size: 45.2 },
    { price: 182.45, size: 120.8 },
  ];
  const asks = [
    { price: 182.48, size: 32.1 },
    { price: 182.49, size: 88.5 },
  ];

  return <OrderBook bids={bids} asks={asks} />;
}`,
    props: [
      { name: "bids", type: "{ price: number; size: number }[]", default: "[]", description: "Array of current market bids sorted highest to lowest." },
      { name: "asks", type: "{ price: number; size: number }[]", default: "[]", description: "Array of current market asks sorted lowest to highest." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "priceticker",
    title: "Price Ticker",
    description: "Continuous infinite marquee ticker displaying Solana tokens, prices, and 24-hour percentage trends.",
    category: "Tokens & trading",
    code: `// Import
import { PriceTicker } from "@/components/ui/price-ticker";

// Usage
export default function Example() {
  return <PriceTicker speedSeconds={25} />;
}`,
    props: [
      { name: "tokens", type: "TickerItem[]", default: "DEFAULT_TICKERS", description: "Array of tokens with symbol, price, and 24h change." },
      { name: "speedSeconds", type: "number", default: "25", description: "Duration in seconds for one marquee loop." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  /* ---------------- Pools & finance (8) ---------------- */
  {
    slug: "poolcard",
    title: "Pool Card",
    description: "Liquidity pool overview card featuring pair avatars, fee rate, TVL, and APR stats.",
    category: "Pools & finance",
    code: `// Import
import { PoolCard } from "@/components/ui/pool-card";

// Usage
export default function Example() {
  return (
    <PoolCard
      poolName="SOL-USDC"
      feeRate="0.05%"
      tvl="$42.5M"
      apr="28.4%"
    />
  );
}`,
    props: [
      { name: "poolName", type: "string", default: '"SOL-USDC"', description: "Pair name of the liquidity pool." },
      { name: "feeRate", type: "string", default: '"0.05%"', description: "Pool swap fee tier." },
      { name: "tvl", type: "string", default: '"$0"', description: "Total Value Locked formatted string." },
      { name: "apr", type: "string", default: '"0%"', description: "Annualized percentage return rate." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "liquiditypoolcard",
    title: "Liquidity Pool Card",
    description: "Active LP position card displaying share of pool, unclaimed fees, and deposit breakdown.",
    category: "Pools & finance",
    code: `// Import
import { LiquidityPoolCard } from "@/components/ui/liquidity-pool-card";

// Usage
export default function Example() {
  return (
    <LiquidityPoolCard
      pair="SOL / USDC"
      poolShare="0.042%"
      unclaimedFees="$18.40"
      onClaim={() => console.log("Claim fees")}
    />
  );
}`,
    props: [
      { name: "pair", type: "string", default: '"SOL / USDC"', description: "Token pair designation." },
      { name: "poolShare", type: "string", default: '"0%"', description: "Percentage share of total liquidity." },
      { name: "unclaimedFees", type: "string", default: '"$0.00"', description: "Accumulated uncollected trading fees." },
      { name: "onClaim", type: "() => void", default: "undefined", description: "Callback for claiming earned rewards." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "positioncard",
    title: "Position Card",
    description: "Open perp position card with entry price, mark price, leverage, and real-time PnL badge.",
    category: "Pools & finance",
    code: `// Import
import { PositionCard } from "@/components/ui/position-card";

// Usage
export default function Example() {
  return (
    <PositionCard
      market="SOL-PERP"
      side="long"
      size="25 SOL"
      entryPrice="$142.00"
      markPrice="$148.50"
      pnl="+$162.50 (+4.58%)"
    />
  );
}`,
    props: [
      { name: "market", type: "string", default: '"SOL-PERP"', description: "Futures/perp contract identifier." },
      { name: "side", type: '"long" | "short"', default: '"long"', description: "Direction of open position." },
      { name: "size", type: "string", default: '"0"', description: "Position notional or token size." },
      { name: "entryPrice", type: "string", default: '"$0.00"', description: "Average entry fill price." },
      { name: "markPrice", type: "string", default: '"$0.00"', description: "Current mark price." },
      { name: "pnl", type: "string", default: '"$0.00"', description: "Unrealized profit and loss text." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "stakingcard",
    title: "Staking Card",
    description: "Validator staking card showing epoch progress, APY rate, staked amount, and rewards.",
    category: "Pools & finance",
    code: `// Import
import { StakingCard } from "@/components/ui/staking-card";

// Usage
export default function Example() {
  return (
    <StakingCard
      validatorName="Oxygen Stake Pool"
      stakedAmount="50.0 SOL"
      apy="7.4%"
      epochProgress={68}
      onStake={() => console.log("Stake more")}
    />
  );
}`,
    props: [
      { name: "validatorName", type: "string", default: '"Solana Validator"', description: "Validator node name or pool title." },
      { name: "stakedAmount", type: "string", default: '"0.0 SOL"', description: "Current amount locked in stake." },
      { name: "apy", type: "string", default: '"7.2%"', description: "Estimated annual percentage yield." },
      { name: "epochProgress", type: "number", default: "50", description: "Current Solana epoch completion percentage (0-100)." },
      { name: "onStake", type: "() => void", default: "undefined", description: "Action callback for depositing stake." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "balancedisplay",
    title: "Balance Display",
    description: "Clean typography balance readout with secondary fiat conversion and reload indicator.",
    category: "Pools & finance",
    code: `// Import
import { BalanceDisplay } from "@/components/ui/balance-display";

// Usage
export default function Example() {
  return (
    <BalanceDisplay
      amount="42.85"
      currency="SOL"
      fiatValue="$6,363.22"
    />
  );
}`,
    props: [
      { name: "amount", type: "string | number", default: '"0"', description: "Token or currency balance number." },
      { name: "currency", type: "string", default: '"SOL"', description: "Currency symbol or ticker." },
      { name: "fiatValue", type: "string", default: 'undefined', description: "Optional converted fiat value subtitle." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "bankbalancecard",
    title: "Bank Balance Card",
    description: "Fiat off-ramp balance widget with connected IBAN details, currency tag, and transfer button.",
    category: "Pools & finance",
    code: `// Import
import { BankBalanceCard } from "@/components/ui/bank-balance-card";

// Usage
export default function Example() {
  return (
    <BankBalanceCard
      bankName="Mercury Treasury"
      balance="$124,500.00"
      accountNumber="•••• 4829"
      onTransfer={() => console.log("Transfer")}
    />
  );
}`,
    props: [
      { name: "bankName", type: "string", default: '"Bank Account"', description: "Financial institution name." },
      { name: "balance", type: "string", default: '"$0.00"', description: "Available cash balance." },
      { name: "accountNumber", type: "string", default: '"•••• 0000"', description: "Masked account number." },
      { name: "onTransfer", type: "() => void", default: "undefined", description: "Callback for transfer funds action." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "withdrawalcard",
    title: "Request Withdrawal Card",
    description: "Cash out modal card with destination picker, preset percentage pills, and gas fee breakdown.",
    category: "Pools & finance",
    code: `// Import
import { RequestWithdrawalCard } from "@/components/ui/request-withdrawal-card";

// Usage
export default function Example() {
  return (
    <RequestWithdrawalCard
      maxBalance="1500 USDC"
      estimatedFee="1.50 USDC"
      onConfirm={(amt) => console.log("Withdraw:", amt)}
    />
  );
}`,
    props: [
      { name: "maxBalance", type: "string", default: '"0"', description: "Max available withdrawal balance." },
      { name: "estimatedFee", type: "string", default: '"0"', description: "Estimated network fee." },
      { name: "onConfirm", type: "(amount: string) => void", default: "undefined", description: "Action callback on withdrawal confirmation." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "financialmetricsgrid",
    title: "Financial Metrics Grid",
    description: "Responsive 4-column metric dashboard strip with trend badges and micro-sparklines.",
    category: "Pools & finance",
    code: `// Import
import { FinancialMetricsGrid } from "@/components/ui/financial-metrics-grid";

// Usage
export default function Example() {
  return (
    <FinancialMetricsGrid
      metrics={[
        { label: "Total TVL", value: "$48.2M", change: "+12.4%" },
        { label: "24h Volume", value: "$6.8M", change: "+4.1%" },
        { label: "Treasury", value: "$1.4M", change: "-0.8%" },
        { label: "Stakers", value: "14,820", change: "+18.2%" },
      ]}
    />
  );
}`,
    props: [
      { name: "metrics", type: "MetricItem[]", default: "[]", description: "Array of items with label, value, and change percent." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  {
    slug: "cryptosalescandlestickchart",
    title: "Candlestick Chart",
    description: "Volume candlestick chart with animated bar height reveals and interactive volume inspector.",
    category: "Pools & finance",
    code: `// Import
import { CryptoSalesCandlestickChart } from "@/components/ui/crypto-sales-candlestick-chart";

// Usage
export default function Example() {
  return (
    <CryptoSalesCandlestickChart
      salesAmount="$9,134 SOL"
      growthPercent={2.5}
    />
  );
}`,
    props: [
      { name: "salesAmount", type: "string", default: '"$9,134 SOL"', description: "Primary volume or sales amount headline." },
      { name: "growthPercent", type: "number | null", default: "2.5", description: "24h percentage growth metric." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "cryptosalessegmentedbars",
    title: "Segmented Bars",
    description: "Segmented metric progress matrix with staggered animations for multi-tiered liquidity health.",
    category: "Pools & finance",
    code: `// Import
import { CryptoSalesSegmentedBars } from "@/components/ui/crypto-sales-segmented-bars";

// Usage
export default function Example() {
  return (
    <CryptoSalesSegmentedBars
      salesAmount="$9,134 SOL"
      growthPercent={2.5}
    />
  );
}`,
    props: [
      { name: "salesAmount", type: "string", default: '"$9,134 SOL"', description: "Primary metric headline." },
      { name: "growthPercent", type: "number | null", default: "2.5", description: "Metric change indicator." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "runstatsstacks",
    title: "Solana Batch Stacks",
    description: "Interactive 3D perspective stacked cards displaying transaction batch volume, priority fee, and status.",
    category: "Pools & finance",
    code: `// Import
import { RunStatsStacks } from "@/components/ui/run-stats-stacks";

// Usage
export default function Example() {
  return <RunStatsStacks />;
}`,
    props: [
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  /* ---------------- Status & motion (12) ---------------- */
  {
    slug: "signaturestatusbadge",
    title: "Signature Status Badge",
    description: "Compact Solana signature confirmation badge with finalized, confirmed, pending, and failed states.",
    category: "Status & motion",
    code: `// Import
import { SignatureStatusBadge } from "@/components/ui/signature-status-badge";

// Usage
export default function Example() {
  return (
    <SignatureStatusBadge
      status="confirmed"
      confirmations={24}
      confirmationsRequired={32}
    />
  );
}`,
    props: [
      { name: "status", type: '"finalized" | "confirmed" | "pending" | "failed"', default: '"finalized"', description: "Solana transaction commitment status state." },
      { name: "confirmations", type: "number", default: "undefined", description: "Number of validator confirmations received so far." },
      { name: "confirmationsRequired", type: "number", default: "undefined", description: "Total confirmations required for full finality." },
      { name: "className", type: "string", default: '""', description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "statusbadgepill",
    title: "Status Badge Pill",
    description: "Soft pill badge with pulsing status dot for active, paused, idle, and warning indicators.",
    category: "Status & motion",
    code: `// Import
import { StatusBadgePill } from "@/components/ui/status-badge-pill";

// Usage
export default function Example() {
  return (
    <StatusBadgePill status="online" label="Network Operational" />
  );
}`,
    props: [
      { name: "status", type: '"online" | "offline" | "busy" | "idle"', default: '"online"', description: "Status variant determining color tone." },
      { name: "label", type: "string", default: '"Active"', description: "Text label displayed inside badge." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "multistatebadge",
    title: "Multi State Badge",
    description: "Interactive badge cycling through sequential states with smooth color transitions.",
    category: "Status & motion",
    code: `// Import
import { MultiStateBadge } from "@/components/ui/multi-state-badge";

// Usage
export default function Example() {
  return (
    <MultiStateBadge
      states={["Draft", "Review", "Approved", "Published"]}
      activeState="Approved"
    />
  );
}`,
    props: [
      { name: "states", type: "string[]", default: "[]", description: "List of possible lifecycle state strings." },
      { name: "activeState", type: "string", default: '""', description: "Currently highlighted state." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "trendbadge",
    title: "Trend Badge",
    description: "Percent change chip with automatic directional up/down arrow and green/red tinting.",
    category: "Status & motion",
    code: `// Import
import { TrendBadge } from "@/components/ui/trend-badge";

// Usage
export default function Example() {
  return (
    <TrendBadge value={+8.45} timeframe="24h" />
  );
}`,
    props: [
      { name: "value", type: "number", default: "0", description: "Numeric delta value (positive green, negative red)." },
      { name: "timeframe", type: "string", default: '"24h"', description: "Optional timeframe label shown next to percent." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "solanatransactionstatus",
    title: "Solana Transaction Status",
    description: "Step-by-step transaction tracker: Sent, Confirmed, Finalized, with explorer explorer link.",
    category: "Status & motion",
    code: `// Import
import { SolanaTransactionStatus } from "@/components/ui/solana-transaction-status";

// Usage
export default function Example() {
  return (
    <SolanaTransactionStatus
      signature="5K4...8xY"
      step="finalized"
    />
  );
}`,
    props: [
      { name: "signature", type: "string", default: '""', description: "Solana transaction hash/signature." },
      { name: "step", type: '"sent" | "confirming" | "finalized" | "failed"', default: '"sent"', description: "Current stage in the transaction lifecycle." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "txntoast",
    title: "Txn Toast",
    description: "Actionable HUD notification toast for Solana transactions with direct block explorer link.",
    category: "Status & motion",
    code: `// Import
import { TxnToast } from "@/components/ui/txn-toast";

// Usage
export default function Example() {
  return (
    <TxnToast
      title="Transaction Confirmed"
      signature="3J98t...wR2"
      type="success"
    />
  );
}`,
    props: [
      { name: "title", type: "string", default: '"Transaction Sent"', description: "Toast notification heading." },
      { name: "signature", type: "string", default: '""', description: "Base58 transaction signature string." },
      { name: "type", type: '"success" | "pending" | "error"', default: '"success"', description: "Visual status style." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "successcheck",
    title: "Success Check",
    description: "Animated SVG draw checkmark with burst particles indicating confirmed actions.",
    category: "Status & motion",
    code: `// Import
import { SuccessCheck } from "@/components/ui/success-check";

// Usage
export default function Example() {
  return (
    <SuccessCheck size={64} autoPlay={true} />
  );
}`,
    props: [
      { name: "size", type: "number", default: "48", description: "Icon size in pixels." },
      { name: "autoPlay", type: "boolean", default: "true", description: "Whether checkmark draws on mount." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "errorstateshake",
    title: "Error State Shake",
    description: "Spring-damped horizontal shake animation container triggered on invalid forms or rejected signatures.",
    category: "Status & motion",
    code: `// Import
import { ErrorStateShake } from "@/components/ui/error-state-shake";

// Usage
export default function Example() {
  return (
    <ErrorStateShake trigger={true}>
      <input placeholder="Invalid input" />
    </ErrorStateShake>
  );
}`,
    props: [
      { name: "trigger", type: "boolean | number", default: "false", description: "Triggers spring shake animation when updated." },
      { name: "children", type: "React.ReactNode", default: "undefined", description: "Content wrapped in the shake container." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "valueflash",
    title: "Value Flash",
    description: "High-frequency green/red background highlight flash on numeric asset price ticks.",
    category: "Status & motion",
    code: `// Import
import { ValueFlash } from "@/components/ui/value-flash";

// Usage
export default function Example() {
  return (
    <ValueFlash value={148.5}>
      <span>$148.50</span>
    </ValueFlash>
  );
}`,
    props: [
      { name: "value", type: "number", default: "0", description: "Monitored value; changes trigger flash." },
      { name: "children", type: "React.ReactNode", default: "undefined", description: "Target text or element." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "digitswap",
    title: "Digit Swap",
    description: "Smooth vertical slide transition for individual animated digits as numbers change.",
    category: "Status & motion",
    code: `// Import
import { DigitSwap } from "@/components/ui/digit-swap";

// Usage
export default function Example() {
  return (
    <DigitSwap value={1250} />
  );
}`,
    props: [
      { name: "value", type: "number", default: "0", description: "Target integer or decimal to display." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "spinningcounter",
    title: "Spinning Counter",
    description: "Odometer-style smooth spinning ticker counter for financial balances and stats.",
    category: "Status & motion",
    code: `// Import
import { SpinningCounter } from "@/components/ui/spinning-counter";

// Usage
export default function Example() {
  return (
    <SpinningCounter value={42500} prefix="$" />
  );
}`,
    props: [
      { name: "value", type: "number", default: "0", description: "Target value animated from previous count." },
      { name: "prefix", type: "string", default: '""', description: "Optional prefix symbol (e.g. '$')." },
      { name: "suffix", type: "string", default: '""', description: "Optional suffix symbol (e.g. 'SOL')." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "progressring",
    title: "Solana Progress Ring",
    description: "Circular SVG gradient ring visualizing epoch, quota, or confirmation progress.",
    category: "Status & motion",
    code: `// Import
import { ProgressRing } from "@/components/ui/progress-ring";

// Usage
export default function Example() {
  return (
    <ProgressRing
      progress={75}
      size={120}
      strokeWidth={8}
      label="75%"
    />
  );
}`,
    props: [
      { name: "progress", type: "number", default: "0", description: "Current percentage (0 to 100)." },
      { name: "size", type: "number", default: "120", description: "Ring diameter in pixels." },
      { name: "strokeWidth", type: "number", default: "8", description: "Ring stroke thickness in pixels." },
      { name: "label", type: "string", default: 'undefined', description: "Center text readout." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  {
    slug: "steptrackerwidget",
    title: "Step Tracker Widget",
    description: "Interactive Solana transaction pipeline with animated step progress, glowing checkmarks, and status text.",
    category: "Status & motion",
    code: `// Import
import { StepTrackerWidget } from "@/components/ui/step-tracker-widget";

// Usage
export default function Example() {
  return (
    <StepTrackerWidget
      title="Solana Txn Pipeline"
      totalSteps={5}
      initialStep={3}
    />
  );
}`,
    props: [
      { name: "title", type: "string", default: '"Solana Txn Pipeline"', description: "Header title of the pipeline tracker." },
      { name: "totalSteps", type: "number", default: "5", description: "Total count of steps in the sequence." },
      { name: "initialStep", type: "number", default: "3", description: "Default active step index on load." },
      { name: "stepsInfo", type: "string[]", default: "DEFAULT_STEPS", description: "Array of step description strings." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "activityfeed",
    title: "Activity Feed",
    description: "Real-time feed of recent on-chain transactions, swaps, stakes, and signature statuses.",
    category: "Status & motion",
    code: `// Import
import { ActivityFeed } from "@/components/ui/activity-feed";

// Usage
export default function Example() {
  return (
    <ActivityFeed
      items={[
        {
          title: "Swapped SOL for USDC",
          timestamp: new Date(),
          value: "+$224.80",
        },
      ]}
    />
  );
}`,
    props: [
      { name: "items", type: "ActivityItem[]", default: "[]", description: "Array of activity entries with title, timestamp, and values." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "transactionmodal",
    title: "Transaction Modal",
    description: "Pre-flight transaction simulation modal with net balance changes, network fee breakdown, and approval states.",
    category: "Status & motion",
    code: `// Import
import { TransactionModal } from "@/components/ui/transaction-modal";

// Usage
export default function Example() {
  return (
    <TransactionModal
      isOpen={true}
      inline={true}
      dappName="Jupiter Aggregator"
      onClose={() => console.log("close")}
      onConfirm={() => console.log("confirm")}
    />
  );
}`,
    props: [
      { name: "isOpen", type: "boolean", default: "false", description: "Controls visibility of the modal dialog." },
      { name: "onClose", type: "() => void", default: "undefined", description: "Callback triggered when user cancels or dismisses." },
      { name: "onConfirm", type: "() => void", default: "undefined", description: "Callback triggered upon approving the transaction." },
      { name: "dappName", type: "string", default: '"Jupiter Aggregator"', description: "Display name of requesting dApp." },
      { name: "dappIcon", type: "string", default: '"https://jup.ag/svg/jupiter-logo.svg"', description: "URL of requesting dApp logo." },
      { name: "diffs", type: "BalanceDiffItem[]", default: "DEFAULT_DIFFS", description: "Array of simulated balance changes." },
      { name: "estimatedFeeSol", type: "number", default: "0.00005", description: "Estimated transaction fee in SOL." },
      { name: "inline", type: "boolean", default: "false", description: "When true, renders inline without fixed overlay." },
      { name: "isSimulating", type: "boolean", default: "false", description: "Loading indicator during transaction simulation." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  /* ---------------- Controls (10) ---------------- */
  {
    slug: "uxbutton",
    title: "Button",
    description: " tactile Apple-spec action button with spring press, focus rings, and size variants.",
    category: "Controls",
    code: `// Import
import { Button } from "@/components/ui/ux-button";

// Usage
export default function Example() {
  return (
    <Button variant="default" size="md">
      Confirm Transaction
    </Button>
  );
}`,
    props: [
      { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', default: '"default"', description: "Visual styling variant." },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Button dimensions." },
      { name: "disabled", type: "boolean", default: "false", description: "Prevents interactions." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "smoothtabs",
    title: "Smooth Tabs",
    description: "Fluid layoutId navigation tabs with magnetic pill highlight tracking active item.",
    category: "Controls",
    code: `// Import
import { SmoothTabs } from "@/components/ui/smooth-tabs";

// Usage
export default function Example() {
  return (
    <SmoothTabs
      tabs={["Overview", "Analytics", "Settings"]}
      defaultTab="Overview"
      onChange={(tab) => console.log("Tab:", tab)}
    />
  );
}`,
    props: [
      { name: "tabs", type: "string[]", default: "[]", description: "List of tab labels." },
      { name: "defaultTab", type: "string", default: '""', description: "Initial active tab." },
      { name: "onChange", type: "(tab: string) => void", default: "undefined", description: "Callback when tab selection changes." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "animatedtabs",
    title: "Animated Tabs",
    description: "Sliding underline tabs with spring easing and keyboard arrow navigation.",
    category: "Controls",
    code: `// Import
import { AnimatedTabs } from "@/components/ui/animated-tabs";

// Usage
export default function Example() {
  return (
    <AnimatedTabs
      items={[
        { id: "1", label: "Pools" },
        { id: "2", label: "Positions" },
        { id: "3", label: "Orders" },
      ]}
    />
  );
}`,
    props: [
      { name: "items", type: "{ id: string; label: string }[]", default: "[]", description: "Tab entries." },
      { name: "activeId", type: "string", default: 'undefined', description: "Controlled active tab ID." },
      { name: "onSelect", type: "(id: string) => void", default: "undefined", description: "Selection change handler." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "togglepill",
    title: "Toggle Pill",
    description: "Monochrome black and white switch toggle with tactile spring physics.",
    category: "Controls",
    code: `// Import
import { TogglePill } from "@/components/ui/toggle-pill";

// Usage
export default function Example() {
  return (
    <TogglePill
      checked={true}
      onChange={(c) => console.log("State:", c)}
    />
  );
}`,
    props: [
      { name: "checked", type: "boolean", default: "false", description: "Controlled toggle active boolean." },
      { name: "onChange", type: "(checked: boolean) => void", default: "undefined", description: "Fired when user clicks the toggle." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "liquidradio",
    title: "Liquid Radio",
    description: "Fluid morphing radio group where the selection indicator flows between options.",
    category: "Controls",
    code: `// Import
import { LiquidRadio } from "@/components/ui/liquid-radio";

// Usage
export default function Example() {
  return (
    <LiquidRadio
      options={["Instant", "Fast", "Normal"]}
      value="Fast"
      onChange={(val) => console.log("Speed:", val)}
    />
  );
}`,
    props: [
      { name: "options", type: "string[]", default: "[]", description: "Radio selection labels." },
      { name: "value", type: "string", default: '""', description: "Currently selected option value." },
      { name: "onChange", type: "(value: string) => void", default: "undefined", description: "Selection event callback." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "drawcheckbox",
    title: "Draw Checkbox",
    description: "Tactile checkbox with animated SVG stroke drawing and spring scaling.",
    category: "Controls",
    code: `// Import
import { DrawCheckbox } from "@/components/ui/draw-checkbox";

// Usage
export default function Example() {
  return (
    <DrawCheckbox
      checked={true}
      label="Accept terms"
      onChange={(c) => console.log("Checked:", c)}
    />
  );
}`,
    props: [
      { name: "checked", type: "boolean", default: "false", description: "Checkbox checked state." },
      { name: "label", type: "string", default: 'undefined', description: "Accompanying label text." },
      { name: "onChange", type: "(checked: boolean) => void", default: "undefined", description: "Change event handler." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "leverageslider",
    title: "Leverage Slider",
    description: "Stepped leverage slider with preset multiplier buttons (1x, 2x, 5x, 10x, 20x).",
    category: "Controls",
    code: `// Import
import { LeverageSlider } from "@/components/ui/leverages-slider";

// Usage
export default function Example() {
  return (
    <LeverageSlider
      value={5}
      max={20}
      onChange={(val) => console.log("Leverage:", val)}
    />
  );
}`,
    props: [
      { name: "value", type: "number", default: "1", description: "Current leverage multiplier value." },
      { name: "max", type: "number", default: "20", description: "Maximum leverage limit." },
      { name: "onChange", type: "(value: number) => void", default: "undefined", description: "Change callback." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "slippageselector",
    title: "Slippage Selector",
    description: "Tolerance selector with preset percentage chips (0.1%, 0.5%, 1.0%) and custom input.",
    category: "Controls",
    code: `// Import
import { SlippageSelector } from "@/components/ui/slippage-selector";

// Usage
export default function Example() {
  return (
    <SlippageSelector
      value={0.5}
      onChange={(val) => console.log("Slippage:", val)}
    />
  );
}`,
    props: [
      { name: "value", type: "number", default: "0.5", description: "Slippage percentage amount." },
      { name: "onChange", type: "(val: number) => void", default: "undefined", description: "Fired when user picks or enters slippage." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "priorityfeeselector",
    title: "Priority Fee Selector",
    description: "Solana compute unit priority fee selector: Low, Medium, High, or Turbo compute unit tip.",
    category: "Controls",
    code: `// Import
import { PriorityFeeSelector } from "@/components/ui/priority-fee-selector";

// Usage
export default function Example() {
  return (
    <PriorityFeeSelector
      tier="medium"
      onChange={(tier, microLamports) => console.log(tier, microLamports)}
    />
  );
}`,
    props: [
      { name: "tier", type: '"low" | "medium" | "high" | "turbo"', default: '"medium"', description: "Priority level preset." },
      { name: "onChange", type: "(tier: string, microLamports: number) => void", default: "undefined", description: "Callback providing selected tier and lamports tip." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "passwordstrength",
    title: "Password Strength",
    description: "Real-time security strength meter with segmented color bar for wallet passwords.",
    category: "Controls",
    code: `// Import
import { PasswordStrength } from "@/components/ui/password-strength";

// Usage
export default function Example() {
  return (
    <PasswordStrength password="user_secret_input" />
  );
}`,
    props: [
      { name: "password", type: "string", default: '""', description: "Password string evaluated for entropy and complexity." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  {
    slug: "familypopovermenu",
    title: "Family Popover Menu",
    description: "Spring expanding morphing popover menu inspired by Family wallet with custom bezier curves and outside-click dismissal.",
    category: "Controls",
    code: `// Import
import { FamilyPopoverMenu } from "@/components/ui/family-popover-menu";

// Usage
export default function Example() {
  return <FamilyPopoverMenu />;
}`,
    props: [
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },

  /* ---------------- Layout & brand (6) ---------------- */
  {
    slug: "presenceavatars",
    title: "Presence Avatars",
    description: "Dynamic crypto portfolio asset stack with animated spring entrances as portfolio holdings increase, featuring Solana, Bitcoin, Ethereum, and USDC with live pulse.",
    category: "Layout & brand",
    code: `// Import
import { PresenceAvatars } from "@/components/ui/presence-avatars";

// Usage
export default function Example() {
  return (
    <PresenceAvatars max={4} />
  );
}`,
    props: [
      { name: "assets", type: "PortfolioAsset[]", default: "DEFAULT_CRYPTO_ASSETS", description: "Array of crypto token holdings with icon, symbol, and live status." },
      { name: "max", type: "number", default: "5", description: "Maximum visible asset icons before displaying the +N overflow pill." },
      { name: "size", type: "number", default: "36", description: "Pixel diameter of each token icon." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "verificationbadges",
    title: "Verification Badges",
    description: "Badge pills for verified Solana protocols, audited smart contracts, and KYC trust seals.",
    category: "Layout & brand",
    code: `// Import
import { VerificationBadges } from "@/components/ui/verification-badges";

// Usage
export default function Example() {
  return (
    <VerificationBadges type="audited" />
  );
}`,
    props: [
      { name: "type", type: '"verified" | "audited" | "official"', default: '"verified"', description: "Verification tier type." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "solanaeventcard",
    title: "Solana Event Card",
    description: "Conference and hackathon event card with date, venue, speaker avatars, and RSVP CTA.",
    category: "Layout & brand",
    code: `// Import
import { SolanaEventCard } from "@/components/ui/solana-event-card";

// Usage
export default function Example() {
  return (
    <SolanaEventCard
      title="Solana Breakpoint 2026"
      date="Sep 20-23"
      location="Singapore"
    />
  );
}`,
    props: [
      { name: "title", type: "string", default: '""', description: "Event title." },
      { name: "date", type: "string", default: '""', description: "Date or duration." },
      { name: "location", type: "string", default: '""', description: "Venue or city." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "cryptopricepills",
    title: "Crypto Price Pills",
    description: "Horizontal ticker pills showing live token prices and 24-hour green/red percentage deltas.",
    category: "Layout & brand",
    code: `// Import
import { CryptoPricePills } from "@/components/ui/crypto-price-pills";

// Usage
export default function Example() {
  return (
    <CryptoPricePills />
  );
}`,
    props: [
      { name: "items", type: "PricePillItem[]", default: "DEFAULT_PRICES", description: "List of price items with token symbol, price, and delta." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "marquee",
    title: "Marquee",
    description: "Continuous horizontal scrolling marquee banner for partner logos, tickers, and ecosystem sponsors.",
    category: "Layout & brand",
    code: `// Import
import { Marquee } from "@/components/ui/marquee";

// Usage
export default function Example() {
  return (
    <Marquee speed={30}>
      <span className="mx-6">Solana</span>
      <span className="mx-6">Jupiter</span>
      <span className="mx-6">Raydium</span>
    </Marquee>
  );
}`,
    props: [
      { name: "speed", type: "number", default: "25", description: "Scroll speed in seconds per loop." },
      { name: "pauseOnHover", type: "boolean", default: "true", description: "Whether marquee pauses when mouse hovers." },
      { name: "children", type: "React.ReactNode", default: "undefined", description: "Items to scroll continuously." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "oxygenuipill",
    title: "Oxygen UI Pill",
    description: "Signature Oxygen UI brand mark with pulsating beacon dot and glowing border halo.",
    category: "Layout & brand",
    code: `// Import
import { OxygenUIPill } from "@/components/ui/oxygen-ui-pill";

// Usage
export default function Example() {
  return (
    <OxygenUIPill label="Oxygen UI" />
  );
}`,
    props: [
      { name: "label", type: "string", default: '"Oxygen UI"', description: "Brand title rendered inside pill." },
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
  {
    slug: "cardstack",
    title: "Solana Card Stack",
    description: "Spring animated card stack cycling through Solana ecosystem passes, tickets, and badges with physical depth.",
    category: "Layout & brand",
    code: `// Import
import { CardStack } from "@/components/ui/card-stack";

// Usage
export default function Example() {
  return <CardStack />;
}`,
    props: [
      { name: "className", type: "string", default: "undefined", description: "Optional Tailwind CSS class name overrides." },
    ],
  },
];

export const KEPT_SLUGS: string[] = COMPONENT_DOCS.map((d) => d.slug);

const DOCS_MAP = new Map<string, ComponentDoc>(
  COMPONENT_DOCS.map((doc) => [doc.slug.toLowerCase(), doc])
);

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  if (!slug) return undefined;
  return DOCS_MAP.get(slug.toLowerCase());
}

export function getAllComponentDocs(): ComponentDoc[] {
  return COMPONENT_DOCS;
}

export function getNextComponentDoc(slug: string): ComponentDoc {
  const index = COMPONENT_DOCS.findIndex((d) => d.slug === slug);
  if (index === -1 || index >= COMPONENT_DOCS.length - 1) {
    return COMPONENT_DOCS[0];
  }
  return COMPONENT_DOCS[index + 1];
}

export function getPrevComponentDoc(slug: string): ComponentDoc {
  const index = COMPONENT_DOCS.findIndex((d) => d.slug === slug);
  if (index <= 0) {
    return COMPONENT_DOCS[COMPONENT_DOCS.length - 1];
  }
  return COMPONENT_DOCS[index - 1];
}
