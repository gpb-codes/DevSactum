"use client"

import React, { useState, useEffect } from "react"
import { Terminal, Layers, Zap, Globe, Search, TrendingUp, Users, Star, ArrowUpRight, Flame, Loader2, Code2, Hash } from "lucide-react"
import { useToast } from "@/components/ui/Toast"
import { communityService, type Community } from "@/services/communities"
import { postService, type Post } from "@/services/posts"
import { reputationService, type LeaderboardEntry } from "@/services/reputation"

type FilterKey = "All" | "Rust" | "Web3" | "Backend" | "UI/UX" | "AI/ML" | "Cloud"

const FILTERS: FilterKey[] = ["All", "Rust", "Web3", "Backend", "UI/UX", "AI/ML", "Cloud"]

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Terminal, Layers, Zap, Globe, Code2, Users, Star, Hash,
}

function resolveIcon(name: string) {
  const Icon = ICON_MAP[name]
  return Icon || Globe
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}k`
  return String(n)
}

export default function ExplorePage() {
  const { success } = useToast()
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All")
  const [joined, setJoined] = useState<Record<string, boolean>>({})
  const [followed, setFollowed] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState("")
  const [communities, setCommunities] = useState<Community[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [comms, feed, leader] = await Promise.all([
          communityService.list(10),
          postService.getFeed(5),
          reputationService.getLeaderboard(5),
        ])
        setCommunities(comms)
        setPosts(feed)
        setLeaderboard(leader)
      } catch (err) {
        console.error("Error loading explore data:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const featured = communities.length > 0
    ? communities.reduce((a, b) => (a.memberCount > b.memberCount ? a : b))
    : null

  const filteredCommunities = communities.filter(c => {
    if (activeFilter === "All") return true
    const term = activeFilter.toLowerCase()
    return c.name.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)
  })

  const lowerSearch = search.toLowerCase()
  const searchedCommunities = lowerSearch
    ? filteredCommunities.filter(c =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.description.toLowerCase().includes(lowerSearch)
      )
    : filteredCommunities

  async function handleJoin(community: Community) {
    if (joined[community.id]) return
    try {
      await communityService.join(community.id)
      setJoined(p => ({ ...p, [community.id]: true }))
      success(`Te uniste a ${community.name}`)
    } catch {
      // fallback handled
    }
  }

  function handleFollow(handle: string) {
    setFollowed(p => ({ ...p, [handle]: !p[handle] }))
    if (!followed[handle]) success(`Siguiendo a ${handle}`)
  }

  const COMMUNITY_COLORS = ["#c49aff", "#ff94a8", "#60a5fa", "#4ade80", "#f59e0b"]

  function communityColor(index: number) {
    return COMMUNITY_COLORS[index % COMMUNITY_COLORS.length]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-accent" size={28} />
      </div>
    )
  }

  return (
    <div className="px-6 py-6 max-w-[820px] mx-auto animate-fade-in">

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
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

      <div className="flex items-center gap-2.5 bg-bg-surface border border-border rounded-[12px] px-4 py-3 mb-6">
        <Search size={15} className="text-text opacity-50 shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar comunidades, devs, temas..."
          className="bg-transparent border-none outline-none text-[13px] text-text-h w-full"
        />
      </div>

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

      {featured && (
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
                      Mayor membresía
                    </span>
                    <span className="text-[10px] text-online font-bold">{formatCount(featured.memberCount)} miembros</span>
                  </div>
                  <h2 className="text-[32px] font-black tracking-[-1.5px] text-text-h m-0 mb-2">{featured.name}</h2>
                  <p className="text-[13px] text-text leading-[1.7] max-w-[440px] m-0">{featured.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-5 text-[12px]">
                  <div className="flex items-center gap-1.5">
                    <Users size={13} strokeWidth={2} className="text-accent" />
                    <span className="font-bold text-text-h">{formatCount(featured.memberCount)}</span>
                    <span className="text-text opacity-60">miembros</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-online animate-pulse-slow" />
                    <span className="font-bold text-text-h">{formatCount(featured.onlineCount)}</span>
                    <span className="text-text opacity-60">en línea</span>
                  </div>
                </div>
                <button
                  onClick={() => handleJoin(featured)}
                  className={`px-7 py-2.5 rounded-[10px] text-[12px] font-extrabold cursor-pointer transition-all duration-150 border ${
                    joined[featured.id]
                      ? "bg-transparent text-accent border-accent"
                      : "bg-accent text-[#1a0033] border-accent hover:opacity-85"
                  }`}
                >
                  {joined[featured.id] ? "Unido ✓" : "Unirse al colectivo"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div>
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
            <div className="flex flex-col gap-2.5 animate-stagger">
              {searchedCommunities.map((c, idx) => {
                const Icon = resolveIcon(c.icon)
                const color = communityColor(idx)
                return (
                  <div
                    key={c.id}
                    className="bg-bg-surface border border-border rounded-[14px] p-4 flex items-center gap-4 hover:border-accent-border hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <div
                      className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0"
                      style={{ background: `${color}26`, color }}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[14px] font-bold text-text-h">{c.name}</span>
                      </div>
                      <div className="text-[11px] text-text opacity-60">
                        {formatCount(c.memberCount)} miembros · <span className="text-online">{formatCount(c.onlineCount)} en línea</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoin(c)}
                      className={`px-4 py-1.5 rounded-[8px] text-[11px] font-bold cursor-pointer transition-all duration-150 border shrink-0 ${
                        joined[c.id]
                          ? "bg-transparent text-accent border-accent"
                          : "bg-transparent text-text border-border hover:border-accent-border hover:text-accent"
                      }`}
                    >
                      {joined[c.id] ? "Unido ✓" : "Unirse"}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="text-accent" strokeWidth={2} />
              <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Posts más vistos</span>
            </div>
            <div className="flex flex-col gap-2 animate-stagger">
              {posts.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3.5 py-3.5 border-b border-border cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="text-[20px] font-black text-text opacity-20 w-6 text-center shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-text-h m-0 mb-0.5 hover:text-accent transition-colors">{p.content}</p>
                    <span className="text-[11px] text-text opacity-50">{p.authorHandle}</span>
                  </div>
                  <span className="text-[11px] font-bold text-accent shrink-0">{p.likes}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
          <div className="sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Users size={14} className="text-accent" strokeWidth={2} />
              <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Seguir devs</span>
            </div>
            <div className="flex flex-col gap-3 animate-stagger">
              {leaderboard.map((entry, idx) => {
                const initials = entry.displayName
                  .split(" ")
                  .map(w => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
                const colors = ["#c49aff", "#ff94a8", "#60a5fa", "#4ade80", "#f59e0b"]
                const c = colors[idx % colors.length]
                return (
                  <div
                    key={entry.userId}
                    className="bg-bg-surface border border-border rounded-[14px] p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{ background: `${c}22`, color: c }}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[12px] font-bold text-text-h truncate">{entry.displayName}</div>
                        <div className="text-[10px] text-text opacity-60">{entry.level}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text opacity-50">{formatCount(entry.score)} pts</span>
                      <button
                        onClick={() => handleFollow(`@${entry.username}`)}
                        className={`px-3 py-1 rounded-[7px] text-[10px] font-bold cursor-pointer transition-all border ${
                          followed[`@${entry.username}`]
                            ? "bg-transparent text-accent border-accent"
                            : "bg-accent text-[#1a0033] border-accent hover:opacity-85"
                        }`}
                      >
                        {followed[`@${entry.username}`] ? "Siguiendo" : "Seguir"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
