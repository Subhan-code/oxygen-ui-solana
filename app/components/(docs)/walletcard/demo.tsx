"use client";

import React, { useState } from "react";
import { WalletCard, type WalletAccount } from "@/components/ui/wallet-card";

const ACCOUNTS: WalletAccount[] = [
  {
    id: "personal",
    name: "Main Vault",
    address: "0x71C...38A2",
  },
  {
    id: "trading",
    name: "DEX Trading",
    address: "0x89A...12F4",
  },
  {
    id: "staking",
    name: "Yield Farming",
    address: "0x3F2...88B0",
  },
];

export default function Demo() {
  const [balance, setBalance] = useState(24850.75);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <div className="flex min-h-[580px] w-full items-center justify-center p-4">
      <WalletCard
        accounts={ACCOUNTS}
        balance={balance}
        defaultChange={340.25}
        hasNotifications={hasNotifications}
        onNotifications={() => setHasNotifications(false)}
        searchRecent={["Uniswap", "ETH", "USDC", "Solana", "Aave"]}
        onSend={() => setBalance((b) => +(b - 120.5).toFixed(2))}
        onDeposit={() => setBalance((b) => +(b + 500).toFixed(2))}
      />
    </div>
  );
}
