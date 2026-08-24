"use client";

import React, { useState } from "react";
import {
  HomeIcon,
  GearIcon,
  MagnifyingGlassIcon,
  EnvelopeClosedIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const TABS = [
  { icon: HomeIcon, label: "Home" },
  { icon: GearIcon, label: "Settings" },
  { icon: MagnifyingGlassIcon, label: "Search" },
  { icon: EnvelopeClosedIcon, label: "Messages" },
  { icon: HeartIcon, label: "Favorites" },
];

const linePath = "M0,40 Q172,10 344,40";
const motionPath = `path("M0,40 Q172,10 344,40")`;
const motionHorizontalPadding = 12;

export function CurvedTabBar({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(1);
  const offsetDistance = `${
    motionHorizontalPadding +
    (activeTab / (TABS.length - 1)) * (100 - motionHorizontalPadding * 2)
  }%`;

  return (
    <div className={cn("relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden select-none", className)}>
      <div
        className="relative -mt-[150%] w-full overflow-hidden bg-zinc-900 sm:-mt-[100%] border border-zinc-800"
        style={{
          height: "704px",
          borderRadius: "54px",
          width: "344px",
          boxShadow: "0 0 0 12px #000000",
        }}
      >
        <div className="absolute bottom-0 flex h-[100px] w-full flex-col justify-between overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="344"
            height="50"
            preserveAspectRatio="none"
            viewBox="0 0 344 50"
          >
            <path
              d={linePath}
              fill="none"
              className="stroke-zinc-700"
              strokeWidth="1"
            />
          </svg>
          <motion.div
            style={{
              width: "40px",
              height: "4px",
              borderRadius: "4px",
              position: "absolute",
              left: 0,
              bottom: "calc(50% - 4px)",
              background: "white",
              boxShadow: "rgba(255, 255, 255, 0.4) 0px 0px 20px 10px",
              zIndex: 10,
              offsetPath: motionPath,
            }}
            initial={{
              offsetDistance: "0%",
            }}
            animate={{
              offsetDistance,
            }}
            transition={{
              duration: 0.6,
              ease: [0.32, 0.72, 0, 1] as const,
            }}
          />
          {TABS.map((tab, index) => {
            const tabDistance = `${
              motionHorizontalPadding +
              (index / (TABS.length - 1)) * (100 - motionHorizontalPadding * 2)
            }%`;
            const Icon = tab.icon;

            return (
              <button
                key={index}
                type="button"
                className="absolute p-5 cursor-pointer outline-none active:scale-95 transition-transform"
                style={{
                  offsetPath: motionPath,
                  offsetDistance: tabDistance,
                  top: "28%",
                }}
                onClick={() => setActiveTab(index)}
              >
                <Icon className="h-5 w-5 text-white" />
              </button>
            );
          })}
          <div
            className="pointer-events-none relative z-10 overflow-hidden"
            style={{
              filter: "drop-shadow(rgba(0,0,0, 0.5) 0px 3px 10px)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="344"
              height="50"
              preserveAspectRatio="none"
              viewBox="0 0 344 50"
            >
              <path
                d="M 0 40 Q 172 10 344 40 V 68 L 0 68 L 0 40"
                className="fill-zinc-900"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurvedTabBar;
