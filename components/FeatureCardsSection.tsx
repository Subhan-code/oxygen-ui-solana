"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

const springTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 28,
};

const BLOG_POSTS = [
  {
    title: "Building Frontends for the Post-RPC Era",
    readTime: "4 min read",
    image: "/assets/exa-statue-1.jpg",
    href: "/docs/installation",
  },
  {
    title: "Designing Apple-Grade Web3 Interfaces",
    readTime: "6 min read",
    image: "/assets/exa-statue-2.jpg",
    href: "/components",
  },
  {
    title: "Scaling Solana Frontends with UI Primitives",
    readTime: "5 min read",
    image: "/assets/exa-statue-3.jpg",
    href: "/components",
  },
];

export default function FeatureCardsSection() {
  return (
    <section className="relative w-full px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Section title header */}
        <div className="mb-6 flex items-center justify-between border-b border-black/[0.08] pb-4 dark:border-white/10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-sky-500 dark:text-sky-400">
              Insights &amp; Guides
            </span>
            <h2 className="mt-2.5 font-runde text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Latest Solana UI Engineering Blogs
            </h2>
          </div>
          <span className="hidden font-mono text-xs font-semibold text-slate-500 dark:text-zinc-400 sm:inline-block">
            BLOGS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <Link key={index} href={post.href}>
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={springTransition}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border border-black/[0.06] bg-[#F5F5F7] text-slate-900 shadow-xl backdrop-blur-2xl transition-all dark:border-white/12 dark:bg-[#121216] dark:text-white dark:shadow-2xl cursor-pointer"
                style={{ cornerShape: "squircle" } as React.CSSProperties}
              >
                {/* Top Electric Blue Image Banner */}
                <div className="relative h-[190px] w-full overflow-hidden bg-[#003ED0] sm:h-[210px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Bottom Card Body */}
                <div className="flex h-[140px] flex-col justify-between p-5">
                  <h3 className="font-runde text-lg font-bold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-xl">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between border-t border-black/[0.06] pt-3 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <img
                        src="/logos/Oxygenui.svg"
                        alt="Oxygen-UI"
                        className="h-4.5 w-4.5 drop-shadow-xs"
                      />
                      <span className="font-runde text-xs font-bold tracking-tight text-slate-900 dark:text-white">
                        Oxygen-UI
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
