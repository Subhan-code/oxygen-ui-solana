"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import SidebarList from "./SidebarList";
import SidebarToggleIcon from "./SidebarToggleIcon";
import { Squircle } from "@squircle-js/react";

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
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        className="pointer-events-auto absolute top-4 left-4 z-50 cursor-pointer rounded-lg bg-popover p-2"
      >
        <SidebarToggleIcon isOpen={open} className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
      </button>

      <Squircle asChild cornerRadius={23} cornerSmoothing={1}>
        <motion.div
          ref={containerRef}
          initial={false}
          animate={{ x: open ? 0 : -PANEL_SHIFT }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="pointer-events-auto flex h-full w-75 flex-col overflow-y-auto bg-card p-4 pl-6"
        >
          <h2 className="mt-18 shrink-0">Components</h2>
          <div className="mt-4 pb-16">
            <SidebarList />
          </div>
        </motion.div>
      </Squircle>
    </div>
  );
};

export default Sidebar;
