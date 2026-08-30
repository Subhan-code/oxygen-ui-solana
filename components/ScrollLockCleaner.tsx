"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollLockCleaner() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    const handleScrollSafety = () => {
      if (
        document.body.style.overflow === "hidden" ||
        document.documentElement.style.overflow === "hidden"
      ) {
        const hasOpenModal = document.querySelector(
          '[role="dialog"][aria-modal="true"], [data-state="open"][role="dialog"], [vaul-drawer][data-state="open"]'
        );
        if (!hasOpenModal) {
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
        }
      }
    };

    window.addEventListener("scroll", handleScrollSafety, { passive: true });
    window.addEventListener("wheel", handleScrollSafety, { passive: true });
    window.addEventListener("pointerdown", handleScrollSafety, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollSafety);
      window.removeEventListener("wheel", handleScrollSafety);
      window.removeEventListener("pointerdown", handleScrollSafety);
    };
  }, []);

  return null;
}
