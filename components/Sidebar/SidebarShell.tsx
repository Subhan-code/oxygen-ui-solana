"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Sidebar from "./Sidebar"

const CONTENT_OPEN = 316

// Owns the open state so the sidebar and the content animate together: the
// panel slides in from the left while the card's left padding springs in sync,
// making the content reflow smoothly into the space the sidebar vacates.
export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="relative h-full">
      <Sidebar open={open} setOpen={setOpen} />

      <motion.div
        initial={false}
        animate={{ paddingLeft: open ? CONTENT_OPEN : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full"
      >
        <div className="relative z-0 h-full rounded-2xl bg-[#121212] p-4">{children}</div>
      </motion.div>
    </div>
  )
}
