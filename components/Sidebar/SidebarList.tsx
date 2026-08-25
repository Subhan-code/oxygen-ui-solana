"use client"

import React, { useRef, useState, useCallback, useEffect, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { components } from "@/lib/components"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

const RADIUS = 45
const BASE_WIDTH = 32
const MAX_WIDTH = 55

const ProximityScaleItem = memo(function ProximityScaleItem({
  component,
  index,
  isActive,
  mouseY,
  onNavigate,
  activeRef,
}: {
  component: (typeof components)[number]
  index: number
  isActive: boolean
  mouseY: MotionValue<number>
  onNavigate?: () => void
  activeRef?: React.RefObject<HTMLAnchorElement | null>
}) {
  const localRef = useRef<HTMLAnchorElement | null>(null)
  const numStr = String(index + 1).padStart(2, "0")

  const setRefs = useCallback(
    (node: HTMLAnchorElement | null) => {
      localRef.current = node
      if (isActive && activeRef) {
        (activeRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node
      }
    },
    [isActive, activeRef]
  )

  const distance = useTransform(mouseY, (y) => {
    const rect = localRef.current?.getBoundingClientRect()
    if (!rect) return RADIUS
    return y - (rect.top + rect.height / 2)
  })

  const targetWidth = useTransform(
    distance,
    [-RADIUS, 0, RADIUS],
    [BASE_WIDTH, MAX_WIDTH, BASE_WIDTH],
    { clamp: true }
  )

  const proxWidth = useSpring(targetWidth, {
    stiffness: 350,
    damping: 30,
    mass: 0.6,
  })

  return (
    <Link
      ref={setRefs}
      href={component.href}
      onClick={onNavigate}
      title={`${numStr} ${component.name}`}
      className="group relative flex h-px cursor-pointer items-center gap-3 after:absolute after:left-0 after:top-1/2 after:size-full after:-translate-y-1/2 after:p-[14px] min-w-0 max-w-full"
    >
      <motion.span
        className={`inline-block h-[1px] shrink-0 transition-colors duration-150 ${
          isActive
            ? "bg-sky-500"
            : "bg-zinc-700 dark:bg-white/20 group-hover:bg-sky-500"
        }`}
        style={{
          width: isActive ? 55 : proxWidth,
        }}
      />
      <span
        className={`truncate min-w-0 max-w-[210px] transition-all ease-out ${
          isActive
            ? "text-sky-500 opacity-100 font-semibold"
            : "opacity-70 text-zinc-300 dark:text-zinc-200 group-hover:text-sky-400 group-hover:opacity-100"
        }`}
      >
        {numStr} {component.name}
      </span>
    </Link>
  )
})

const SidebarList = ({
  onNavigate,
  isOpen,
}: {
  onNavigate?: () => void
  isOpen?: boolean
}) => {
  const pathname = usePathname()
  const [sortMode, setSortMode] = useState<"id" | "reverse">("id")
  const mouseY = useMotionValue(Infinity)
  const activeRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (isOpen && activeRef.current) {
      const timer = setTimeout(() => {
        activeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen, pathname])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      mouseY.set(e.clientY)
    },
    [mouseY]
  )

  const handlePointerLeave = useCallback(() => {
    mouseY.set(Infinity)
  }, [mouseY])

  const displayList =
    sortMode === "reverse" ? [...components].reverse() : components

  return (
    <div
      className="relative flex h-fit flex-col gap-2 pb-[15vh] pt-[16vh] w-full pr-3 select-none text-[15px] tracking-tight"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Sort button */}
      <div className="mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setSortMode((prev) => (prev === "id" ? "reverse" : "id"))
          }
          className="flex items-center justify-center gap-2 transition-colors text-zinc-500 hover:text-zinc-900 dark:text-white/50 dark:hover:text-white/80 text-sm cursor-pointer"
        >
          {sortMode === "id" ? "Sorted by Id" : "Sorted Desc"}
          <svg
            className={`transition-transform duration-300 ${
              sortMode === "reverse" ? "rotate-180" : "rotate-0"
            }`}
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* All Components header */}
      <div className="group relative flex h-px cursor-pointer items-center gap-3 after:absolute after:left-0 after:top-1/2 after:size-full after:-translate-y-1/2 after:p-[14px]">
        <span className="bg-zinc-900 dark:bg-white inline-block h-[1px] w-[32px] shrink-0" />
        <span className="whitespace-nowrap transition-all ease-out opacity-100 text-zinc-900 dark:text-white font-medium truncate">
          Solana Components
        </span>
      </div>

      {/* Gap lines */}
      <span className="bg-zinc-300 dark:bg-white/20 block h-[1px] w-[32px]" />
      <span className="bg-zinc-300 dark:bg-white/20 block h-[1px] w-[32px]" />

      {/* Component items with category headers */}
      {displayList.map((component, idx) => {
        const originalIndex = components.findIndex(
          (c) => c.href === component.href
        )
        const isActive = pathname === component.href
        const prevCategory = idx > 0 ? displayList[idx - 1].category : null
        const isNewCategory =
          sortMode === "id" &&
          component.category &&
          component.category !== prevCategory

        return (
          <React.Fragment key={component.href}>
            {isNewCategory && idx > 0 && (
              <div className="mt-4 mb-2 pt-2 border-t border-zinc-200 dark:border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-500/90 pl-1 block">
                  {component.category}
                </span>
              </div>
            )}
            <ProximityScaleItem
              component={component}
              index={originalIndex}
              isActive={isActive}
              mouseY={mouseY}
              onNavigate={onNavigate}
              activeRef={activeRef}
            />
            {idx < displayList.length - 1 && (
              <>
                <span className="bg-zinc-300 dark:bg-white/20 block h-[1px] w-[32px]" />
                <span className="bg-zinc-300 dark:bg-white/20 block h-[1px] w-[32px]" />
              </>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default SidebarList
