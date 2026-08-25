"use client";

import { useEffect, useRef, useCallback } from "react";
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

  const handleToggle = useCallback(() => {
    setOpen((v) => !v);
  }, [setOpen]);

  const handleNavigateClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
      {/* Top Header Controls: Independent Free-Floating Toggle Button & Breadcrumb Path */}
      <div className="pointer-events-auto absolute top-4 left-4 z-50 flex items-center gap-3">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          aria-label={open ? "Close sidebar" : "Open sidebar"}
          className="cursor-pointer bg-transparent p-1 text-foreground transition-transform active:scale-95 hover:opacity-80"
        >
          <SidebarToggleIcon
            isOpen={open}
            strokeWidth={1.8}
            className="h-[22px] w-[22px] text-foreground"
          />
        </button>

        <BreadcrumbPath onToggleSidebar={handleToggle} />
      </div>

      <motion.div
        ref={containerRef}
        initial={false}
        animate={{ x: open ? 0 : -PANEL_SHIFT }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="pointer-events-auto bg-black text-white dark:bg-black dark:text-white border-0 border-none relative flex h-full w-[320px] flex-col overflow-y-auto overflow-x-clip rounded-3xl pl-4 pr-2 text-[15px] tracking-tight shadow-2xl no-scrollbar will-change-transform"
      >
        <SidebarList onNavigate={handleNavigateClose} isOpen={open} />
      </motion.div>
    </div>
  );
};

export default Sidebar;
