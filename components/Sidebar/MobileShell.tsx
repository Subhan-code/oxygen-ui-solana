"use client";

import { usePathname } from "next/navigation";
import { activeComponent } from "@/lib/components";
import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";
import DescriptionContent from "../Description/DescriptionContent";
import SourceSection from "../Description/SourceSection";

const CARD = "rounded-[32px] bg-card";

export default function MobileShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const item = activeComponent(pathname);

  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <div className="flex flex-col gap-2 pb-2">
        <div className={cn(CARD, "relative flex h-[88svh] w-full shrink-0 flex-col items-center justify-center overflow-auto p-4 transition-all duration-300")}>
          <MobileSidebar />
          <div className="flex h-full w-full flex-col items-center justify-center overflow-auto">
            {children}
          </div>
        </div>

        <div className={cn(CARD, "p-6")}>
          <DescriptionContent item={item} showSourceHint={false} />
        </div>

        {item?.registry && (
          <div className={cn(CARD, "p-6")}>
            <SourceSection key={item.registry} registry={item.registry} />
          </div>
        )}
      </div>
    </div>
  );
}
