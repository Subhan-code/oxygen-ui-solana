"use client"

import React, { useState } from "react"
import { Plane, Bell, Shield, Moon } from "lucide-react"
import { AnimatedSwitch } from "@/components/ui/animated-switch"

export default function Demo() {
  const [airplane, setAirplane] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkShield, setDarkShield] = useState(true)

  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-8 p-6 max-w-sm mx-auto transition-all duration-300">
      <div className="flex flex-col gap-4 w-full p-6 rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark: shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Plane className="h-4 w-4 text-sky-500" />
            <span className="text-sm font-medium">Airplane Mode</span>
          </div>
          <AnimatedSwitch checked={airplane} onCheckedChange={setAirplane} />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
          <div className="flex items-center gap-2.5">
            <Bell className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">Push Alerts</span>
          </div>
          <AnimatedSwitch checked={notifications} onCheckedChange={setNotifications} />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
          <div className="flex items-center gap-2.5">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium">Biometric Lock</span>
          </div>
          <AnimatedSwitch checked={darkShield} onCheckedChange={setDarkShield} />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-4 opacity-50">
          <div className="flex items-center gap-2.5">
            <Moon className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Disabled Toggle</span>
          </div>
          <AnimatedSwitch disabled checked={false} />
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Press down and hold on the thumb to preview spring deformation, or toggle to trigger smooth layout physics.
      </p>
    </div>
  )
}
