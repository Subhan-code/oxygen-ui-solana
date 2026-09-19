"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeComponent } from "@/lib/components";

interface MagneticTabProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  dataSlot?: string;
}

function MagneticBreadcrumbTab({
  children,
  onClick,
  href,
  className,
  dataSlot,
}: MagneticTabProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hoverPosition, setHoverPosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.2;
    const y = (clientY - top - height / 2) * 0.2;

    setHoverPosition({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setHoverPosition({ x: 0, y: 0, opacity: 0 });
  };

  const innerContent = (
    <div
      ref={ref}
      data-slot={dataSlot}
      className={`relative inline-flex items-center justify-center cursor-pointer px-2.5 py-1 rounded-lg transition-colors text-sm whitespace-nowrap shrink-0 ${
        className || ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 z-0 rounded-lg bg-accent/80 backdrop-blur-xs transition-opacity pointer-events-none"
        aria-hidden="true"
        style={{
          transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
          opacity: hoverPosition.opacity,
        }}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} data-slot={dataSlot} className="shrink-0">
        {innerContent}
      </Link>
    );
  }

  return innerContent;
}

export default function BreadcrumbPath({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
  const pathname = usePathname();
  const item = activeComponent(pathname);
  const currentTitle = item ? item.name : "Overview";

  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className="hidden sm:block select-none"
      suppressHydrationWarning
    >
      <ol
        data-slot="breadcrumb-list"
        className="text-muted-foreground flex flex-nowrap whitespace-nowrap items-center gap-1.5 text-sm sm:gap-2 select-none overflow-hidden max-w-full"
        suppressHydrationWarning
      >
        <li
          data-slot="breadcrumb-item"
          className="inline-flex items-center gap-1.5 shrink-0"
        >
          <MagneticBreadcrumbTab
            href="/sol-components"
            dataSlot="breadcrumb-link"
            className="text-foreground/60 hover:text-foreground hover:bg-accent"
          >
            Sol Components
          </MagneticBreadcrumbTab>
        </li>
        <li
          data-slot="breadcrumb-separator"
          role="presentation"
          aria-hidden="true"
          className="[&>svg]:size-3.5 text-muted-foreground/60 shrink-0 select-none"
        >
          /
        </li>
        <li
          data-slot="breadcrumb-item"
          className="inline-flex items-center gap-1.5 shrink-0"
        >
          <MagneticBreadcrumbTab
            dataSlot="breadcrumb-page"
            className="text-foreground text-sm font-medium"
          >
            {currentTitle}
          </MagneticBreadcrumbTab>
        </li>
      </ol>
    </nav>
  );
}
