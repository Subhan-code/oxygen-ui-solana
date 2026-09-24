"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import metamask from "thesvg/metamask";
import coinbase from "thesvg/coinbase";
import solana from "thesvg/solana";
import walletconnect from "thesvg/walletconnect";
import { cn } from "@/lib/utils";

export interface WalletOption {
  id: string;
  name: string;
  svg: string;
  popular?: boolean;
}

export interface MultiWalletSwitcherProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  description?: string;
  wallets?: WalletOption[];
  activeId?: string;
  onSelectWallet?: (wallet: WalletOption) => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

const PHANTOM_SVG = `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="64" fill="#AB9FF2" />
  <path d="M107.5 67.5C104.5 45.5 87 36 67.5 36C45 36 31 51 31 69.5C31 82 40 92 53.5 92C61 92 66.5 88.5 70 84.5C72 90 77.5 92 84 92C93 92 101 83.5 102 78.5C102.5 76 100 74.5 98.5 76C95.5 79 90.5 82 85 82C80.5 82 78.5 79.5 78.5 76C78.5 71 83 69 87.5 69C95 69 101.5 70.5 106 73C107.5 73.5 108 71 107.5 67.5ZM51.5 63C49 63 47 61 47 58.5C47 56 49 54 51.5 54C54 54 56 56 56 58.5C56 61 54 63 51.5 63ZM72.5 63C70 63 68 61 68 58.5C68 56 70 54 72.5 54C75 54 77 56 77 58.5C77 61 75 63 72.5 63Z" fill="#1C1C1E" />
</svg>`;

const RABBY_SVG = `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="64" cy="64" r="64" fill="#8697FF" />
  <path d="M38 82c6-8 14-12 22-12s16 4 22 12c-2-14-8-24-20-24-6 0-10 4-14 8-2-4-6-8-10-8-4 0-8 2-10 6 2 6 4 10 8 16z" fill="white" />
  <circle cx="50" cy="60" r="4" fill="#8697FF" />
  <circle cx="68" cy="60" r="4" fill="#8697FF" />
</svg>`;

const BACKPACK_SVG = `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="64" cy="64" r="64" fill="#E33E38" />
  <path d="M40 52a12 12 0 0112-12h24a12 12 0 0112 12v40a8 8 0 01-8 8H48a8 8 0 01-8-8V52z" fill="white" />
  <path d="M52 40V32a8 8 0 0116 0v8" stroke="white" stroke-width="6" stroke-linecap="round" />
  <path d="M48 68h32" stroke="#E33E38" stroke-width="6" stroke-linecap="round" />
</svg>`;

const DEFAULT_WALLETS: WalletOption[] = [
  { id: "metamask", name: "Metamask", svg: metamask.svg, popular: true },
  { id: "phantom", name: "Phantom", svg: PHANTOM_SVG, popular: true },
  { id: "coinbase", name: "Coinbase", svg: coinbase.svg },
  { id: "rabby", name: "Rabby", svg: RABBY_SVG },
  { id: "backpack", name: "Backpack", svg: BACKPACK_SVG },
  { id: "solana", name: "Solana", svg: solana.svg },
  { id: "walletconnect", name: "WalletConnect", svg: walletconnect.svg },
];

function BrandSvg({ svg }: { svg: string }) {
  return (
    <div
      className="size-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden [&_svg]:size-full [&_svg]:w-full [&_svg]:h-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export function MultiWalletSwitcher({
  title = "Connect wallet",
  description = "Get started by connecting your preferred wallet below.",
  wallets = DEFAULT_WALLETS,
  activeId = "phantom",
  onSelectWallet,
  onTermsClick,
  onPrivacyClick,
  className,
  ...props
}: MultiWalletSwitcherProps) {
  const [selectedId, setSelectedId] = React.useState(activeId);
  const [showAll, setShowAll] = React.useState(false);

  const visibleWallets = React.useMemo(() => {
    return showAll ? wallets : wallets.slice(0, 4);
  }, [wallets, showAll]);

  const handleSelect = (wallet: WalletOption) => {
    setSelectedId(wallet.id);
    onSelectWallet?.(wallet);
  };

  return (
    <div
      data-slot="multi-wallet-switcher"
      className={cn(
        "relative flex flex-col w-full max-w-[360px] rounded-[28px] border border-black/10 dark:border-white/10",
        "bg-white/95 dark:bg-[#18181b]/95 p-6 shadow-2xl backdrop-blur-2xl select-none",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col text-left mb-5">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-runde">
          {title}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Wallets List */}
      <div className="flex flex-col gap-1.5 w-full">
        {visibleWallets.map((wallet) => {
          const isSelected = wallet.id === selectedId;

          return (
            <button
              key={wallet.id}
              type="button"
              onClick={() => handleSelect(wallet)}
              className={cn(
                "group relative flex items-center justify-between w-full h-12 px-3 rounded-2xl",
                "transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50",
                isSelected
                  ? "bg-black/[0.06] dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <BrandSvg svg={wallet.svg} />
                <span className="text-sm font-medium tracking-tight">
                  {wallet.name}
                </span>
              </div>

              <div className="flex items-center pr-1">
                {isSelected ? (
                  <ArrowRight className="size-4 text-zinc-900 dark:text-white transition-transform group-hover:translate-x-0.5" />
                ) : (
                  <ArrowRight className="size-4 opacity-0 group-hover:opacity-70 -translate-x-1 group-hover:translate-x-0 transition-all text-zinc-400" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Load More Button */}
      {wallets.length > 4 && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className={cn(
            "w-full mt-3 h-10 rounded-xl border border-black/10 dark:border-white/10",
            "bg-transparent hover:bg-black/[0.03] dark:hover:bg-white/[0.05]",
            "text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors",
            "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
          )}
        >
          {showAll ? "Show Less" : "Load More"}
        </button>
      )}

      {/* Terms & Privacy Footer */}
      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal text-left mt-5 pt-1">
        By connecting your wallet, you agree to our{" "}
        <button
          type="button"
          onClick={onTermsClick}
          className="text-sky-500 dark:text-sky-400 hover:underline inline font-medium cursor-pointer"
        >
          Terms of Service
        </button>{" "}
        and our{" "}
        <button
          type="button"
          onClick={onPrivacyClick}
          className="text-sky-500 dark:text-sky-400 hover:underline inline font-medium cursor-pointer"
        >
          Privacy Policy
        </button>
      </p>
    </div>
  );
}

export default MultiWalletSwitcher;
