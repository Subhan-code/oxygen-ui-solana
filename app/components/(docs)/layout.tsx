import React from "react";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col" suppressHydrationWarning>
      {children}
    </div>
  );
}
