<div align="center">

<br />

<img src="public/logos/Oxygenui.svg" alt="Oxygen UI" width="42" />

# Oxygen-UI

### Solana UI, built for the web.

A growing collection of open-source React components and frontend primitives
for building polished Solana applications faster.

<br />

[**Website ↗**](https://oxygenui.com)   ·  
[**Components ↗**](https://oxygenui.com/components)   ·  
[**GitHub ↗**](https://github.com/Subhan-code/oxygen_ui)   ·  
[**X ↗**](https://x.com/SubhanHQ)

<br />

<img src="https://img.shields.io/badge/Solana-000000?logo=solana&logoColor=00FFA3" alt="Solana" />
<img src="https://img.shields.io/badge/Next.js-0a0a0a?logo=nextdotjs&logoColor=0066FF" alt="Next.js" />
<img src="https://img.shields.io/badge/Tailwind_CSS-0a0a0a?logo=tailwindcss&logoColor=0066FF" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/TypeScript-0a0a0a?logo=typescript&logoColor=0066FF" alt="TypeScript" />
<img src="https://img.shields.io/badge/shadcn-registry-0066FF?labelColor=0a0a0a" alt="shadcn registry" />

</div>

<br />
<br />

---

## ✦ What is Oxygen?

Oxygen is a UI system for the Solana ecosystem.

Instead of rebuilding the same wallet cards, token interfaces, transaction states, portfolio views, and network experiences from scratch, Oxygen provides them as reusable components that can be dropped directly into your application.

**Designed to be:**

* **Composable** — use only what your product needs.
* **Accessible** — built as familiar React primitives.
* **Customizable** — adapt components to your own design system.
* **Developer-first** — install components directly through the shadcn registry.
* **Open source** — inspect, modify, and contribute to everything.

<br />

## ◌ Components

Oxygen is organized around the interfaces that Solana applications actually need.

| Category         | Built for                                  |
| ---------------- | ------------------------------------------ |
| **Identity**     | Wallets, accounts & user identity          |
| **Assets**       | Tokens, balances & asset displays          |
| **Transactions** | Pending, success, failed & activity states |
| **Trading**      | Swap, trade & market interfaces            |
| **Portfolio**    | Holdings, performance & dashboards         |
| **Network**      | Connection, status & chain states          |
| **Data**         | Charts, metrics & visual primitives        |

Explore the complete collection:

**[oxygenui.com/components →](https://oxygenui.com/components)**

<br />

## ⌘ Install

Oxygen works with the shadcn CLI.

Add a component directly to your project:

```bash
npx shadcn@latest add Subhan-code/oxygen_ui/{component-name}
```

For example:

```bash
npx shadcn@latest add Subhan-code/oxygen_ui/solana-wallet-card
```

The component becomes part of your codebase — ready to customize alongside the rest of your application.

<br />

## ◇ Example

```tsx
import { SolanaWalletCard } from "@/components/ui/solana-wallet-card"

export function Wallet() {
  return (
    <SolanaWalletCard
      address="7xKX...9pQ"
      balance="12.48 SOL"
    />
  )
}
```

Build your own experience on top of the primitives instead of starting from zero.

<br />

## ◎ Local development

Clone the repository and start the development server:

```bash
git clone https://github.com/Subhan-code/oxygen_ui.git

cd oxygen_ui

npm install

npm run dev
```

Components are located inside:

```text
components/ui
```

When modifying components or the registry, rebuild the registry with:

```bash
npm run registry:build
```

<br />

## ✳ Registry

Oxygen follows the shadcn registry model.

That means components aren't locked behind a package abstraction. You install the source directly into your project and have complete control over the implementation.

```text
Your App
   ↓
Oxygen Registry
   ↓
Component Source
   ↓
Your Codebase
```

No unnecessary runtime layer.
No opaque component package.
Just code you own.

<br />

## ⟡ Design

Oxygen is built around a simple principle:

> **Web3 interfaces should feel like great software first.**

The system focuses on clear hierarchy, restrained visual language, responsive interactions, and familiar product patterns — while providing the primitives needed for Solana-specific experiences.

<br />

## ♢ Design Credit

Oxygen UI's initial layout foundation was inspired by and built upon the open-source work of **[Swami Malode](https://x.com/SwamiMalode)** and **[RareUI](https://www.rareui.com/)**.

Huge thanks to Swami for open-sourcing RareUI and making the foundation available to build upon.

Oxygen has since been continuously redesigned and evolved with its own visual language, components, interactions, and direction.

<br />

## Contributing

Oxygen is open source and contributions are welcome.

Whether you're fixing a component, improving accessibility, adding a new primitive, or refining the registry, every contribution helps make the Solana frontend ecosystem better.

See **[CONTRIBUTING.md](CONTRIBUTING.md)** to get started.

<br />

## Roadmap

Oxygen is continuously evolving.

Upcoming areas include:

* More Solana-native components
* Advanced transaction flows
* Portfolio & analytics primitives
* Trading interfaces
* Improved mobile experiences
* More data visualization components
* Expanded registry coverage
* Documentation & usage examples

<br />

---

<div align="center">

<br />

<img src="public/logos/Oxygenui.svg" alt="Oxygen UI" width="32" />

### Oxygen-UI

**Open source UI primitives for Solana.**

<br />

Built by **[Syed Subhan](https://x.com/SubhanHQ)**

[Website](https://oxygenui.com)  · 
[GitHub](https://github.com/Subhan-code/oxygen_ui)  · 
[X](https://x.com/SubhanHQ)

<br />
<br />

</div>
