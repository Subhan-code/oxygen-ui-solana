"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeComponent } from "@/lib/components";
import { ChevronRight } from "lucide-react";

interface MagneticTabProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

function MagneticBreadcrumbTab({
  children,
  onClick,
  href,
  className,
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

  const content = (
    <div
      ref={ref}
      className={`relative flex h-8 items-center justify-center cursor-pointer px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground transition-colors hover:text-foreground ${
        className || ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 z-0 rounded-md bg-muted/80 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
        style={{
          transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
          opacity: hoverPosition.opacity,
        }}
      />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export default function BreadcrumbPath({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
  const pathname = usePathname();
  const item = activeComponent(pathname);

  return (
    <div className="flex items-center gap-1 font-mono text-xs select-none">
      <MagneticBreadcrumbTab onClick={onToggleSidebar}>
        Components
      </MagneticBreadcrumbTab>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
      {item ? (
        <MagneticBreadcrumbTab className="text-foreground font-semibold">
          {item.name}
        </MagneticBreadcrumbTab>
      ) : (
        <MagneticBreadcrumbTab className="text-foreground font-semibold">
          Overview
        </MagneticBreadcrumbTab>
      )}
    </div>
  );
}
