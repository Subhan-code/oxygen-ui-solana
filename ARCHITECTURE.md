# Oxygen UI — Architecture, Tech Stack & Codebase Documentation

> **Oxygen UI** is an open-source Solana UI library and component registry for web3 developers, supported by the **Solana Foundation India Grants** program ($7,000 USDG). It provides production-grade, Apple-crafted React primitives, micro-transitions, transaction flows, and DeFi/NFT interfaces installable directly via the shadcn CLI.

---

## Table of Contents

1. [System Overview & Purpose](#1-system-overview--purpose)
2. [Technology Stack & Core Dependencies](#2-technology-stack--core-dependencies)
3. [High-Level Architecture](#3-high-level-architecture)
4. [Directory & Project Structure](#4-directory--project-structure)
5. [Core Architectural Patterns & Methods](#5-core-architectural-patterns--methods)
   - [5.1 The Component Registry System & CLI Distribution](#51-the-component-registry-system--cli-distribution)
   - [5.2 Dynamic Lazy Rendering & Demo Cache Pipeline](#52-dynamic-lazy-rendering--demo-cache-pipeline)
   - [5.3 Squircle Geometry & Apple Design Aesthetics](#53-squircle-geometry--apple-design-aesthetics)
   - [5.4 Spring Physics, Fluid Animations & WebGL Shaders](#54-spring-physics-fluid-animations--webgl-shaders)
   - [5.5 Interactive Doc Shell & Dual-Drawer Navigation](#55-interactive-doc-shell--dual-drawer-navigation)
6. [Component Taxonomy & Domain Groups (176+ Components)](#6-component-taxonomy--domain-groups-176-components)
7. [Data Flow, State Management & Routing](#7-data-flow-state-management--routing)
8. [Performance, SEO & Build Assertions](#8-performance-seo--build-assertions)
9. [Conventions & Development Workflow](#9-conventions--development-workflow)

---

## 1. System Overview & Purpose

Solana dApps historically suffered from fragmented, boilerplate-heavy frontend code. Web3 frontend developers routinely reinvented account cards, token selectors, slippage controllers, fee priority bars, signature trackers, and transaction confirmations.

**Oxygen UI solves this by providing:**
- **Pre-built Web3 Primitives**: High-fidelity React components covering Solana identity, tokens, DEX/trading, DeFi lending, NFT marketplaces, prediction markets, and RPC infrastructure.
- **Copy-Paste & CLI Ownership**: Developers do not install a monolithic npm library; instead, they pull exact components into their own codebase via `npx shadcn@latest add Subhan-code/oxygen_ui/<component-name>`.
- **Micro-Interactions & Fluid Transitions**: Engineered with high-frequency spring physics (`motion/react`), fluid WebGL backgrounds, squircle radii, and gesture feedback (e.g., hold-to-confirm, morphing inputs, gooey menus).
- **Zero Lock-In**: Everything is pure TypeScript, Tailwind CSS v4, and Radix UI primitives.

---

## 2. Technology Stack & Core Dependencies

```
+-------------------------------------------------------------------------+
|                              OXYGEN UI                                  |
+-------------------------------------------------------------------------+
| Framework:       Next.js 15 (App Router, React 19, Server Components)  |
| Styling:         Tailwind CSS v4, CSS Variables, PostCSS                |
| Motion/Physics:  Motion (Framer Motion v12), Flubber, Easing Curves     |
| Primitives:      Radix UI (Dialog, Popover, Slider, Tabs, Collapsible)  |
| Visual Polish:   Figma-Squircle, @squircle-js/react, WebGL GLSL Shaders |
| Charts & Data:   Recharts, Lightweight-Charts, Date-fns, QR Code        |
| Distribution:    shadcn Component Registry Standard (`registry.json`)   |
| Typography:      Geist, Inter, Runde font families                      |
+-------------------------------------------------------------------------+
```

### Dependency Breakdown

| Category | Libraries / Packages | Purpose |
| :--- | :--- | :--- |
| **Framework & Runtime** | `next` (v15.5+), `react` (v19), `react-dom` (v19), `typescript` (v5.9+) | Core Next.js 15 App Router application with Server and Client Components. |
| **Styling & CSS Engine** | `tailwindcss` (v4), `@tailwindcss/postcss`, `clsx`, `tailwind-merge`, `class-variance-authority` | Atomic styling, dynamic class composition (`cn`), dark/light token architecture. |
| **Animation & Gestures** | `motion` (v12.40+), `flubber`, `react-use-measure` | Physics-based spring animations, SVG path morphing, dynamic layout measurements. |
| **Headless UI Primitives** | `@radix-ui/react-*` (Dialog, Popover, Slider, Tabs, Collapsible, Toggle, Slot, Separator), `vaul`, `cmdk` | Accessible keyboard navigation, focus management, portal rendering, command menus, iOS-style drawers. |
| **Specialized Graphics & Geometry** | `figma-squircle`, `@squircle-js/react`, custom WebGL shader pipeline (`lib/webgl.ts`) | iOS-like continuous curve corners (squircles) and GPU-accelerated interactive canvas shaders. |
| **Charts & Financials** | `recharts`, `lightweight-charts`, `qrcode`, `react-number-format` | Interactive candlestick charts, TVL area graphs, sparkbars, and animated currency formats. |
| **Icons & Notifications** | `lucide-react`, `@radix-ui/react-icons`, `@thesvg/react`, `sonner` | Crisp SVG iconography, customizable toast notifications. |
| **Analytics & Telemetry** | `@databuddy/sdk`, GitHub API REST endpoints | Star counts and privacy-friendly web analytics. |

---

## 3. High-Level Architecture

Oxygen UI operates dual-role:
1. **Interactive Showcase & Documentation Platform** (Web app running on Next.js 15).
2. **Decentralized Component Registry Distribution Hub** (Static CDN endpoints serving shadcn-compatible JSON payloads).

```
                      +-----------------------------+
                      |         End User            |
                      +--------------+--------------+
                                     |
              +----------------------+----------------------+
              |                                             |
              v                                             v
   [ Browser Navigation ]                        [ CLI / Developer ]
   https://oxygenui.com                          `npx shadcn add ...`
              |                                             |
              v                                             v
   +-----------------------+                    +-----------------------+
   | Next.js 15 App Router |                    | Registry API & Files  |
   | - Server Components   |                    | - /r/{component}.json |
   | - ISR (Cache: 1 hour) |                    | - /api/source?name=.. |
   | - JSON-LD Structured  |                    +-----------+-----------+
   +-----------+-----------+                                |
               |                                            v
               v                                +-----------------------+
   +-----------------------+                    | Injected into target  |
   | Gallery & Doc Shell   |                    | user project (/ui)    |
   | - Dual Sidebars       |                    +-----------------------+
   | - Lazy Demo Renderer  |
   | - Code Drawer / Copy  |
   +-----------------------+
```

---

## 4. Directory & Project Structure

```
oxygen_ui/
├── app/                                 # Next.js App Router root
│   ├── api/
│   │   └── source/route.ts              # API returning raw TSX code of components
│   ├── components/
│   │   ├── (docs)/                      # Component documentation route group
│   │   │   ├── [slug]/page.tsx          # Dynamic SSG page for every component
│   │   │   ├── layout.tsx               # App layout with Sidebar & Info Panel
│   │   │   └── <slug>/demo.tsx          # Isolated interactive demo per component
│   │   └── page.tsx                     # /components directory gallery overview
│   ├── docs/installation/page.tsx       # Installation & CLI usage guide
│   ├── globals.css                      # Tailwind v4 theme variables & base styles
│   ├── layout.tsx                       # Root HTML shell with ThemeProvider
│   ├── page.tsx                         # Landing homepage with hero & showcase
│   ├── robots.ts & sitemap.ts           # Dynamic SEO indexing
│   └── llms.txt/                        # Machine-readable context for AI agents
│
├── components/                          # Showcase & Shell UI Components
│   ├── Description/                     # Right drawer for props, installation, code
│   │   ├── DescriptionPanel.tsx         # Slide-over desktop drawer
│   │   ├── DescriptionContent.tsx       # Content renderer for descriptions
│   │   ├── InstallCommand.tsx           # Interactive copyable CLI command
│   │   ├── PropsTable.tsx               # Prop definitions & default values
│   │   └── SourceSection.tsx            # Live syntax-highlighted code viewer
│   ├── gallery/                         # Gallery grid and filtering
│   │   ├── ComponentsGallery.tsx        # Filterable component matrix
│   │   ├── ComponentCard.tsx            # Individual gallery item with preview
│   │   └── LiveComponentPreview.tsx     # Hover & live render controller
│   ├── preview/                         # Preview controls & customization
│   │   ├── PreviewControls.tsx          # Background color / state switcher context
│   │   └── ColorSwatches.tsx            # Theme background picker
│   ├── Sidebar/                         # Left navigation drawer
│   │   ├── DesktopShell.tsx             # Responsive 3-column desktop layout
│   │   ├── MobileShell.tsx              # Mobile drawer overlay layout
│   │   ├── Sidebar.tsx                  # Grouped navigation list
│   │   └── SidebarList.tsx              # Component search and categorization
│   ├── ui/                              # 176+ SHIPPED REGISTRY COMPONENTS
│   │   ├── account-card.tsx
│   │   ├── crypto-wallet-dashboard.tsx
│   │   ├── solana-transaction-status.tsx
│   │   ├── crypto-trading-terminal.tsx
│   │   └── ... (all primitives)
│   ├── DemoRenderer.tsx                 # Dynamic Lazy component loader with caching
│   ├── GooeyNavbar.tsx                  # Liquid gooey SVG nav with GitHub stars
│   ├── HeroIntro.tsx & HeroCta.tsx      # Landing page hero components
│   └── Footer.tsx                       # Global footer
│
├── lib/                                 # Business Logic, Utilities & Registries
│   ├── components.ts                    # Metadata, interaction docs & descriptions
│   ├── demo-registry.ts                 # Map of dynamic import loaders for demos
│   ├── groups.ts                        # 16 domain group taxonomy definitions
│   ├── registry.json                    # Canonical JSON definitions for shadcn
│   ├── registry.ts                      # Helper queries for registry items & slugs
│   ├── seo.ts                           # JSON-LD Schema generators and metadata
│   ├── site.ts                          # Site constants (URLs, titles, social links)
│   ├── webgl.ts                         # WebGL shader compiler and quad binder
│   ├── ease.ts                          # Custom bezier easing curves
│   └── utils.ts                         # `cn()` clsx + twMerge utility
│
├── public/                              # Static Assets
│   ├── r/                               # Pre-built JSON files for shadcn CLI
│   ├── logos/                           # Partner and ecosystem logos
│   └── fonts/                           # Local typography files
│
├── next.config.mjs                      # Registry validation assertions & cache headers
├── components.json                      # shadcn CLI configuration file
├── CONVENTIONS.md                       # Project coding and copy conventions
└── package.json                         # Dependencies and build scripts
```

---

## 5. Core Architectural Patterns & Methods

### 5.1 The Component Registry System & CLI Distribution
Oxygen UI implements the open **shadcn Component Registry specification**:
- All component definitions live in `components/ui/*.tsx`.
- The metadata, dependencies, and file paths are compiled into `public/r/*.json` during `npm run registry:build`.
- When a developer runs:
  ```bash
  npx shadcn@latest add Subhan-code/oxygen_ui/account-card
  ```
  The CLI fetches `https://oxygenui.com/r/account-card.json`, analyzes required dependencies (e.g., `motion`, `@radix-ui/react-dialog`), installs them, and places the component file directly into the developer's project.

### 5.2 Dynamic Lazy Rendering & Demo Cache Pipeline
In `components/DemoRenderer.tsx`, demos are loaded dynamically on demand to minimize initial JavaScript bundle sizes:
- **Module-Level Cache (`LAZY_CACHE`)**: Prevents duplicate `React.lazy` invocations during route switches.
- **Dynamic Loader Map (`lib/demo-registry.ts`)**: Statically maps component slugs to their respective demo imports.
- **Fail-Safe Error Boundaries (`DemoErrorBoundary`)**: Catches runtime render errors gracefully without crashing the whole application shell.

```typescript
const LAZY_CACHE = new Map<string, ComponentType>();

function getOrCreateLazy(slug: string): ComponentType {
  if (LAZY_CACHE.has(slug)) return LAZY_CACHE.get(slug)!;

  const loader = DEMO_LOADERS[slug];
  const LazyComp = React.lazy(() => {
    const promise = loader ? loader() : import(`@/app/components/(docs)/${slug}/demo`);
    return promise
      .then((mod) => ({ default: mod.default ?? mod.Demo ?? mod }))
      .catch(() => ({ default: () => null }));
  });

  LAZY_CACHE.set(slug, LazyComp);
  return LazyComp;
}
```

### 5.3 Squircle Geometry & Apple Design Aesthetics
Unlike standard CSS `border-radius` which creates abrupt curvature transitions, Oxygen UI employs continuous curvature (**squircles**) matching Apple's iOS / macOS design standards:
- Powered by `figma-squircle` and `@squircle-js/react`.
- Uses native `cornerShape: "squircle"` CSS attributes with fallback SVG clip paths for smooth geometric borders.

### 5.4 Spring Physics, Fluid Animations & WebGL Shaders
- **Motion v12 (`motion/react`)**: Implements real-time physics curves (e.g. `type: "spring", stiffness: 300, damping: 30`) instead of hardcoded CSS linear easings.
- **SVG Morphing (`flubber`)**: Interpolates vector SVG paths smoothly for state morphing (e.g., checkmarks, dynamic icons, status switches).
- **WebGL Shader System (`lib/webgl.ts`)**: Powers the hero background `FluidWave.tsx` using raw GLSL fragment and vertex shaders executed on a fullscreen GPU quad buffer.

### 5.5 Interactive Doc Shell & Dual-Drawer Navigation
The documentation layout (`app/components/(docs)/layout.tsx`) features a collapsible dual-drawer system:
- **Left Drawer (`Sidebar.tsx`)**: Search, filter, and navigate across all 176+ components categorized by group.
- **Center Stage (`[slug]/page.tsx`)**: High-fidelity live interactive sandbox with configurable background swatches.
- **Right Drawer (`DescriptionPanel.tsx`)**: Displays the shadcn CLI install command, component summary, full interactive props table, and live raw source code viewer with copy buttons.

---

## 6. Component Taxonomy & Domain Groups (176+ Components)

Oxygen UI categorizes components into **16 distinct domain modules** (`lib/groups.ts`):

```
+-------------------------------------------------------------------------------+
|                      OXYGEN UI COMPONENT TAXONOMY                             |
+-------------------------------------------------------------------------------+
|  1. Wallet & Identity       |  9. Inputs, Forms & Selectors                   |
|     AccountCard, AuthCard,  |     CommandPalette, LiquidRadio,                |
|     SolanaIdentityCard      |     InputMorphMessage, OTPInput                 |
|                             |                                                 |
|  2. Tokens & Assets         | 10. Feedback, Status & Notifications            |
|     TokenComboBox,          |     DynamicIslandStatus, ErrorStateShake,       |
|     TokenSafetyScore        |     NeonStatusBadge, BlueConfetti               |
|                             |                                                 |
|  3. Swap, Trade & Orders    | 11. Navigation, Layout & Overlays               |
|     CryptoTradingTerminal,  |     FamilyDrawer, FamilyPopoverMenu,            |
|     OrderBook, Leverage     |     AnimatedTabs, SmoothTabs                    |
|                             |                                                 |
|  4. DeFi Positions & Yield  | 12. Network, Security & Infra                   |
|     BorrowLendPosition,     |     RPCNodeMonitor, SecretKeyWarningBox,        |
|     YieldFarmRow, PoolTable |     SolanaNetworkHealth, GasMeter               |
|                             |                                                 |
|  5. NFTs & Collections      | 13. Engagement & Gamification                   |
|     NFTGalleryGrid,         |     AirdropClaimWidget, QuestCard,              |
|     FloorPriceTracker       |     StreakCounter, SpinCounter                  |
|                             |                                                 |
|  6. Charts & Metrics        | 14. Checkout & Commerce                         |
|     CandlestickChart, TVL,  |     CryptoCheckoutCard,                         |
|     Gauge, HeatmapChart     |     CryptoSubscriptionCard                      |
|                             |                                                 |
|  7. Predictions & Markets   | 15. Visual / Motion Primitives                  |
|     PredictionQuickGrid,    |     GlassFilter, SkeletonReveal,                |
|     CandidateCard, OddsRow  |     HealthBar                                   |
|                             |                                                 |
|  8. Buttons, Actions & Menu | 16. Transactions & Activity                     |
|     GooeyMenu, HoldToConfirm|     InstructionDecoder, TxnTable, TxnToast,     |
|     SolanaPayButton         |     SolanaTransactionStatus                     |
+-------------------------------------------------------------------------------+
```

---

## 7. Data Flow, State Management & Routing

```
               [ URL Request: /components/account-card ]
                                 │
                                 ▼
          [ Server Component: app/components/(docs)/[slug]/page.tsx ]
                                 │
              ┌──────────────────┴──────────────────┐
              ▼                                     ▼
     [ generateMetadata() ]                 [ generateStaticParams() ]
     - Reads lib/seo.ts                     - Reads lib/registry.ts (getAllSlugs)
     - Injects JSON-LD Schema               - Generates 176+ static HTML pages (SSG)
              │
              ▼
     [ Layout: SidebarShell ]
     - PreviewControlsProvider (React Context for Background / Swatch State)
     - DesktopShell / MobileShell (Responsive Drawer Layouts)
              │
              ▼
     [ Client Component: DemoRenderer ]
     - Checks LAZY_CACHE for cached loader
     - Renders isolated interactive Demo component inside ErrorBoundary
```

1. **Static Site Generation (SSG)**: All component pages are statically generated at build time via `generateStaticParams()`.
2. **Incremental Static Regeneration (ISR)**: Cached statically with `revalidate = 3600` (1 hour cache window) on the home and component index pages.
3. **Client-Side Theme & Swatch Context**: `PreviewControlsProvider` manages interactive background tones (e.g. default, dark, grid, dotted, radial) without triggering parent layout re-renders.

---

## 8. Performance, SEO & Build Assertions

### Build-Time Integrity Assertions (`next.config.mjs`)
To guarantee that no duplicate components or broken URLs ever make it to production, `next.config.mjs` executes build-time assertions verifying:
- Unique component titles.
- Unique slug identifiers.
- Unique registry item IDs.

### SEO & Discoverability Architecture (`lib/seo.ts`)
- **Structured JSON-LD Data**: Every component page automatically embeds `TechArticle` / `SoftwareSourceCode` schemas.
- **Canonical Alternates**: Configured for all dynamic and static routes.
- **Pre-rendered Sitemap & Robots**: `app/sitemap.ts` and `app/robots.ts` dynamically generate sitemaps containing all 176+ component URLs.
- **AI-Readable Endpoints (`app/llms.txt`)**: Provides structured documentation for LLMs and AI coding assistants.

---

## 9. Conventions & Development Workflow

As outlined in `CONVENTIONS.md`:

1. **Component Cleanliness & shadcn Hygiene**:
   - Every shipped component in `components/ui/*` merges styles using `cn(...)`.
   - Remaining props are spread onto the root element with `data-slot`.
   - All interactive components strictly respect the user's `prefers-reduced-motion` settings.

2. **Registry Synchronization**:
   - Any modification to `components/ui/*` or `registry.json` requires running:
     ```bash
     npm run registry:build
     ```
   - This ensures `public/r/*.json` distribution artifacts stay in exact parity.

3. **Validation Commands**:
   - TypeScript check: `npx tsc --noEmit`
   - Linter check: `npx eslint .`
   - Local dev server: `npm run dev`

---

*Authored for the Oxygen UI codebase by Syed Subhan ([@SubhanHQ](https://x.com/SubhanHQ)).*
