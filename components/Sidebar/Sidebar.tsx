"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import SidebarList from "./SidebarList";
import SidebarToggleIcon from "./SidebarToggleIcon";
import BreadcrumbPath from "./BreadcrumbPath";

const PANEL_SHIFT = 340;

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-40 h-full">
      {/* Top Header Controls: Transparent Sidebar Toggle Button + Breadcrumb Path */}
      <div className="pointer-events-auto absolute top-4 left-4 z-50 flex items-center gap-3 rounded-2xl border border-border/40 bg-background/50 backdrop-blur-md p-1.5 shadow-xs">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close sidebar" : "Open sidebar"}
          className="cursor-pointer rounded-xl bg-transparent p-2 text-foreground transition-colors hover:bg-muted/50"
        >
          <SidebarToggleIcon
            isOpen={open}
            strokeWidth={1.8}
            className="h-7 w-7 text-foreground"
          />
        </button>

        <BreadcrumbPath onToggleSidebar={() => setOpen((v) => !v)} />
      </div>

      <motion.div
        ref={containerRef}
        initial={false}
        animate={{ x: open ? 0 : -PANEL_SHIFT }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-auto bg-[#111] text-white relative flex h-full w-[320px] flex-col overflow-y-auto overflow-x-clip rounded-3xl pl-4 pr-2 text-[15px] tracking-tight border border-white/10 shadow-2xl no-scrollbar"
      >
        <SidebarList onNavigate={() => setOpen(false)} />
      </motion.div>
    </div>
  );
};

export default Sidebar;
