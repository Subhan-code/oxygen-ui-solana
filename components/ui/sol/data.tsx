"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  ArrowUpDown,
  Activity,
} from "lucide-react";
import { AccountAddress } from "./account";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 25,
};

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
}: DataTableProps<T>) {
  return (
    <div
      data-slot="data-table"
      className={cn(
        "overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-2xl",
        className
      )}
    >
      <table className="w-full text-left text-xs text-zinc-300">
        <thead className="border-b border-white/10 bg-white/5 uppercase text-[10px] font-extrabold tracking-wider text-zinc-400">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span>{col.header}</span>
                  <ArrowUpDown className="h-3 w-3 text-zinc-500" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((row, idx) => (
            <motion.tr
              key={idx}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              transition={springTransition}
              className="transition-colors cursor-pointer"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 font-medium">
                  {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
}

export interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div
      data-slot="activity-feed"
      className={cn("flex flex-col gap-3", className)}
    >
      {activities.map((act, idx) => (
        <motion.div
          key={act.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: idx * 0.04 }}
          className="flex items-start gap-3 rounded-xl border border-white/5 bg-zinc-950/60 p-3.5 text-xs backdrop-blur-md"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            {act.icon || <Activity className="h-4 w-4" />}
          </div>
          <div className="flex-1 space-y-0.5">
            <h5 className="font-bold text-white tracking-tight">{act.title}</h5>
            <p className="text-zinc-400 text-[11px] leading-relaxed">{act.description}</p>
          </div>
          <span className="text-[10px] text-zinc-500 font-medium shrink-0">{act.timestamp}</span>
        </motion.div>
      ))}
    </div>
  );
}

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export function StatCard({
  className,
  label,
  value,
  change,
  isPositive = true,
  ...props
}: StatCardProps) {
  return (
    <motion.div
      data-slot="stat-card"
      whileHover={{ y: -2 }}
      transition={springTransition}
      className={cn(
        "flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl shadow-2xl cursor-pointer",
        className
      )}
      {...(props as any)}
    >
      <span className="text-xs font-semibold text-zinc-400">{label}</span>
      <div className="flex items-baseline justify-between">
        <motion.h3
          key={value}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="text-2xl font-black text-white tracking-tight"
        >
          {value}
        </motion.h3>
        {change && (
          <span
            className={cn(
              "text-xs font-bold",
              isPositive ? "text-emerald-400" : "text-rose-400"
            )}
          >
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export interface KeyValuePair {
  label: string;
  value: React.ReactNode;
}

export interface KeyValueListProps {
  items: KeyValuePair[];
  className?: string;
}

export function KeyValueList({ items, className }: KeyValueListProps) {
  return (
    <div
      data-slot="key-value-list"
      className={cn(
        "divide-y divide-white/5 rounded-2xl border border-white/10 bg-zinc-950/80 p-4 text-xs backdrop-blur-xl shadow-xl",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springTransition, delay: idx * 0.03 }}
          className="flex justify-between py-2.5 first:pt-0 last:pb-0"
        >
          <span className="text-zinc-400 font-semibold">{item.label}</span>
          <span className="font-bold text-zinc-200">{item.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

export interface AddressRowData {
  address: string;
  label?: string;
  balanceSol: number;
}

export interface AddressTableProps {
  addresses: AddressRowData[];
  className?: string;
}

export function AddressTable({ addresses, className }: AddressTableProps) {
  return (
    <div
      data-slot="address-table"
      className={cn(
        "overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-2xl",
        className
      )}
    >
      <table className="w-full text-left text-xs text-zinc-300">
        <thead className="border-b border-white/10 bg-white/5 uppercase text-[10px] font-extrabold text-zinc-400">
          <tr>
            <th className="px-4 py-3">Label</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3 text-right">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {addresses.map((row) => (
            <tr key={row.address} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 font-bold text-white">{row.label || "Account"}</td>
              <td className="px-4 py-3">
                <AccountAddress address={row.address} />
              </td>
              <td className="px-4 py-3 text-right font-extrabold text-emerald-400">
                {row.balanceSol} SOL
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

