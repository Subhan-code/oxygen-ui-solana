"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimate } from "motion/react"
import { cn } from "@/lib/utils"

export type BounceSidebarProps = {
  items: string[]
  value?: number
  defaultValue?: number
  onChange?: (index: number) => void
  dotColor?: string
  className?: string
}

export function BounceSidebar({
  items,
  value,
  defaultValue = 0,
  onChange,
  dotColor = "#FC4C01",
  className,
}: BounceSidebarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const activeIndex = value ?? internalValue

  const [dot, animate] = useAnimate<HTMLSpanElement>()
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const prevY = useRef<number | null>(null)


  const [dotSize, setDotSize] = useState(6)
  useEffect(() => {
    const dpr = window.devicePixelRatio || 1
    setDotSize(Math.round(6 * dpr) / dpr)
  }, [])

  useEffect(() => {
    const el = itemRefs.current[activeIndex]
    if (!el || !dot.current) return


    const dpr = window.devicePixelRatio || 1
    const toY =
      Math.round((el.offsetTop + el.offsetHeight / 2 - dotSize / 2) * dpr) / dpr

    if (prevY.current === null) {
      animate(dot.current, { x: 0, y: toY }, { duration: 0 })
      prevY.current = toY
      return
    }

    const fromY = prevY.current
    const delta = toY - fromY
    prevY.current = toY
    if (delta === 0) return

    const radius = Math.min(Math.abs(delta) / 2, 8)
    const steps = 20
    const x: number[] = []
    const y: number[] = []
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      y.push(fromY + (delta * (1 - Math.cos(Math.PI * t))) / 2)
      x.push(-radius * Math.sin(Math.PI * t))
    }

    animate(dot.current, { x, y }, { duration: 0.25, ease: "easeOut" })
  }, [activeIndex, animate, dot, dotSize])

  const select = (index: number) => {
    if (value === undefined) setInternalValue(index)
    onChange?.(index)
  }

  return (
    <ul className={cn("relative flex flex-col gap-1 pl-6", className)}>
      <span
        ref={dot}
        aria-hidden
        className="absolute left-2 top-0 rounded-full"
        style={{ width: dotSize, height: dotSize, backgroundColor: dotColor }}
      />

      {items.map((item, index) => (
        <li
          key={item}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
        >
          <motion.button
            type="button"
            onClick={() => select(index)}
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.5 }}
            className={cn(
              "flex w-full cursor-pointer items-center rounded-lg p-1 text-left text-sm transition-colors duration-200",
              index === activeIndex ? "text-foreground" : "text-foreground/55",
            )}
          >
            {item}
          </motion.button>
        </li>
      ))}
    </ul>
  )
}
