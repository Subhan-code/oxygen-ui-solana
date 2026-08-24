"use client";

import NotificationBadge from "@/components/ui/notification-badge";

export default function NotificationBadgeDemo() {
  return (
    <div className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <NotificationBadge />
    </div>
  );
}
