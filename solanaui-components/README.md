# Solana UI Standalone Components

This folder contains the complete, single-file versions of all **29 Solana UI components**.

## Features

- **100% Self-Contained**: Every `.tsx` file contains all necessary internal child sub-components, types, and logic inline.
- **Zero Sub-component Dependencies**: You can copy any single `.tsx` file into your project without needing external child component files.

## Files Included

| Component File | Description |
|----------------|-------------|
| `swap-box.tsx` | Full token swap card (inlines TokenInput, TokenCombobox, TokenIcon, DetailRow) |
| `trade-box.tsx` | Perpetual/margin trading box (inlines LeverageSlider, TradeButtons, TokenInput, DetailRow) |
| `position-table.tsx` | Positions table with TP/SL dialogs & close position modal (inlines ActionBox, OrderForm, TokenIcon, sort helpers) |
| `pool-card.tsx` | Liquidity pool card (inlines SparklineChart, TokenIconGroup, TokenIcon) |
| `pool-table.tsx` | Liquidity pool comparison table (inlines TokenIconGroup, TokenIcon, sort helpers) |
| `action-box.tsx` | Deposit / Withdraw action box (inlines TokenInput, TokenCombobox, TokenIcon, DetailRow) |
| `token-input.tsx` | Token input field (inlines TokenCombobox, TokenIcon) |
| `wallet-sheet.tsx` | Wallet drawer / modal (inlines AddressDisplay, TokenIcon) |
| `stat-card.tsx` | Metric stat card (inlines TrendBadge) |
| `activity-feed.tsx` | Recent activity list (inlines TokenIcon) |
| `position-card.tsx` | Position summary card (inlines TokenIcon) |
| `txn-table.tsx` | Transaction history table (inlines TokenIcon) |
| `token-combobox.tsx` | Token selector dropdown (inlines TokenIcon) |
| `token-command.tsx` | Token command palette dialog (inlines TokenIcon) |
| `token-icon-group.tsx` | Overlapping token icon stack (inlines TokenIcon) |
| `order-form.tsx` | TP/SL order parameter form (inlines DetailRow) |
| `auth-card.tsx` | Wallet authentication card |
| `health-bar.tsx` | Position health factor progress bar |
| `leverage-slider.tsx` | Leverage multiplier slider |
| `nft-card.tsx` | NFT preview card |
| `order-book.tsx` | Order book bid/ask display |
| `price-chart.tsx` | Interactive price chart |
| `sparkline-chart.tsx` | Mini inline trend chart |
| `token-icon.tsx` | Async token icon with fallback & loading skeleton |
| `trade-buttons.tsx` | Long / Short side toggle buttons |
| `trade-chart.tsx` | Lightweight-charts trading chart |
| `trend-badge.tsx` | Percentage change badge (+ / -) |
| `txn-toast.tsx` | Solana transaction toast notification |
| `address-display.tsx` | Wallet address with truncation & copy button |
| `utils.ts` | Shared `cn()` helper (`clsx` + `tailwind-merge`) |

## Quick Usage

1. Copy any `.tsx` component file into your project.
2. Ensure you have the `cn()` helper in your project (or copy `utils.ts`).
3. Ensure base UI primitives exist in your `@/components/ui/` directory (`button`, `card`, `input`, `dialog`, etc.).
