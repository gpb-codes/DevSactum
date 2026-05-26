"use client"

/**
 * Sidebar.tsx — Right-side contextual panel (desktop only)
 * Usado como panel secundario en páginas como Feed.
 * La navegación principal está en Navbar.tsx.
 */

import React from "react"
import { TrendingUp, Users, Flame, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const TRENDING = [
  { tag: "#Rust",        posts: "2.4k posts" },
  { tag: "#NextJS",      posts: "1.8k posts" },
  { tag: "#WebAssembly", posts: "943 posts"  },
  { tag: "#AI",          posts: "8.1k posts" },
  { tag: "#TypeScript",  posts: "3.2k posts" },
]

const ACTIVE_DEVS = [
  { initials: "JD", name: "James Dalton",   role: "Rust / Systems",  color: "#c49aff", bg: "rgba(196,154,255,.15)", online: true  },
  { initials: "ER", name: "Elena Rivera",   role: "UI / Design",     color: "#ff94a8", bg: "rgba(255,148,168,.15)", online: true  },
  { initials: "SK", name: "Soren K.",       role: "Backend / Go",    color: "#60a5fa", bg: "rgba(96,165,250,.12)",  online: false },
  { initials: "MR", name: "María R.",       role: "Open Source",     color: "#4ade80", bg: "rgba(74,222,128,.12)",  online: true  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn(
      "w-[240px] shrink-0 border-l border-border bg-bg-surface hidden xl:flex flex-col gap-0 overflow-y-auto",
      className
    )}>

      {/* Trending tags */}
      <section className="px-5 py-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={13} className="text-accent" strokeWidth={2} />
            <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text opacity-60">
              Tendencias
            </span>
          </div>
          <button className="bg-transparent border-none cursor-pointer text-accent text-[10px] font-bold flex items-center gap-0.5">
            Ver todo <ArrowUpRight size={10} strokeWidth={2} />
          </button>
        </div>

        <ul className="list-none m-0 p-0 flex flex-col gap-1">
          {TRENDING.map((t, i) => (
            <li key={t.tag}>
              <button className="w-full flex items-center justify-between px-2.5 py-2 rounded-[8px] bg-transparent border-none cursor-pointer hover:bg-bg-hover transition-colors duration-150 group">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-text-h group-hover:text-accent transition-colors">
                    {t.tag}
                  </span>
                </div>
                <span className="text-[10px] text-text opacity-50">{t.posts}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Active devs */}
      <section className="px-5 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Flame size={13} className="text-tertiary" strokeWidth={2} />
          <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text opacity-60">
            Activos ahora
          </span>
        </div>

        <ul className="list-none m-0 p-0 flex flex-col gap-2">
          {ACTIVE_DEVS.map(dev => (
            <li key={dev.name}>
              <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-[9px] bg-transparent border-none cursor-pointer hover:bg-bg-hover transition-colors text-left group">
                <div className="relative shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: dev.bg, color: dev.color }}
                  >
                    {dev.initials}
                  </div>
                  <div
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg-surface"
                    style={{ background: dev.online ? "var(--color-online)" : "#4b5563" }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-bold text-text-h truncate group-hover:text-accent transition-colors">
                    {dev.name}
                  </div>
                  <div className="text-[10px] text-text opacity-50 truncate">{dev.role}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 mt-4 px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-online animate-pulse-slow" />
          <span className="text-[10px] text-text opacity-50">124 devs en línea</span>
        </div>
      </section>
    </aside>
  )
}

export default Sidebar