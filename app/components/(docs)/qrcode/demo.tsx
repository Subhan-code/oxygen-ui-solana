"use client";

import { useState } from "react";
import { QRCode } from "@/components/ui/qr-code";
import { AnimatedSwitch } from "@/components/ui/animated-switch";

export function Demo() {
  const [tiltEnabled, setTiltEnabled] = useState(true);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full flex-col items-center justify-center gap-6 p-6 transition-all duration-300">
      <div className="flex items-center gap-3 rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          3D Perspective Tilt Card Mode
        </span>
        <AnimatedSwitch
          checked={tiltEnabled}
          onCheckedChange={setTiltEnabled}
        />
      </div>

      <QRCode
        value="https://x.com/intent/follow?screen_name=SubhanHQ"
        size={240}
        enableTilt={tiltEnabled}
      />

      <div className="text-center">
        <p className="font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          {tiltEnabled
            ? "Move cursor over QR card for 3D tilt & glass spotlight"
            : "Scan with phone camera to follow @SubhanHQ on X"}
        </p>
        <p className="font-mono text-[10px] text-zinc-400 mt-1">
          Click QR card to play glass ripple & cycle color theme
        </p>
      </div>
    </div>
  );
}
