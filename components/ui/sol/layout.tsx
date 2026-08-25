"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { NetworkBadge, ClusterName } from "./network";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({
  className,
  sidebar,
  header,
  children,
  ...props
}: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      className={cn("flex min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300", className)}
      {...props}
    >
      {sidebar && <aside className="w-64 shrink-0 border-r border-white/10 bg-zinc-950/60 backdrop-blur-xl">{sidebar}</aside>}
      <div className="flex flex-1 flex-col">
        {header && <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-2xl">{header}</header>}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  cluster?: ClusterName;
  actions?: React.ReactNode;
}

export function DashboardHeader({
  className,
  title,
  cluster = "mainnet-beta",
  actions,
  ...props
}: DashboardHeaderProps) {
  return (
    <div
      data-slot="dashboard-header"
      className={cn("flex items-center justify-between px-6 py-4", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-black text-white tracking-tight">{title}</h1>
        <NetworkBadge cluster={cluster} />
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
}

export interface SidebarNavProps {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function SidebarNav({
  items,
  activeId,
  onSelect,
  className,
}: SidebarNavProps) {
  return (
    <nav
      data-slot="sidebar-nav"
      className={cn("flex flex-col gap-1 p-4", className)}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect?.(item.id)}
            className={cn(
              "relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors",
              isActive
                ? "text-emerald-400"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-active-indicator"
                transition={springTransition}
                className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-sm"
              />
            )}
            <span className="relative z-10">{item.icon}</span>
            <span className="relative z-10">{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  className,
  title,
  description,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex flex-col gap-1 mb-6", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {description && <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">{description}</p>}
    </div>
  );
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "outline";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "border-white/10 bg-zinc-950/80 backdrop-blur-xl",
    glass: "border-white/10 bg-zinc-900/40 backdrop-blur-2xl",
    gradient: "border-emerald-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 backdrop-blur-xl",
    outline: "border-white/10 bg-transparent",
  };

  return (
    <motion.div
      data-slot="card"
      whileHover={{ y: -1 }}
      transition={springTransition}
      className={cn(
        "rounded-2xl border p-5 shadow-xl transition-colors",
        variantStyles[variant],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function Section({
  className,
  title,
  description,
  actions,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn("flex flex-col gap-4 py-4", className)}
      {...props}
    >
      {(title || description || actions) && (
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            {title && <h3 className="font-bold text-white text-base tracking-tight">{title}</h3>}
            {description && <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}

