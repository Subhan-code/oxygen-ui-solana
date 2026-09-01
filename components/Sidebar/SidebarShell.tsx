"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "@/lib/use-media-query";
import DesktopShell from "./DesktopShell";
import MobileShell from "./MobileShell";
import { PreviewControlsProvider } from "../preview/PreviewControls";

export default function SidebarShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <PreviewControlsProvider>
        <div
          className="relative h-full w-full overflow-hidden rounded-[45px] bg-card p-4"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
          suppressHydrationWarning
        >
          {children}
        </div>
      </PreviewControlsProvider>
    );
  }

  return (
    <PreviewControlsProvider>
      {isMobile ? (
        <MobileShell>{children}</MobileShell>
      ) : (
        <DesktopShell>{children}</DesktopShell>
      )}
    </PreviewControlsProvider>
  );
}

