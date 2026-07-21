"use client"

import React, { useState, useEffect } from "react"
import {
  Terminal, Zap, Layers, Cloud, Plus,
  MessageSquare, Share2, ArrowUpRight, Users, Loader2,
} from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"
import { communityService, Community } from "@/services/communities"
import { postService, Post } from "@/services/posts"
import { reputationService, LeaderboardEntry } from "@/services/reputation"

const FILTERS = ["Todas", "Rust", "Web3", "TypeScript", "Cloud"]

const iconMap: Record<string, React.ElementType> = {
  Terminal, Zap, Layers, Cloud, Code2: Terminal,
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k"
  return String(n)
}

function getInitials(name: string): string {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

function getColor(name: string): string {
  const colors = ["#c49aff", "#ff94a8", "#60a5fa", "#4ade80", "#f59e0b"]
  return colors[name.charCodeAt(0) % colors.length]
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return "hace " + Math.floor(diff / 60000) + "m"
  if (hours < 24) return "hace " + hours + "h"
  return "hace " + Math.floor(hours / 24) + "d"
}

export default function Comunidades() {
  const { setActivePage } = useNav()
  const { success } = useToast()
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [joined, setJoined] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [communities, setCommunities] = useState<Community[]>([])
  const [discussions, setDiscussions] = useState<Post[]>([])
  const [contributors, setContributors] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [commData, postsData, leaderData] = await Promise.all([
          communityService.list(),
          postService.getFeed(10),
          reputationService.getLeaderboard(5),
        ])
        setCommunities(commData)
        setDiscussions(postsData)
        setContributors(leaderData)
      } catch {
        setError("Error al cargar comunidades")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleJoin = async (id: string, name: string) => {
    try {
      await communityService.join(id)
      setJoined(p => ({ ...p, [name]: true }))
      success("Te has unido al colectivo")
    } catch {
      success("Error al unirse al colectivo")
    }
  }

  const handleLeave = async (id: string, name: string) => {
    try {
      await communityService.leave(id)
      setJoined(p => ({ ...p, [name]: false }))
      success("Has abandonado el colectivo")
    } catch {
      success("Error al abandonar el colectivo")
    }
  }

  const myGroups = communities.filter(c => joined[c.name])
  const trending = communities.slice(0, 3)

  if (loading) {
    return (
      <div className="px-6 py-6 max-w-[720px] mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="text-accent animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-6 py-6 max-w-[720px] mx-auto">
        <div className="bg-bg-surface border border-border rounded-2xl p-8 text-center">
          <p className="text-[14px] text-text mb-4">{error}</p>
          <button onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-[10px] text-[12px] font-extrabold bg-accent text-[#1a0033] border border-accent cursor-pointer">
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-6 max-w-[720px] mx-auto">

      {/* Hero */}
      <section className="mb-8">
        <h1 className="text-[44px] font-black tracking-[-2px] text-text-h leading-[1.1] mb-3">
          Encuentra tu <br /><span className="text-accent italic">colectivo.</span>
        </h1>
        <p className="text-[14px] text-text leading-[1.7] max-w-[440px] m-0">
          Conéctate con desarrolladores que construyen el futuro. Únete a hubs especializados de experiencia.
        </p>
      </section>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-8" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 px-5 py-2 rounded-full text-[12px] font-bold cursor-pointer border transition-all duration-150 ${
              activeFilter === f
                ? "bg-accent text-[#1a0033] border-accent"
                : "bg-bg-surface text-text border-border hover:border-accent-border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tendencias */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary shrink-0" />
            <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-text">Tendencias</span>
          </div>
          <span className="text-[11px] font-extrabold text-accent uppercase tracking-[1px] cursor-pointer">Ver todo</span>
        </div>

        {trending.length > 0 && (
          <div key={trending[0].id} className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 relative">
            <span className="bg-bg-hover text-accent border border-accent-border text-[9px] font-extrabold uppercase tracking-[1.5px] px-2.5 py-1 rounded-full inline-block mb-4">
              Crecimiento más rápido
            </span>
            <div className="text-[36px] font-black tracking-[-1.5px] text-text-h mb-2.5">{trending[0].name}</div>
            <p className="text-[13px] text-text leading-[1.7] mb-5 max-w-[400px]">{trending[0].description}</p>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-text-h">
                <Users size={15} className="text-accent" strokeWidth={2} />
                {formatCount(trending[0].memberCount)} miembros
              </div>
              <button
                onClick={() => joined[trending[0].name] ? handleLeave(trending[0].id, trending[0].name) : handleJoin(trending[0].id, trending[0].name)}
                className={`px-7 py-2.5 rounded-[10px] text-[12px] font-extrabold cursor-pointer transition-all duration-150 border border-accent ${
                  joined[trending[0].name] ? "bg-transparent text-accent" : "bg-accent text-[#1a0033]"
                }`}
              >
                {joined[trending[0].name] ? "Unido ✓" : "Unirse al colectivo"}
              </button>
            </div>
          </div>
        )}

        {trending.slice(1).map((c) => {
          const Icon = iconMap[c.icon] || Terminal
          return (
            <div key={c.id} className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[10px] bg-bg-hover flex items-center justify-center shrink-0 text-accent">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[20px] font-black tracking-[-0.5px] text-text-h mb-1">{c.name}</div>
                  <div className="text-[12px] text-text">{formatCount(c.memberCount)} miembros · {c.onlineCount} en línea</div>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-text shrink-0" strokeWidth={1.8} />
            </div>
          )
        })}
      </section>

      {/* Mis grupos */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-text">Mis grupos</span>
        </div>

        {myGroups.length === 0 && (
          <div className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 text-center">
            <p className="text-[13px] text-text">Únete a colectivos para verlos aquí</p>
          </div>
        )}

        {myGroups.map((c) => {
          const Icon = iconMap[c.icon] || Terminal
          return (
            <div key={c.id} className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-[10px] bg-bg-hover flex items-center justify-center shrink-0 text-accent">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[15px] font-bold text-text-h mb-0.5">{c.name}</div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[1px] text-text">{c.description ? c.description.slice(0, 30) : "Comunidad"}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-text mb-0.5">+{c.onlineCount}</div>
                <div className="text-[11px] text-text opacity-60">{formatCount(c.memberCount)} mems</div>
              </div>
            </div>
          )
        })}

        <div className="bg-transparent border-2 border-dashed border-border rounded-2xl flex flex-col items-center gap-2.5 p-7 cursor-pointer hover:border-accent-border transition-colors duration-150">
          <div className="w-11 h-11 rounded-full bg-bg-hover flex items-center justify-center">
            <Plus size={18} className="text-text" strokeWidth={2} />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text">Crear colectivo</span>
        </div>
      </section>

      {/* Discusiones globales */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-[#d896ff] shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-text">Discusiones globales</span>
        </div>

        {discussions.map((d) => {
          const tag = d.tags?.[0] || "General"
          const tagColors: Record<string, string> = {
            Rust: "text-accent", Web3: "text-tertiary", TypeScript: "text-[#4ade80]",
          }
          return (
            <div key={d.id} className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-[12px] font-bold flex-wrap">
                <span className={tagColors[tag] || "text-accent"}>{tag}</span>
                <span className="opacity-30 text-text">•</span>
                <span className="text-text">Por <span className="text-text-h">{d.authorName}</span></span>
                <span className="opacity-30 text-text">•</span>
                <span className="text-text opacity-60">{timeAgo(d.createdAt)}</span>
              </div>
              <div className="text-[20px] font-black tracking-[-0.5px] text-text-h leading-[1.3] cursor-pointer">
                {d.content.length > 100 ? d.content.slice(0, 100) + "..." : d.content}
              </div>
              <p className="text-[13px] text-text leading-[1.7] m-0">{d.content}</p>
              <div className="flex gap-5 mt-1">
                <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold text-text p-0">
                  <MessageSquare size={15} strokeWidth={1.8} /> {d.comments}
                </button>
                <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold text-text p-0">
                  <Share2 size={15} strokeWidth={1.8} /> {d.shares}
                </button>
              </div>
            </div>
          )
        })}
      </section>

      {/* Top contributors */}
      <section className="mb-12">
        <div className="text-[10px] font-extrabold uppercase tracking-[2px] text-accent mb-5">Mejores contribuidores</div>
        {contributors.map((c) => {
          const name = c.displayName || c.username
          const initials = getInitials(name)
          const color = getColor(name)
          return (
            <div key={c.userId} className="flex items-center justify-between py-3 border-b border-border cursor-pointer hover:opacity-80 transition-opacity duration-150">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold"
                  style={{ background: `${color}22`, color }}
                >
                  {initials}
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-text-h">@{c.username}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-text">{c.level}</div>
                </div>
              </div>
              <span className="text-[13px] font-extrabold text-accent">+{c.score}</span>
            </div>
          )
        })}
      </section>

      {/* CTA Premium */}
      <section className="bg-bg-surface border border-border rounded-[20px] p-7 mb-12">
        <div className="text-[24px] font-black tracking-[-0.5px] text-text-h mb-2">Construye junto a otros.</div>
        <p className="text-[13px] text-text leading-[1.7] mb-5">
          Actualiza a Sanctum Pro para colectivos privados e integraciones ilimitadas de repositorios.
        </p>
        <button onClick={() => setActivePage("Membresía Dev")}
          className="w-full bg-text-h text-bg border-none rounded-[10px] py-3.5 text-[11px] font-black uppercase tracking-[2px] cursor-pointer hover:opacity-90 transition-opacity duration-150">
          Ir a Premium
        </button>
      </section>

    </div>
  )
}
