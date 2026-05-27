"use client"

import React, { useState } from "react"
import {
  Terminal, Layers, Zap, Globe, Search, TrendingUp,
  Users, Star, ArrowUpRight, Database, Shield, Activity,
} from "lucide-react"
import { Card }   from "@/src/components/ui/Card"
import { Badge }  from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Avatar } from "@/src/components/ui/Avatar"
import { useToast } from "@/src/components/ui/Toast"

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterKey = "All" | "Rust" | "Web3" | "Backend" | "UI/UX" | "AI/ML" | "Cloud"

// ─── Static data ──────────────────────────────────────────────────────────────
const FILTERS: FilterKey[] = ["All", "Rust", "Web3", "Backend", "UI/UX", "AI/ML", "Cloud"]

const TRENDING_REPOS = [
  { Icon: Terminal, name: "flux-core/runtime",  desc: "High-performance reactive runtime for distributed edge nodes.",          stars: "12.4k", tags: ["Rust", "Wasm"], color: "#c49aff", bg: "rgba(196,154,255,0.12)" },
  { Icon: Database, name: "vector-db-next",     desc: "Semantic search engine with native GPU acceleration.",                   stars: "8.9k",  tags: ["C++", "CUDA"],  color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  { Icon: Shield,   name: "zero-trust-proxy",   desc: "Lightweight sidecar proxy for secure microservices communication.",      stars: "5.2k",  tags: ["Go"],           color: "#4ade80", bg: "rgba(74,222,128,0.12)"  },
  { Icon: Zap,      name: "lumina-engine",       desc: "Async Wasm runtime optimised for edge cold-start latency.",             stars: "4.1k",  tags: ["Rust", "Edge"], color: "#ff94a8", bg: "rgba(255,148,168,0.12)" },
]

const TOPIC_CLOUD = [
  { label: "WebAssembly",  size: "text-[38px]", weight: "font-black",     accent: true  },
  { label: "GraphQL",      size: "text-[20px]", weight: "font-medium",    accent: false },
  { label: "Kubernetes",   size: "text-[26px]", weight: "font-extrabold", accent: false },
  { label: "Zk-Proofs",    size: "text-[17px]", weight: "font-light",     accent: false },
  { label: "Rust-Lang",    size: "text-[32px]", weight: "font-bold",      accent: false },
  { label: "Terraform",    size: "text-[20px]", weight: "font-semibold",  accent: false },
  { label: "TypeScript",   size: "text-[36px]", weight: "font-black",     accent: true,  dim: true },
  { label: "Observability",size: "text-[22px]", weight: "font-bold",      accent: false },
  { label: "NeoVim",       size: "text-[17px]", weight: "font-medium",    accent: false },
  { label: "LLMs",         size: "text-[22px]", weight: "font-black",     accent: true  },
  { label: "Docker",       size: "text-[24px]", weight: "font-extrabold", accent: false },
]

const NETWORK_STATS = [
  { label: "Commits/Min",  value: "1,402",  danger: false },
  { label: "Active Nodes", value: "48,211", danger: false },
  { label: "Threat Level", value: "NOMINAL",danger: true  },
]

const ARCHITECTS = [
  { name: "Sarah Chen",      role: "Core Contributor, React",  contribution: "Integrated concurrent streaming for edge-SSR environments...",        initials: "SC", color: "#c49aff", bg: "rgba(196,154,255,0.15)" },
  { name: "Marcus Thorne",   role: "Founder, Oly-Lang",        contribution: "Finalized the spec for compile-time memory safety in Oly v0.8...",      initials: "MT", color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  { name: "Elena Rodriguez", role: "Lead Dev, SecureChain",    contribution: "Authored the whitepaper on Zero-Knowledge storage sharding...",         initials: "ER", color: "#ff94a8", bg: "rgba(255,148,168,0.15)" },
]

const TRENDING_COMMUNITIES = [
  { name: "Rustaceans",       members: "8.1k",  online: "242",  Icon: Terminal, color: "#c49aff", bg: "rgba(196,154,255,.15)", hot: true  },
  { name: "Next.js Experts",  members: "15.2k", online: "1.1k", Icon: Zap,      color: "#ff94a8", bg: "rgba(255,148,168,.15)", hot: false },
  { name: "Go Microservices", members: "4.2k",  online: "134",  Icon: Layers,   color: "#60a5fa", bg: "rgba(96,165,250,.12)",  hot: false },
  { name: "AI Builders",      members: "22k",   online: "2.1k", Icon: Globe,    color: "#4ade80", bg: "rgba(74,222,128,.12)",  hot: true  },
]

const TRENDING_POSTS = [
  { rank: 1, title: "¿Son las Server Actions el fin de tRPC?",          author: "@frontend_queen", engagement: "1.2k" },
  { rank: 2, title: "Rust en 2024: Por qué vale la pena el dolor",      author: "@oxide_dev",      engagement: "891"  },
  { rank: 3, title: "K8s vs Nomad en 2024: Decisión real",              author: "@devops_pro",     engagement: "534"  },
  { rank: 4, title: "Cómo escalamos a 1M de usuarios con Next.js",      author: "@jdalton_dev",    engagement: "449"  },
]

const DEVS_TO_FOLLOW = [
  { name: "Sarah Chen",  handle: "@sarah_codes", role: "Rust Expert",    initials: "SC", color: "#c49aff", bg: "rgba(196,154,255,.15)", followers: "4.2k" },
  { name: "Dev Guru",    handle: "@dev_guru",    role: "Web3 Developer", initials: "DG", color: "#ff94a8", bg: "rgba(255,148,168,.15)", followers: "8.1k" },
  { name: "oxide_dev",   handle: "@oxide_dev",   role: "Systems Eng.",   initials: "OD", color: "#4ade80", bg: "rgba(74,222,128,.12)",  followers: "2.8k" },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function ExplorePage() {
  const { success } = useToast()
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All")
  const [joined,   setJoined]   = useState<Record<string, boolean>>({})
  const [followed, setFollowed] = useState<Record<string, boolean>>({})
  const [search, setSearch]     = useState("")

  const handleJoin   = (name: string)   => { setJoined(p => ({...p, [name]:!p[name]}));       if (!joined[name])   success(`Te uniste a ${name}`)    }
  const handleFollow = (handle: string) => { setFollowed(p => ({...p, [handle]:!p[handle]})); if (!followed[handle]) success(`Siguiendo a ${handle}`) }

  return (
    <div className="pb-24">

      {/* ── 1. Featured Intelligence Hero ────────────────────────────────── */}
      <section className="mx-6 mt-7 mb-12 relative overflow-hidden rounded-[16px] bg-[#131313] border border-[#2e303a]" style={{ minHeight: 340 }}>
        {/* SVG decorativo — igual al HTML pero respetando los colores del proyecto */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-25 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <path className="animate-pulse-slow" d="M50,300 Q150,50 250,300 T450,150" fill="none" stroke="#c49aff" strokeWidth="1.5" />
            <circle cx="50"  cy="300" r="4" fill="#c49aff" />
            <circle cx="250" cy="300" r="4" fill="#c49aff" />
            <path d="M0,200 L400,200"  stroke="#2e303a" strokeDasharray="4 4" />
            <path d="M200,0 L200,400"  stroke="#2e303a" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="70"  fill="none" stroke="rgba(196,154,255,0.12)" strokeWidth="1" />
            <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(196,154,255,0.06)" strokeWidth="1" />
          </svg>
        </div>
        {/* Glow izquierdo */}
        <div className="absolute top-0 left-0 w-[360px] h-full pointer-events-none"
          style={{ background: "radial-gradient(circle at 10% 50%, rgba(196,154,255,0.07) 0%, transparent 65%)" }} />

        <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end" style={{ minHeight: 340 }}>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ff94a8] animate-pulse-slow"
              style={{ boxShadow: "0 0 8px #ff94a8" }} />
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff94a8]">
              Live Intelligence
            </span>
          </div>

          {/* Título */}
          <h1 className="font-black tracking-[-2px] leading-[0.95] text-[#f3f4f6] mb-4 m-0"
            style={{ fontSize: "clamp(28px, 5vw, 56px)" }}>
            Neural{" "}
            <span className="text-[#c49aff]">Kernel</span>{" "}
            V2.4 Analysis
          </h1>

          {/* Descripción */}
          <p className="text-[14px] text-[#6b6375] leading-[1.7] max-w-[480px] mb-8 m-0">
            A deep dive into the latest algorithmic breakthroughs in decentralized orchestration.
            Our discovery engine has flagged this as a high-momentum evolution.
          </p>

          {/* CTAs — usan el Button del proyecto */}
          <div className="flex flex-wrap gap-3">
            <Button size="md">Review Architecture</Button>
            <Button size="md" variant="secondary">Clone Spec</Button>
          </div>
        </div>
      </section>

      <div className="px-6 space-y-14">

        {/* ── 2. Search + Filters ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex items-center gap-2.5 bg-[#131313] border border-[#2e303a] rounded-[12px] px-4 py-3">
            <Search size={15} className="text-[#6b6375] opacity-60 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar repositorios, devs, temas..."
              className="bg-transparent border-none outline-none text-[13px] text-[#f3f4f6] w-full placeholder:text-[#6b6375] placeholder:opacity-50"
            />
          </div>
          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] font-bold cursor-pointer border transition-all duration-150 ${
                  activeFilter === f
                    ? "bg-[#c49aff] text-[#1a0033] border-[#c49aff]"
                    : "bg-transparent text-[#6b6375] border-[#2e303a] hover:border-[rgba(196,154,255,0.3)] hover:text-[#f3f4f6]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── 3. Trending Repositories ─────────────────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-[20px] font-extrabold tracking-tight text-[#f3f4f6] m-0 mb-1">
                Trending Repositories
              </h2>
              <p className="text-[12px] text-[#6b6375] m-0">
                Most active codebases in the last 24 hours.
              </p>
            </div>
            <button className="flex items-center gap-1 text-[#c49aff] text-[12px] font-bold bg-transparent border-none cursor-pointer hover:opacity-75 transition-opacity shrink-0">
              View All <ArrowUpRight size={12} strokeWidth={2} />
            </button>
          </div>

          {/* Scroll horizontal — mismo patrón que el HTML */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6" style={{ scrollbarWidth: "none" }}>
            {TRENDING_REPOS.map(repo => (
              <Card
                key={repo.name}
                hover
                padding="md"
                className="shrink-0 flex flex-col justify-between group"
                style={{ minWidth: 280 } as React.CSSProperties}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {/* Ícono con bg del color del repo */}
                    <div className="w-10 h-10 rounded-[9px] flex items-center justify-center"
                      style={{ background: repo.bg }}>
                      <repo.Icon size={18} color={repo.color} strokeWidth={1.8} />
                    </div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-[#6b6375] text-[12px] font-bold">
                      <Star size={12} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                      {repo.stars}
                    </div>
                  </div>
                  <h3 className="text-[14px] font-bold text-[#f3f4f6] m-0 mb-2 group-hover:text-[#c49aff] transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-[12px] text-[#6b6375] m-0 leading-[1.6] line-clamp-2">
                    {repo.desc}
                  </p>
                </div>
                {/* Tags — usan el Badge del proyecto */}
                <div className="flex items-center gap-1.5 mt-5 flex-wrap">
                  {repo.tags.map(tag => (
                    <Badge key={tag} variant="neutral">{tag}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 4. Active Clusters + Global Activity ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Topic cloud */}
          <section className="lg:col-span-2">
            <h2 className="text-[20px] font-extrabold tracking-tight text-[#f3f4f6] m-0 mb-6">
              Active Clusters
            </h2>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {TOPIC_CLOUD.map(t => (
                <span
                  key={t.label}
                  className={`${t.size} ${t.weight} cursor-pointer transition-colors duration-200`}
                  style={{
                    color: t.accent
                      ? t.dim ? "rgba(196,154,255,0.35)" : "#c49aff"
                      : "#f3f4f6",
                    opacity: (!t.accent && t.label !== "Kubernetes" && t.label !== "Rust-Lang" && t.label !== "Docker" && t.label !== "Observability") ? 0.55 : 1,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c49aff"; (e.currentTarget as HTMLElement).style.opacity = "1" }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = t.accent ? (t.dim ? "rgba(196,154,255,0.35)" : "#c49aff") : "#f3f4f6"
                    ;(e.currentTarget as HTMLElement).style.opacity = (!t.accent && t.label !== "Kubernetes" && t.label !== "Rust-Lang" && t.label !== "Docker" && t.label !== "Observability") ? "0.55" : "1"
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </section>

          {/* Network Activity widget — usa Card del proyecto */}
          <Card padding="lg" className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#f3f4f6] m-0">
                Global Activity
              </p>
              <div className="w-2 h-2 rounded-full bg-[#ff94a8] animate-pulse-slow"
                style={{ boxShadow: "0 0 6px #ff94a8" }} />
            </div>

            <div className="flex flex-col gap-2.5">
              {NETWORK_STATS.map(s => (
                <div key={s.label}
                  className="flex justify-between items-center px-3 py-2.5 rounded-[9px] bg-[#0e0e0e] border border-[#2e303a]">
                  <span className="text-[11px] text-[#6b6375]">{s.label}</span>
                  <span className={`text-[13px] font-black ${s.danger ? "text-[#ff6e84]" : "text-[#c49aff]"}`}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini-map placeholder */}
            <div className="h-28 rounded-[9px] overflow-hidden relative bg-[#0e0e0e] border border-[#2e303a] opacity-60">
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity size={28} color="#c49aff" strokeWidth={1} style={{ opacity: 0.4 }} />
              </div>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 50%, rgba(196,154,255,0.12) 0%, transparent 60%)" }} />
            </div>
          </Card>
        </div>

        {/* ── 5. Trending Communities ───────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-[#c49aff]" strokeWidth={2} />
              <h2 className="text-[20px] font-extrabold tracking-tight text-[#f3f4f6] m-0">
                En tendencia
              </h2>
            </div>
            <button className="flex items-center gap-1 text-[#c49aff] text-[12px] font-bold bg-transparent border-none cursor-pointer hover:opacity-75 transition-opacity">
              Ver todo <ArrowUpRight size={12} strokeWidth={2} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRENDING_COMMUNITIES.map((c, idx) => (
              <Card
                key={c.name}
                hover
                padding="sm"
                className="flex items-center gap-4 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` } as React.CSSProperties}
              >
                <div className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0"
                  style={{ background: c.bg, color: c.color }}>
                  <c.Icon size={18} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-bold text-[#f3f4f6]">{c.name}</span>
                    {c.hot && <Badge variant="tertiary">HOT</Badge>}
                  </div>
                  <div className="text-[11px] text-[#6b6375]">
                    {c.members} miembros ·{" "}
                    <span className="text-[#3ba55d]">{c.online} en línea</span>
                  </div>
                </div>
                <Button
                  size="xs"
                  variant={joined[c.name] ? "outline" : "ghost"}
                  onClick={() => handleJoin(c.name)}
                >
                  {joined[c.name] ? "Unido ✓" : "Unirse"}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 6. Architect Spotlight ───────────────────────────────────────── */}
        <section className="pb-4">
          <div className="text-center mb-8">
            <h2 className="text-[26px] font-black tracking-tight text-[#f3f4f6] m-0 mb-2">
              Architect Spotlight
            </h2>
            <p className="text-[13px] text-[#6b6375] m-0">
              The minds defining the next decade of infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ARCHITECTS.map((a, idx) => (
              <Card
                key={a.name}
                padding="none"
                className="overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${idx * 80}ms` } as React.CSSProperties}
              >
                {/* Avatar banner */}
                <div className="h-40 relative flex items-center justify-center overflow-hidden bg-[#0e0e0e]">
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 60%, ${a.color}20 0%, transparent 65%)` }} />
                  <Avatar
                    initials={a.initials}
                    color={a.color}
                    bg={a.bg}
                    size="xl"
                    shape="circle"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                    style={{ background: "linear-gradient(to top, #131313, transparent)" }} />
                </div>

                {/* Info */}
                <div className="p-5 -mt-4 relative z-10">
                  <h3 className="text-[16px] font-bold text-[#f3f4f6] m-0 mb-0.5">{a.name}</h3>
                  <p className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#c49aff] m-0 mb-4">
                    {a.role}
                  </p>
                  {/* Quote box */}
                  <div className="p-3.5 rounded-[9px] bg-[#0e0e0e] border border-[#2e303a]">
                    <span className="block text-[9px] font-black uppercase tracking-[1.5px] text-[#6b6375] mb-1.5">
                      Latest Contribution
                    </span>
                    <p className="text-[12px] leading-[1.6] italic text-[#adaaaa] m-0">
                      &ldquo;{a.contribution}&rdquo;
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 7. Top Posts + Devs to Follow ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 pb-4">

          {/* Trending posts */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Star size={14} className="text-[#c49aff]" strokeWidth={2} />
              <h3 className="text-[16px] font-extrabold text-[#f3f4f6] m-0">Posts más vistos</h3>
            </div>
            <div className="flex flex-col">
              {TRENDING_POSTS.map((p, idx) => (
                <div
                  key={p.rank}
                  className="flex items-center gap-4 py-3.5 cursor-pointer hover:opacity-75 transition-opacity animate-fade-in border-b border-[#2e303a] last:border-b-0"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <span className="w-6 text-center text-[18px] font-black font-mono shrink-0 text-[#6b6375] opacity-30">
                    {p.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#f3f4f6] m-0 mb-0.5 hover:text-[#c49aff] transition-colors truncate">
                      {p.title}
                    </p>
                    <span className="text-[11px] text-[#6b6375] opacity-60">{p.author}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#c49aff] shrink-0">{p.engagement}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Devs to follow */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Users size={14} className="text-[#c49aff]" strokeWidth={2} />
              <h3 className="text-[16px] font-extrabold text-[#f3f4f6] m-0">Seguir devs</h3>
            </div>
            <div className="flex flex-col gap-3">
              {DEVS_TO_FOLLOW.map((dev, idx) => (
                <Card
                  key={dev.handle}
                  padding="sm"
                  className="animate-fade-in"
                  style={{ animationDelay: `${idx * 60}ms` } as React.CSSProperties}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar
                      initials={dev.initials}
                      color={dev.color}
                      bg={dev.bg}
                      size="sm"
                      shape="circle"
                    />
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-[#f3f4f6] truncate">{dev.name}</div>
                      <div className="text-[10px] text-[#6b6375]">{dev.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#6b6375] opacity-60">{dev.followers} seguidores</span>
                    <Button
                      size="xs"
                      variant={followed[dev.handle] ? "outline" : "primary"}
                      onClick={() => handleFollow(dev.handle)}
                    >
                      {followed[dev.handle] ? "Siguiendo" : "Seguir"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}