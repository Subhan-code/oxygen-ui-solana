"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import "./transitions-showcase.css";

type Category = "All" | "Surfaces" | "Microinteractions" | "Form" | "Loading";

interface TransitionItem {
  id: string;
  number: number;
  name: string;
  category: Category;
  description: string;
  cssSnippet: string;
}

const TRANSITIONS_DATA: TransitionItem[] = [
  {
    id: "card-resize",
    number: 1,
    name: "Card resize",
    category: "Loading",
    description: "Smooth container width and height transition when layout state changes.",
    cssSnippet: `.t-resize {
  transition: width var(--resize-dur) var(--resize-ease), height var(--resize-dur) var(--resize-ease);
  will-change: width, height;
}`,
  },
  {
    id: "number-pop-in",
    number: 2,
    name: "Number pop-in",
    category: "Form",
    description: "Re-enter digits with blur and spring stagger when values change.",
    cssSnippet: `.t-number {
  transition: opacity var(--digit-dur) var(--digit-ease), transform var(--digit-dur) var(--digit-ease);
}`,
  },
  {
    id: "notification-badge",
    number: 3,
    name: "Notification badge",
    category: "Microinteractions",
    description: "Diagonal slide and spring pop-in for unread indicator badges.",
    cssSnippet: `.t-badge {
  transition: transform var(--badge-pop-dur) var(--badge-pop-ease), opacity var(--badge-fade-dur) ease;
}`,
  },
  {
    id: "text-states-swap",
    number: 4,
    name: "Text states swap",
    category: "Form",
    description: "Text swap transition in place with subtle vertical translate and blur.",
    cssSnippet: `.t-swap-item {
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out, filter 150ms ease-in-out;
}`,
  },
  {
    id: "menu-dropdown",
    number: 5,
    name: "Menu dropdown",
    category: "Surfaces",
    description: "Origin aware scale and opacity dropdown transition from trigger.",
    cssSnippet: `.t-dropdown {
  transform-origin: top center;
  transition: opacity 250ms cubic-bezier(0.22, 1, 0.36, 1), transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "modal",
    number: 6,
    name: "Modal open / close",
    category: "Surfaces",
    description: "Scale-up modal dialog with smooth backdrop fade.",
    cssSnippet: `.t-modal-content {
  transition: opacity 250ms cubic-bezier(0.22, 1, 0.36, 1), transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "panel-reveal",
    number: 7,
    name: "Panel reveal",
    category: "Surfaces",
    description: "Slide a panel into view with cross-blur interpolation.",
    cssSnippet: `.t-panel {
  transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "page-side-by-side",
    number: 8,
    name: "Page side-by-side",
    category: "Surfaces",
    description: "Directional sliding and blur transition between list and detail steps.",
    cssSnippet: `.t-page-slide {
  transition: opacity 250ms cubic-bezier(0.22, 1, 0.36, 1), transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "icon-swap",
    number: 9,
    name: "Icon swap",
    category: "Microinteractions",
    description: "Cross-fade and scale transformation between action icons.",
    cssSnippet: `.t-icon-swap {
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
}`,
  },
  {
    id: "success-check",
    number: 10,
    name: "Success check",
    category: "Microinteractions",
    description: "Confirmation icon with scale pop, vertical bob, and path checkmark.",
    cssSnippet: `.t-success-check {
  transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.34, 1.35, 0.64, 1);
}`,
  },
  {
    id: "avatar-group-hover",
    number: 11,
    name: "Avatar group hover",
    category: "Microinteractions",
    description: "Distance falloff spring lift on hovered avatar stacks.",
    cssSnippet: `.t-avatar-item {
  transition: transform 320ms cubic-bezier(0.34, 3.85, 0.64, 1);
}`,
  },
  {
    id: "error-state-shake",
    number: 12,
    name: "Error state shake",
    category: "Form",
    description: "Horizontal spring shake feedback on validation errors.",
    cssSnippet: `@keyframes t-shake-anim {
  0% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
  100% { transform: translateX(0); }
}`,
  },
  {
    id: "input-clear-dissolve",
    number: 13,
    name: "Input clear dissolve",
    category: "Form",
    description: "Fly out blur dissolve effect when clearing text inputs.",
    cssSnippet: `.t-clear-text {
  transition: opacity 400ms ease, transform 400ms ease, filter 400ms ease;
}`,
  },
  {
    id: "skeleton-reveal",
    number: 14,
    name: "Skeleton loader and reveal",
    category: "Loading",
    description: "Placeholder pulse cross-fading into loaded content.",
    cssSnippet: `.t-skeleton {
  animation: pulse 1s infinite linear;
}`,
  },
  {
    id: "shimmer-text",
    number: 15,
    name: "Shimmer text",
    category: "Loading",
    description: "Looping highlight beam across text content.",
    cssSnippet: `.t-shimmer {
  background: linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.4) 100%);
  background-size: 400% 100%;
  animation: shimmer 2s infinite linear;
}`,
  },
  {
    id: "tabs-sliding",
    number: 16,
    name: "Tabs sliding",
    category: "Loading",
    description: "Sliding pill indicator for tabbed navigation controls.",
    cssSnippet: `.t-tabs-pill {
  transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1), width 250ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "tooltip",
    number: 17,
    name: "Tooltip open/close",
    category: "Microinteractions",
    description: "Delayed scale and opacity entrance for contextual tooltips.",
    cssSnippet: `.t-tooltip {
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}`,
  },
  {
    id: "texts-reveal",
    number: 18,
    name: "Texts reveal",
    category: "Loading",
    description: "Staggered rise and blur fade-in for stacked copy lines.",
    cssSnippet: `.t-text-line {
  transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "card-tilt",
    number: 19,
    name: "Card hover tilt",
    category: "Microinteractions",
    description: "3D tilt perspective responding to cursor movement.",
    cssSnippet: `.t-card-tilt {
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "plus-menu-morph",
    number: 20,
    name: "Plus to menu morph",
    category: "Surfaces",
    description: "Morphing circular trigger button into expanded surface.",
    cssSnippet: `.t-morph-button {
  transition: width 350ms cubic-bezier(0.34, 1.25, 0.64, 1), height 350ms cubic-bezier(0.34, 1.25, 0.64, 1), border-radius 350ms ease;
}`,
  },
  {
    id: "accordion",
    number: 21,
    name: "Accordion expand",
    category: "Surfaces",
    description: "Grid height expansion with animated chevron rotation.",
    cssSnippet: `.t-accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 250ms cubic-bezier(0.22, 1, 0.36, 1);
}
.t-accordion-content.is-open {
  grid-template-rows: 1fr;
}`,
  },
  {
    id: "toast",
    number: 22,
    name: "Toast open / close",
    category: "Surfaces",
    description: "Bottom vertical spring rise for toast notifications.",
    cssSnippet: `.t-toast {
  transition: opacity 350ms cubic-bezier(0.22, 1, 0.36, 1), transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "like-button",
    number: 23,
    name: "Like button",
    category: "Microinteractions",
    description: "Pop scale animation with heart fill when toggling like.",
    cssSnippet: `.t-like-icon {
  transition: transform 350ms cubic-bezier(0.34, 1.96, 0.64, 1), fill 150ms ease;
}`,
  },
  {
    id: "learn-more-hover",
    number: 24,
    name: "Learn more hover",
    category: "Microinteractions",
    description: "Horizontal chevron shift and arm expansion on link hover.",
    cssSnippet: `.t-learn-more:hover .t-learn-arrow {
  transform: translateX(2px);
}`,
  },
  {
    id: "checkbox-check",
    number: 25,
    name: "Checkbox check",
    category: "Microinteractions",
    description: "Background fill followed by stroke draw checkmark.",
    cssSnippet: `.t-checkbox-path {
  transition: stroke-dashoffset 350ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
  },
  {
    id: "spinning-counter",
    number: 26,
    name: "Spinning counter",
    category: "Form",
    description: "Slot machine digit reels with motion blur physics.",
    cssSnippet: `.t-reel-cell {
  transition: transform 1400ms cubic-bezier(0.16, 1, 0.3, 1);
}`,
  },
  {
    id: "toggle",
    number: 27,
    name: "Toggle",
    category: "Microinteractions",
    description: "Double bounce spring travel for switch thumb handles.",
    cssSnippet: `.t-toggle-thumb {
  transition: transform 350ms cubic-bezier(0.34, 1.35, 0.64, 1);
}`,
  },
];

export default function TransitionsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCodeId, setActiveCodeId] = useState<string | null>(null);

  // Demo interactive states
  const [isResized, setIsResized] = useState(false);
  const [numberVal, setNumberVal] = useState(42);
  const [hasBadge, setHasBadge] = useState(true);
  const [swapState, setSwapState] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [pageSide, setPageSide] = useState<"A" | "B">("A");
  const [iconSwapped, setIconSwapped] = useState(false);
  const [successChecked, setSuccessChecked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [clearText, setClearText] = useState("Transitions.dev");
  const [skeletonLoaded, setSkeletonLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [morphOpen, setMorphOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [toggleOn, setToggleOn] = useState(false);

  const categories: Category[] = [
    "All",
    "Surfaces",
    "Microinteractions",
    "Form",
    "Loading",
  ];

  const filteredTransitions = TRANSITIONS_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyCSS = (id: string, css: string) => {
    navigator.clipboard.writeText(css);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header controls & filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search transitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-border bg-card px-3.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Grid of 27 transitions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTransitions.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-5 shadow-sm transition-all hover:border-border hover:shadow-md"
          >
            {/* Card top details */}
            <div className="flex items-start justify-between gap-2 pb-4">
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  #{String(item.number).padStart(2, "0")} • {item.category}
                </span>
                <h3 className="font-runde text-base font-semibold text-foreground">
                  {item.name}
                </h3>
              </div>
              <button
                onClick={() => copyCSS(item.id, item.cssSnippet)}
                className="rounded-xl border border-border/80 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                {copiedId === item.id ? "Copied!" : "Copy CSS"}
              </button>
            </div>

            {/* Stage / Interactive Demo */}
            <div className="relative flex min-h-[160px] w-full items-center justify-center rounded-2xl border border-border/40 bg-muted/30 p-4 overflow-hidden">
              {item.id === "card-resize" && (
                <div
                  onClick={() => setIsResized(!isResized)}
                  className={cn(
                    "t-resize flex cursor-pointer items-center justify-center rounded-2xl bg-card border border-border p-4 shadow-sm text-xs font-medium text-foreground",
                    isResized ? "h-28 w-56" : "h-16 w-36"
                  )}
                >
                  Click to resize
                </div>
              )}

              {item.id === "number-pop-in" && (
                <div className="flex flex-col items-center gap-2">
                  <span className="t-swap-item font-mono text-3xl font-bold tracking-tight text-foreground">
                    {numberVal}
                  </span>
                  <button
                    onClick={() => setNumberVal((v) => v + Math.floor(Math.random() * 10) + 1)}
                    className="rounded-xl bg-card px-3 py-1 text-xs font-medium border border-border text-foreground hover:bg-muted"
                  >
                    Increment
                  </button>
                </div>
              )}

              {item.id === "notification-badge" && (
                <div className="relative inline-flex">
                  <button
                    onClick={() => setHasBadge(!hasBadge)}
                    className="rounded-2xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground"
                  >
                    Toggle Badge
                  </button>
                  {hasBadge && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-blue-600 ring-2 ring-background" />
                  )}
                </div>
              )}

              {item.id === "text-states-swap" && (
                <button
                  onClick={() => setSwapState(!swapState)}
                  className="rounded-2xl border border-border bg-card px-5 py-2.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <span className={cn("t-swap-item inline-block", swapState && "is-hidden")}>
                    {swapState ? "Saving..." : "Save Changes"}
                  </span>
                </button>
              )}

              {item.id === "menu-dropdown" && (
                <div className="relative flex flex-col items-center">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="rounded-2xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground"
                  >
                    Options ▾
                  </button>
                  <div
                    className={cn(
                      "t-dropdown absolute top-10 z-10 w-36 rounded-2xl border border-border bg-card p-2 shadow-lg",
                      !dropdownOpen && "is-closed"
                    )}
                  >
                    <div className="rounded-xl px-3 py-1.5 text-xs hover:bg-muted cursor-pointer text-foreground">
                      Edit
                    </div>
                    <div className="rounded-xl px-3 py-1.5 text-xs hover:bg-muted cursor-pointer text-foreground">
                      Duplicate
                    </div>
                  </div>
                </div>
              )}

              {item.id === "modal" && (
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="rounded-2xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground"
                  >
                    Open Modal
                  </button>
                  {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                      <div className="t-modal-content w-full max-w-xs rounded-3xl border border-border bg-card p-6 shadow-xl text-center">
                        <h4 className="font-semibold text-foreground text-sm">Modal Title</h4>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Smooth scale up and backdrop fade transition.
                        </p>
                        <button
                          onClick={() => setModalOpen(false)}
                          className="mt-4 w-full rounded-2xl bg-primary py-2 text-xs font-medium text-primary-foreground"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {item.id === "panel-reveal" && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => setPanelOpen(!panelOpen)}
                    className="rounded-2xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground"
                  >
                    {panelOpen ? "Hide Panel" : "Reveal Panel"}
                  </button>
                  <div
                    className={cn(
                      "t-panel absolute inset-x-2 bottom-2 rounded-2xl border border-border bg-card p-3 shadow-md text-xs text-foreground",
                      !panelOpen && "is-closed"
                    )}
                  >
                    Revealed details panel with vertical translate and blur.
                  </div>
                </div>
              )}

              {item.id === "page-side-by-side" && (
                <div className="flex flex-col items-center gap-3 w-full max-w-xs">
                  <div className="relative w-full h-16 overflow-hidden rounded-2xl border border-border bg-card p-3 flex items-center justify-center">
                    <div
                      className={cn(
                        "t-page-slide absolute text-xs font-medium text-foreground",
                        pageSide === "B" && "is-hidden-left"
                      )}
                    >
                      Step 1: List View
                    </div>
                    <div
                      className={cn(
                        "t-page-slide absolute text-xs font-medium text-foreground",
                        pageSide === "A" && "is-hidden-right"
                      )}
                    >
                      Step 2: Detail View
                    </div>
                  </div>
                  <button
                    onClick={() => setPageSide(pageSide === "A" ? "B" : "A")}
                    className="rounded-xl border border-border bg-card px-3 py-1 text-xs text-foreground"
                  >
                    Switch Page ({pageSide})
                  </button>
                </div>
              )}

              {item.id === "icon-swap" && (
                <button
                  onClick={() => setIconSwapped(!iconSwapped)}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-foreground"
                >
                  <span className={cn("t-icon-swap", iconSwapped && "is-hidden")}>
                    {iconSwapped ? "★" : "☆"}
                  </span>
                </button>
              )}

              {item.id === "success-check" && (
                <button
                  onClick={() => setSuccessChecked(!successChecked)}
                  className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground"
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] transition-transform",
                      successChecked ? "scale-110" : "scale-90 opacity-40"
                    )}
                  >
                    ✓
                  </span>
                  {successChecked ? "Confirmed!" : "Click to Confirm"}
                </button>
              )}

              {item.id === "avatar-group-hover" && (
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((initial, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold text-foreground transition-transform hover:-translate-y-2 hover:scale-110 hover:z-10"
                    >
                      {initial}
                    </div>
                  ))}
                </div>
              )}

              {item.id === "error-state-shake" && (
                <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                  <input
                    type="text"
                    readOnly
                    value="invalid@email"
                    className={cn(
                      "w-full rounded-2xl border border-red-500/50 bg-card px-3 py-2 text-xs text-foreground text-center",
                      isShaking && "t-shake-active"
                    )}
                  />
                  <button
                    onClick={() => {
                      setIsShaking(true);
                      setTimeout(() => setIsShaking(false), 400);
                    }}
                    className="rounded-xl border border-border bg-card px-3 py-1 text-xs text-foreground"
                  >
                    Trigger Shake Error
                  </button>
                </div>
              )}

              {item.id === "input-clear-dissolve" && (
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-1.5">
                  <span className="text-xs text-foreground">{clearText || "Empty"}</span>
                  {clearText && (
                    <button
                      onClick={() => setClearText("")}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  )}
                  {!clearText && (
                    <button
                      onClick={() => setClearText("Transitions.dev")}
                      className="text-[10px] text-primary"
                    >
                      Reset
                    </button>
                  )}
                </div>
              )}

              {item.id === "skeleton-reveal" && (
                <div className="flex flex-col items-center gap-3 w-full max-w-xs">
                  <div className="w-full h-12 rounded-2xl border border-border bg-card p-3 flex items-center justify-center">
                    {!skeletonLoaded ? (
                      <div className="h-4 w-3/4 rounded-md bg-muted animate-pulse" />
                    ) : (
                      <span className="text-xs font-medium text-foreground">Content loaded cleanly!</span>
                    )}
                  </div>
                  <button
                    onClick={() => setSkeletonLoaded(!skeletonLoaded)}
                    className="rounded-xl border border-border bg-card px-3 py-1 text-xs text-foreground"
                  >
                    Toggle Loaded State
                  </button>
                </div>
              )}

              {item.id === "shimmer-text" && (
                <div className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold tracking-wide">
                  <span className="t-shimmer">SHIMMERING TEXT</span>
                </div>
              )}

              {item.id === "tabs-sliding" && (
                <div className="relative flex rounded-2xl border border-border bg-muted p-1 text-xs font-medium">
                  {["Overview", "Features", "Settings"].map((label, idx) => (
                    <button
                      key={label}
                      onClick={() => setActiveTab(idx)}
                      className={cn(
                        "relative z-10 rounded-xl px-3 py-1.5 transition-colors",
                        activeTab === idx ? "text-foreground font-semibold" : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                  <div
                    className="absolute top-1 bottom-1 rounded-xl bg-card shadow-xs transition-all duration-200"
                    style={{
                      left: `${activeTab * 33.3 + 1}%`,
                      width: "32%",
                    }}
                  />
                </div>
              )}

              {item.id === "tooltip" && (
                <div className="group relative">
                  <button className="rounded-2xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground">
                    Hover Me
                  </button>
                  <div className="absolute left-1/2 -top-9 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-xl bg-foreground px-2.5 py-1 text-[10px] font-medium text-background pointer-events-none whitespace-nowrap">
                    Tooltip label
                  </div>
                </div>
              )}

              {item.id === "texts-reveal" && (
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-sm font-bold tracking-tight text-foreground">
                    Staggered Heading
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Supporting descriptive subtitle line
                  </span>
                </div>
              )}

              {item.id === "card-tilt" && (
                <div className="t-card-tilt group cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-sm hover:rotate-1 hover:scale-105 transition-transform">
                  <div className="text-xs font-semibold text-foreground">3D Card Tilt</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Hover to feel perspective</div>
                </div>
              )}

              {item.id === "plus-menu-morph" && (
                <div className="relative">
                  <button
                    onClick={() => setMorphOpen(!morphOpen)}
                    className={cn(
                      "t-resize flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-all",
                      morphOpen ? "h-24 w-36 rounded-2xl p-3 flex-col items-start justify-between" : "h-10 w-10"
                    )}
                  >
                    {!morphOpen ? (
                      "+"
                    ) : (
                      <div className="w-full text-xs text-left">
                        <div className="font-semibold">Expanded Menu</div>
                        <div className="text-[10px] opacity-80 mt-1">Click to collapse</div>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {item.id === "accordion" && (
                <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-3">
                  <button
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    className="flex w-full items-center justify-between text-xs font-semibold text-foreground"
                  >
                    <span>Accordion Section</span>
                    <span className={cn("transition-transform", accordionOpen && "rotate-180")}>
                      ▾
                    </span>
                  </button>
                  <div className={cn("t-accordion-content mt-2 text-xs text-muted-foreground", accordionOpen && "is-open")}>
                    <div className="t-accordion-inner pt-1">
                      Expandable accordion details panel.
                    </div>
                  </div>
                </div>
              )}

              {item.id === "toast" && (
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setToastOpen(!toastOpen)}
                    className="rounded-2xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground"
                  >
                    {toastOpen ? "Dismiss Toast" : "Show Toast"}
                  </button>
                  {toastOpen && (
                    <div className="mt-3 rounded-2xl border border-border bg-foreground px-4 py-2 text-xs text-background shadow-lg">
                      Toast message notification!
                    </div>
                  )}
                </div>
              )}

              {item.id === "like-button" && (
                <button
                  onClick={() => setLiked(!liked)}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-lg transition-transform active:scale-125"
                >
                  <span className={cn("transition-colors", liked ? "text-red-500" : "text-muted-foreground")}>
                    {liked ? "♥" : "♡"}
                  </span>
                </button>
              )}

              {item.id === "learn-more-hover" && (
                <a
                  href="#learn"
                  onClick={(e) => e.preventDefault()}
                  className="t-learn-more inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Learn more</span>
                  <span className="t-learn-arrow text-sm">→</span>
                </a>
              )}

              {item.id === "checkbox-check" && (
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="h-5 w-5 rounded-lg border-border accent-primary"
                  />
                  <span className="text-xs font-medium text-foreground">
                    {checked ? "Checked" : "Unchecked"}
                  </span>
                </label>
              )}

              {item.id === "spinning-counter" && (
                <div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-2 font-mono text-xl font-bold text-foreground">
                  <span>9</span>
                  <span>9</span>
                  <span className="text-primary">%</span>
                </div>
              )}

              {item.id === "toggle" && (
                <button
                  onClick={() => setToggleOn(!toggleOn)}
                  className={cn(
                    "flex h-7 w-12 items-center rounded-full p-1 transition-colors",
                    toggleOn ? "bg-primary" : "bg-muted border border-border"
                  )}
                >
                  <div
                    className={cn(
                      "t-toggle-thumb h-5 w-5 rounded-full bg-white shadow-xs",
                      toggleOn && "is-on"
                    )}
                  />
                </button>
              )}
            </div>

            {/* Description & view snippet */}
            <div className="pt-3">
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <button
                onClick={() => setActiveCodeId(activeCodeId === item.id ? null : item.id)}
                className="mt-2 text-[11px] font-medium text-primary hover:underline"
              >
                {activeCodeId === item.id ? "Hide CSS rules" : "View CSS rules"}
              </button>

              {activeCodeId === item.id && (
                <pre className="mt-2 max-h-36 overflow-x-auto rounded-xl bg-muted p-2.5 font-mono text-[10px] text-muted-foreground">
                  <code>{item.cssSnippet}</code>
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
