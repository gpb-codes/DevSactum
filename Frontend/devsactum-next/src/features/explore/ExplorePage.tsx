"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Terminal, Layers, Zap, Globe, Search, TrendingUp, Users,
  Star, Flame, BookOpen, GitFork, Hash,
  ArrowRight, ChevronRight, Code2, Sparkles, Rocket,
} from "lucide-react"
import { useToast } from "@/src/components/ui/Toast"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Skeleton, CardSkeleton } from "@/src/components/ui/Skeleton"
import { Avatar } from "@/src/components/ui/Avatar"

type FilterKey = "All" | "Rust" | "Web3" | "Backend" | "UI/UX" | "AI/ML" | "Cloud"

const TOPICS: { name: FilterKey; Icon: React.ElementType; color: string }[] = [
  { name: "All",      Icon: Hash, color: "var(--text-muted)" },
  { name: "Rust",     Icon: Terminal, color: "var(--primary)" },
  { name: "Web3",     Icon: Globe,    color: "var(--accent)" },
  { name: "Backend",  Icon: Layers,   color: "var(--secondary)" },
  { name: "AI/ML",    Icon: Sparkles, color: "#4ade80" },
  { name: "Cloud",    Icon: Rocket,   color: "#60a5fa" },
  { name: "UI/UX",    Icon: Code2,    color: "#f472b6" },
]

const FEATURED = {
  name: "Web3 Builders",
  desc: "Engineering the decentralized future with Ethereum, Solana, and Rust-based smart contracts.",
  members: "12.4k", online: "892",
  tags: ["Ethereum", "Solana", "Rust"],
  growth: "+24% este mes",
  category: "Web3" as FilterKey,
}

const ALL_COMMUNITIES = [
  { name: "Rustaceans",      members: "8.1k",  online: "242",  Icon: Terminal, color: "var(--primary)", bg: "var(--primary-soft)", category: "Rust" as FilterKey,    hot: true },
  { name: "Next.js Experts", members: "15.2k", online: "1.1k", Icon: Zap,      color: "var(--accent)",  bg: "var(--accent-soft)",  category: "UI/UX" as FilterKey,  hot: false },
  { name: "Go Microservices",members: "4.2k",  online: "134",  Icon: Layers,   color: "var(--secondary)", bg: "var(--secondary-soft)", category: "Backend" as FilterKey, hot: false },
  { name: "AI Builders",     members: "22k",   online: "2.1k", Icon: Globe,    color: "#4ade80", bg: "rgba(74,222,128,.12)",  category: "AI/ML" as FilterKey,  hot: true },
  { name: "K8s Native",      members: "6.7k",  online: "412",  Icon: Rocket,   color: "#60a5fa", bg: "rgba(96,165,250,.12)",  category: "Cloud" as FilterKey,  hot: false },
  { name: "Solidity Devs",   members: "9.3k",  online: "567",  Icon: Globe,    color: "var(--accent)",  bg: "var(--accent-soft)",  category: "Web3" as FilterKey,   hot: true },
]

const TRENDING_POSTS = [
  { rank: 1, title: "Son las Server Actions el fin de tRPC?", author: "@frontend_queen", engagement: "1.2k", category: "UI/UX" as FilterKey },
  { rank: 2, title: "Rust en 2024: Por qu\u00e9 vale la pena el dolor", author: "@oxide_dev",     engagement: "891", category: "Rust" as FilterKey },
  { rank: 3, title: "K8s vs Nomad en 2024: Decisi\u00f3n real",        author: "@devops_pro",     engagement: "534", category: "Cloud" as FilterKey },
  { rank: 4, title: "C\u00f3mo escalamos a 1M de usuarios con Next.js", author: "@jdalton_dev",  engagement: "449", category: "UI/UX" as FilterKey },
  { rank: 5, title: "Zero-Knowledge Proofs explicado simple",     author: "@zk_dev",         engagement: "378", category: "Web3" as FilterKey },
  { rank: 6, title: "Fine-tuning con LoRA: Gu\u00eda pr\u00e1ctica",        author: "@ml_engineer",    engagement: "312", category: "AI/ML" as FilterKey },
]

const OPEN_SOURCE = [
  { name: "Tokio",    desc: "Runtime async para Rust, el est\u00e1ndar de facto.",  stars: "28.3k",  lang: "Rust",     langColor: "#dea584", forks: "5.1k", category: "Rust" as FilterKey },
  { name: "Prisma",   desc: "ORM moderno para Node.js y TypeScript.",         stars: "41.2k",  lang: "TypeScript", langColor: "#3178c6", forks: "1.4k", category: "Backend" as FilterKey },
  { name: "Hono",     desc: "Framework web ultrarr\u00e1pido, edge-first.",        stars: "18.7k",  lang: "TypeScript", langColor: "#3178c6", forks: "2.3k", category: "Cloud" as FilterKey },
  { name: "Zig",      desc: "Programaci\u00f3n de sistemas, alternativa a C.",      stars: "35.4k",  lang: "Zig",      langColor: "#f69d3b", forks: "1.9k", category: "Backend" as FilterKey },
  { name: "React Aria", desc: "Hooks accesibles para dise\u00f1o de sistemas.",    stars: "12.1k",  lang: "TypeScript", langColor: "#3178c6", forks: "890",  category: "UI/UX" as FilterKey },
]

const DEVS_TO_FOLLOW = [
  { name: "Sarah Chen",   handle: "@sarah_codes",  role: "Rust Expert",     initials: "SC", color: "var(--primary)", bg: "var(--primary-soft)", followers: "4.2k", category: "Rust" as FilterKey },
  { name: "Dev Guru",     handle: "@dev_guru",     role: "Web3 Developer",  initials: "DG", color: "var(--accent)",  bg: "var(--accent-soft)",  followers: "8.1k", category: "Web3" as FilterKey },
  { name: "oxide_dev",    handle: "@oxide_dev",    role: "Systems Eng.",    initials: "OD", color: "#4ade80",        bg: "rgba(74,222,128,.12)", followers: "2.8k", category: "Rust" as FilterKey },
  { name: "Mia Torres",   handle: "@mia_codes",    role: "AI Researcher",   initials: "MT", color: "var(--secondary)", bg: "var(--secondary-soft)", followers: "6.3k", category: "AI/ML" as FilterKey },
]

const STATS = [
  { label: "Comunidades", value: "2.4K" },
  { label: "Post / d\u00eda",  value: "1.8K" },
  { label: "Devs activos", value: "89.2K" },
  { label: "Proyectos OS", value: "560" },
]

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0")
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    const num = parseFloat(target.replace(/[KMB]/gi, ""))
    const hasK = target.includes("K")
    const isDecimal = target.includes(".")
    const totalFrames = 40
    let frame = 0

    const interval = setInterval(() => {
      frame++
      const progress = Math.min(frame / totalFrames, 1)
      const current = (num * progress).toFixed(isDecimal ? 1 : 0)
      setDisplay(current + (hasK && progress < 1 ? "" : hasK ? "K" : ""))
      if (progress >= 1) {
        clearInterval(interval)
        setDisplay(target)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [target])

  return <span ref={ref}>{display}{suffix}</span>
}

export default function ExplorePage() {
  const { info } = useToast()
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All")
  const [loading, setLoading] = useState(true)
  const [searchQ, setSearchQ] = useState("")
  const [following, setFollowing] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const filteredCommunities = ALL_COMMUNITIES.filter(
    c => activeFilter === "All" || c.category === activeFilter
  )

  return (
    <div className="px-6 py-6 max-w-[1100px] mx-auto">
      {loading ? (
        <div className="space-y-6">
          <div className="flex gap-4 mb-4">
            {[1,2,3,4].map(i => <Skeleton key={i} variant="text" width={80} />)}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => <CardSkeleton key={i} />)}
          </div>
        </div>
      ) : (
        <>
          <section className="mb-10">
            <h1 className="text-[48px] font-black tracking-[-2px] text-[var(--text-h)] leading-[1.1] mb-3">
              Explora el <span className="gradient-text">ecosistema</span>
            </h1>
            <p className="text-sm text-[var(--text)] leading-[1.7] max-w-[480px]">
              Descubre comunidades, tendencias y desarrolladores que están construyendo el futuro de la tecnología.
            </p>
          </section>

          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            <div className="flex items-center gap-2 bg-[var(--bg)] border-2 border-[var(--border)] rounded-[var(--radius-lg)] px-3 h-[38px] focus-within:border-[var(--border-active)] transition-all shrink-0 min-w-[220px]">
              <Search size={13} className="text-[var(--text-muted)] shrink-0" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Buscar en explorar..."
                className="bg-transparent border-none outline-none text-xs text-[var(--text-h)] w-full placeholder:text-[var(--text-muted)]"
              />
            </div>
            <div className="flex gap-1.5">
              {TOPICS.map(({ name, Icon }) => (
                <button
                  key={name}
                  onClick={() => setActiveFilter(name)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold cursor-pointer border transition-all duration-[var(--duration-fast)] ${
                    activeFilter === name
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-[var(--shadow-glow)]"
                      : "bg-[var(--bg-surface)] text-[var(--text-soft)] border-[var(--border)] hover:border-[var(--primary-border)] hover:text-[var(--primary)]"
                  }`}
                >
                  <Icon size={12} strokeWidth={2} />
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

            <div className="flex flex-col gap-6">

              <div className="glass rounded-[var(--radius-2xl)] p-6">
                <div className="flex gap-1 mb-4">
                  {FEATURED.tags.map(t => (
                    <Badge key={t} variant="accent">{t}</Badge>
                  ))}
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl font-black text-[var(--text-h)] mb-1">{FEATURED.name}</h2>
                    <p className="text-sm text-[var(--text)] leading-[1.7] max-w-[500px]">{FEATURED.desc}</p>
                    <div className="flex gap-4 mt-3">
                      <span className="text-xs text-[var(--text-muted)]">
                        <Users size={12} className="inline mr-1" />
                        {FEATURED.members} miembros
                      </span>
                      <span className="text-xs text-[var(--online)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--online)] inline-block mr-1" />
                        {FEATURED.online} online
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="primary" onClick={() => info("¡Unido a la comunidad!")}>
                    Unirse <ArrowRight size={12} strokeWidth={2.5} />
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-[1.5px] text-[var(--text-h)] mb-4 flex items-center gap-2">
                  <Flame size={14} className="text-[var(--accent)]" strokeWidth={2} />
                  Comunidades destacadas
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {filteredCommunities.map((c) => (
                    <div
                      key={c.name}
                      className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-xl)] p-4 cursor-pointer hover:border-[var(--primary-border)] hover:shadow-[var(--shadow-glow)] transition-all duration-[var(--duration-fast)]"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center" style={{ background: c.bg, color: c.color }}>
                          <c.Icon size={18} strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[var(--text-h)]">{c.name}</div>
                          <div className="flex items-center gap-2 text-[10px] text-[var(--text-soft)] mt-0.5">
                            <span>{c.members} miembros</span>
                            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                            {c.hot && <span className="text-[var(--primary)] font-bold">🔥 Popular</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="relative flex w-1.5 h-1.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--online)] opacity-75" />
                          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[var(--online)]" />
                        </span>
                        <span className="text-[var(--text-soft)] font-mono">{c.online} online ahora</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-[1.5px] text-[var(--text-h)] mb-4 flex items-center gap-2">
                  <TrendingUp size={14} className="text-[var(--primary)]" strokeWidth={2} />
                  En tendencia
                </h2>
                <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-xl)] overflow-hidden">
                  {TRENDING_POSTS.filter(p => activeFilter === "All" || p.category === activeFilter).map((p, i) => (
                    <div
                      key={p.rank}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--bg-hover)] cursor-pointer transition-colors border-b border-[var(--border)] last:border-0"
                    >
                      <span className={`text-lg font-black w-6 text-center ${i < 3 ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`}>
                        {p.rank}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[var(--text-h)] truncate">{p.title}</div>
                        <div className="text-[11px] text-[var(--text-soft)] mt-0.5">
                          {p.author} · {p.engagement} interacciones
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0" strokeWidth={1.8} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-5">
                <h3 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-3">
                  Desarrolladores para seguir
                </h3>
                <div className="space-y-3">
                  {DEVS_TO_FOLLOW.filter(d => activeFilter === "All" || d.category === activeFilter).map(d => (
                    <div key={d.handle} className="flex items-center gap-3">
                      <Avatar initials={d.initials} color={d.color} bg={d.bg} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-bold text-[var(--text-h)]">{d.name}</div>
                        <div className="text-[10px] text-[var(--text-soft)]">{d.handle} · {d.followers} seguidores</div>
                      </div>
                      <button
                        onClick={() => setFollowing(f => ({ ...f, [d.handle]: !f[d.handle] }))}
                        className={`text-[10px] font-bold cursor-pointer border rounded-full px-3 py-1 transition-all ${
                          following[d.handle]
                            ? "bg-transparent text-[var(--text)] border-[var(--border)]"
                            : "bg-[var(--primary)] text-white border-[var(--primary)]"
                        }`}
                      >
                        {following[d.handle] ? "Siguiendo" : "Seguir"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-5">
                <h3 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-3">
                  Open Source
                </h3>
                <div className="space-y-3">
                  {OPEN_SOURCE.filter(o => activeFilter === "All" || o.category === activeFilter).map(o => (
                    <div key={o.name} className="p-3 rounded-[var(--radius-lg)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-1.5 mb-1">
                        <BookOpen size={12} className="text-[var(--primary)]" strokeWidth={1.8} />
                        <span className="text-sm font-bold text-[var(--text-h)]">{o.name}</span>
                      </div>
                      <p className="text-[11px] text-[var(--text)] leading-[1.5] mb-2">{o.desc}</p>
                      <div className="flex gap-3 text-[10px] font-mono text-[var(--text-soft)]">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: o.langColor }} />
                          {o.lang}
                        </span>
                        <span className="flex items-center gap-0.5"><Star size={10} strokeWidth={1.8} /> {o.stars}</span>
                        <span className="flex items-center gap-0.5"><GitFork size={10} strokeWidth={1.8} /> {o.forks}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[var(--primary-soft)] to-[var(--secondary-soft)] border border-[var(--primary-border)] rounded-[var(--radius-2xl)] p-5 text-center">
                <Rocket size={24} className="text-[var(--primary)] mx-auto mb-2" strokeWidth={1.5} />
                <div className="text-[13px] font-black text-[var(--text-h)] mb-1">Crea tu comunidad</div>
                <p className="text-[11px] text-[var(--text-soft)] leading-[1.5] mb-3">
                  Inicia un espacio para tu stack favorito.
                </p>
                <Button size="sm" variant="primary">
                  Crear comunidad
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <section className="grid grid-cols-4 gap-4 mt-10 mb-6">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-xl)] p-5 text-center">
            <div className="text-[28px] font-black text-[var(--text-h)] tracking-tight">
              <AnimatedCounter target={s.value} />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[1px] text-[var(--text-soft)] mt-1">{s.label}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
