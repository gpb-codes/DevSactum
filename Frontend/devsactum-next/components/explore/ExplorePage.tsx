"use client"

import React, { useState } from "react"
import { Terminal, Layers, Zap, Globe, Search, TrendingUp, Users, Star, ArrowUpRight, Flame } from "lucide-react"
import { useToast } from "@/components/ui/Toast"

type FilterKey = "All" | "Rust" | "Web3" | "Backend" | "UI/UX" | "AI/ML" | "Cloud"

const FILTERS: FilterKey[] = ["All", "Rust", "Web3", "Backend", "UI/UX", "AI/ML", "Cloud"]

const FEATURED = {
  name: "Web3 Builders",
  desc: "Engineering the decentralized future with Ethereum, Solana, and Rust-based smart contracts.",
  members: "12.4k", online: "892",
  tags: ["Ethereum", "Solana", "Rust"],
  growth: "+24% este mes",
}

const TRENDING_COMMUNITIES = [
  { name: "Rustaceans",      members: "8.1k",  online: "242",  Icon: Terminal, color: "#c49aff", bg: "rgba(196,154,255,.15)", category: "Systems",  hot: true },
  { name: "Next.js Experts", members: "15.2k", online: "1.1k", Icon: Zap,      color: "#ff94a8", bg: "rgba(255,148,168,.15)", category: "Frontend", hot: false },
  { name: "Go Microservices",members: "4.2k",  online: "134",  Icon: Layers,   color: "#60a5fa", bg: "rgba(96,165,250,.12)",  category: "Backend",  hot: false },
  { name: "AI Builders",     members: "22k",   online: "2.1k", Icon: Globe,    color: "#4ade80", bg: "rgba(74,222,128,.12)",  category: "AI/ML",    hot: true },
]

const TRENDING_POSTS = [
  { rank: 1, title: "¿Son las Server Actions el fin de tRPC?", author: "@frontend_queen", engagement: "1.2k" },
  { rank: 2, title: "Rust en 2024: Por qué vale la pena el dolor", author: "@oxide_dev",     engagement: "891" },
  { rank: 3, title: "K8s vs Nomad en 2024: Decisión real",        author: "@devops_pro",     engagement: "534" },
  { rank: 4, title: "Cómo escalamos a 1M de usuarios con Next.js", author: "@jdalton_dev",  engagement: "449" },
]

const DEVS_TO_FOLLOW = [
  { name: "Sarah Chen",   handle: "@sarah_codes",  role: "Rust Expert",     initials: "SC", color: "#c49aff", bg: "rgba(196,154,255,.15)", followers: "4.2k" },
  { name: "Dev Guru",     handle: "@dev_guru",     role: "Web3 Developer",  initials: "DG", color: "#ff94a8", bg: "rgba(255,148,168,.15)", followers: "8.1k" },
  { name: "oxide_dev",    handle: "@oxide_dev",    role: "Systems Eng.",    initials: "OD", color: "#4ade80", bg: "rgba(74,222,128,.12)",  followers: "2.8k" },
]

export default function ExplorePage() {
  const { success } = useToast()
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All")
  const [joined, setJoined] = useState<Record<string, boolean>>({})
  const [followed, setFollowed] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState("")

  function handleJoin(name: string) {
    setJoined(p => ({ ...p, [name]: !p[name] }))
    if (!joined[name]) success(`Te uniste a ${name}`)
  }

  function handleFollow(handle: string) {
    setFollowed(p => ({ ...p, [handle]: !p[handle] }))
    if (!followed[handle]) success(`Siguiendo a ${handle}`)
  }

  return (
    <div className="px-6 py-6 max-w-[820px] mx-auto">

      {/* Hero */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse-slow" />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Explorar</span>
        </div>
        <h1 className="text-[42px] font-black tracking-[-2px] text-text-h leading-[1.05] mb-3">
          Encuentra tu<br />
          <span className="text-accent italic">colectivo.</span>
        </h1>
        <p className="text-[14px] text-text leading-[1.7] max-w-[420px] m-0 opacity-80">
          Conéctate con desarrolladores que construyen el futuro. Hubs especializados de expertise global.
        </p>
      </section>

      {/* Search bar */}
      <div className="flex items-center gap-2.5 bg-bg-surface border border-border rounded-[12px] px-4 py-3 mb-6">
        <Search size={15} className="text-text opacity-50 shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar comunidades, devs, temas..."
          className="bg-transparent border-none outline-none text-[13px] text-text-h w-full"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] font-bold cursor-pointer border transition-all duration-150 ${
              activeFilter === f
                ? "bg-accent text-[#1a0033] border-accent"
                : "bg-bg-surface text-text border-border hover:border-accent-border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Featured community */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Flame size={14} className="text-tertiary" strokeWidth={2} />
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Destacado</span>
        </div>
        <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-accent via-tertiary to-[#60a5fa]" />
          <div className="p-7">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-[2px] text-accent bg-accent-bg border border-accent-border px-2.5 py-1 rounded-full">
                    Crecimiento más rápido
                  </span>
                  <span className="text-[10px] text-online font-bold">{FEATURED.growth}</span>
                </div>
                <h2 className="text-[32px] font-black tracking-[-1.5px] text-text-h m-0 mb-2">{FEATURED.name}</h2>
                <p className="text-[13px] text-text leading-[1.7] max-w-[440px] m-0">{FEATURED.desc}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-5 flex-wrap">
              {FEATURED.tags.map(tag => (
                <span key={tag} className="bg-bg-hover border border-border text-text text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-5 text-[12px]">
                <div className="flex items-center gap-1.5">
                  <Users size={13} strokeWidth={2} className="text-accent" />
                  <span className="font-bold text-text-h">{FEATURED.members}</span>
                  <span className="text-text opacity-60">miembros</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-online animate-pulse-slow" />
                  <span className="font-bold text-text-h">{FEATURED.online}</span>
                  <span className="text-text opacity-60">en línea</span>
                </div>
              </div>
              <button
                onClick={() => handleJoin(FEATURED.name)}
                className={`px-7 py-2.5 rounded-[10px] text-[12px] font-extrabold cursor-pointer transition-all duration-150 border ${
                  joined[FEATURED.name]
                    ? "bg-transparent text-accent border-accent"
                    : "bg-accent text-[#1a0033] border-accent hover:opacity-85"
                }`}
              >
                {joined[FEATURED.name] ? "Unido ✓" : "Unirse al colectivo"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-[1fr_280px] gap-6">
        {/* Left */}
        <div>
          {/* Trending communities */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-accent" strokeWidth={2} />
                <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">En tendencia</span>
              </div>
              <button className="text-[11px] text-accent font-bold bg-transparent border-none cursor-pointer flex items-center gap-1">
                Ver todo <ArrowUpRight size={11} strokeWidth={2} />
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {TRENDING_COMMUNITIES.map((c, idx) => (
                <div
                  key={c.name}
                  className="bg-bg-surface border border-border rounded-[14px] p-4 flex items-center gap-4 hover:border-accent-border transition-all duration-200 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div
                    className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: c.bg, color: c.color }}
                  >
                    <c.Icon size={18} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[14px] font-bold text-text-h">{c.name}</span>
                      {c.hot && (
                        <span className="text-[9px] font-extrabold text-tertiary bg-tertiary-bg border border-[rgba(255,148,168,0.3)] px-1.5 py-0.5 rounded-full">
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-text opacity-60">
                      {c.members} miembros · <span className="text-online">{c.online} en línea</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleJoin(c.name)}
                    className={`px-4 py-1.5 rounded-[8px] text-[11px] font-bold cursor-pointer transition-all duration-150 border shrink-0 ${
                      joined[c.name]
                        ? "bg-transparent text-accent border-accent"
                        : "bg-transparent text-text border-border hover:border-accent-border hover:text-accent"
                    }`}
                  >
                    {joined[c.name] ? "Unido ✓" : "Unirse"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Trending posts */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="text-accent" strokeWidth={2} />
              <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Posts más vistos</span>
            </div>
            <div className="flex flex-col gap-2">
              {TRENDING_POSTS.map((p, idx) => (
                <div
                  key={p.rank}
                  className="flex items-center gap-3.5 py-3.5 border-b border-border cursor-pointer hover:opacity-80 transition-opacity animate-fade-in"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <span className="text-[20px] font-black text-text opacity-20 w-6 text-center shrink-0 font-mono">
                    {p.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-text-h m-0 mb-0.5 hover:text-accent transition-colors">{p.title}</p>
                    <span className="text-[11px] text-text opacity-50">{p.author}</span>
                  </div>
                  <span className="text-[11px] font-bold text-accent shrink-0">{p.engagement}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar: Suggested devs */}
        <div>
          <div className="sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Users size={14} className="text-accent" strokeWidth={2} />
              <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Seguir devs</span>
            </div>
            <div className="flex flex-col gap-3">
              {DEVS_TO_FOLLOW.map((dev, idx) => (
                <div
                  key={dev.handle}
                  className="bg-bg-surface border border-border rounded-[14px] p-4 animate-fade-in"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{ background: dev.bg, color: dev.color }}
                    >
                      {dev.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-text-h truncate">{dev.name}</div>
                      <div className="text-[10px] text-text opacity-60">{dev.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-text opacity-50">{dev.followers} seguidores</span>
                    <button
                      onClick={() => handleFollow(dev.handle)}
                      className={`px-3 py-1 rounded-[7px] text-[10px] font-bold cursor-pointer transition-all border ${
                        followed[dev.handle]
                          ? "bg-transparent text-accent border-accent"
                          : "bg-accent text-[#1a0033] border-accent hover:opacity-85"
                      }`}
                    >
                      {followed[dev.handle] ? "Siguiendo" : "Seguir"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}