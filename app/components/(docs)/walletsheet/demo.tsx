"use client";

import React, { useState } from "react";
import { WalletSheet } from "@/components/ui/wallet-sheet";

const MOCK_TOKENS = [
  {
    icon: "/tokens/sol.svg",
    name: "Solana",
    symbol: "SOL",
    balance: "42.50",
    value: "$8,450.75",
    change: "+5.2%",
  },
  {
    icon: "/tokens/usdc.svg",
    name: "USD Coin",
    symbol: "USDC",
    balance: "1,250.00",
    value: "$1,250.00",
    change: "+0.01%",
  },
  {
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixV6xhyV7F75fkMTy165/logo.png",
    name: "Bonk",
    symbol: "BONK",
    balance: "15,400,000",
    value: "$385.00",
    change: "-2.1%",
  },
];

export default function Demo() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 max-w-md w-full text-center">
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-zinc-100">Wallet Sheet & Popup Modal</h3>
          <p className="text-xs text-zinc-400">
            Click a trigger button below to open the interactive wallet drawer sheet or centered modal popup.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Side Drawer Trigger */}
          <WalletSheet
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            variant="drawer"
            side="right"
            address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
            balance="$10,085.75"
            balanceChange="+$492.20"
            balanceChangePercent="+5.12%"
            tokens={MOCK_TOKENS}
            trigger={
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Open Right Drawer Sheet</span>
              </button>
            }
          >
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-colors cursor-pointer"
            >
              Disconnect Wallet
            </button>
          </WalletSheet>

          {/* Centered Modal Popup Trigger */}
          <WalletSheet
            open={modalOpen}
            onOpenChange={setModalOpen}
            variant="modal"
            address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
            balance="$10,085.75"
            balanceChange="+$492.20"
            balanceChangePercent="+5.12%"
            tokens={MOCK_TOKENS}
            trigger={
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-semibold border border-zinc-700 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>Open Center Modal Popup</span>
              </button>
            }
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
            >
              Close Popup
            </button>
          </WalletSheet>
        </div>
      </div>
    </div>
  );
}