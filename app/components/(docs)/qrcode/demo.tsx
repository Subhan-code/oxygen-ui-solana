"use client";

import { QRCode } from "@/components/ui/qr-code";

export function Demo() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full flex-col items-center justify-center gap-6 p-6 transition-all duration-300">
      <QRCode
        value="https://x.com/intent/follow?screen_name=SubhanHQ"
        size={240}
      />

      <div className="text-center">
        <p className="font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          Scan with phone camera to follow @SubhanHQ on X
        </p>
        <p className="font-mono text-[10px] text-zinc-400 mt-1">
          Click QR card to play glass ripple and cycle color theme
        </p>
      </div>
    </div>
  );
}
