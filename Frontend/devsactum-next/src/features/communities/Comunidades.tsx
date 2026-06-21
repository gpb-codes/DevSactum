"use client"

import React, { useState, useEffect } from "react"
import {
  Terminal, Zap, Layers, Cloud,
  MessageSquare, Share2, ArrowUpRight, Users,
} from "lucide-react"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"
import { Skeleton } from "@/src/components/ui/Skeleton"

const FILTERS = ["Todas", "Rust", "Web3", "TypeScript", "Cloud"]

const TRENDING = [
  {
    id: 1, name: "Web3 Builders", badge: "Crecimiento m\u00e1s r\u00e1pido", featured: true,
    desc: "Construyendo el futuro descentralizado con Ethereum, Solana y contratos inteligentes en Rust.",
    members: "12.4k",
  },
  { id: 2, name: "Rustaceans", members: "8.1k", online: "242", Icon: Terminal, color: "var(--primary)", bg: "var(--primary-soft)", featured: false },
  { id: 3, name: "Next.js Experts", members: "15.2k", online: "1.1k", Icon: Zap, color: "var(--accent)", bg: "var(--accent-soft)", featured: false },
]

const MY_GROUPS = [
  { name: "Go Microservices", role: "Arquitectos",    Icon: Terminal, members: "4.2k", count: "+12" },
  { name: "Typescript Pro",   role: "Hub de lenguaje", Icon: Layers,  members: "21k",  count: "+55" },
  { name: "K8s Masters",      role: "Cloud Nativo",   Icon: Cloud,    members: "3.8k", count: "+9"  },
]

const DISCUSSIONS = [
  {
    community: "Rustaceans", communityColor: "var(--primary)",
    author: "@oxide_dev", time: "hace 4h",
    title: "An\u00e1lisis profundo de la gesti\u00f3n de memoria en v1.75: Lo que necesitas saber",
    text: "La \u00faltima versi\u00f3n trae mejoras significativas en c\u00f3mo manejamos las asignaciones de memoria concurrentes.",
    comments: 128, shares: 42,
  },
  {
    community: "Next.js Experts", communityColor: "var(--accent)",
    author: "@frontend_queen", time: "hace 8h",
    title: "Son las Server Actions el clavo final para las librer\u00edas API del lado del cliente?",
    text: "Con la estabilizaci\u00f3n de las Server Actions, la frontera entre cliente y servidor se difumina m\u00e1s que nunca.",
    comments: 312, shares: 15,
  },
]

const CONTRIBUTORS = [
  { initials: "SC", name: "@sarah_codes", role: "Experta en Rust",  points: "+2.4k", color: "var(--primary)", bg: "var(--primary-soft)" },
  { initials: "DG", name: "@dev_guru",    role: "Gur\u00fa de Web3",     points: "+1.8k", color: "var(--accent)",  bg: "var(--accent-soft)" },
  { initials: "VS", name: "@v_scale",     role: "Arquitecto",       points: "+1.1k", color: "var(--secondary)", bg: "var(--secondary-soft)" },
]

export default function Comunidades() {
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [joined, setJoined] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="px-6 py-6 max-w-[760px] mx-auto">
      <section className="mb-8">
        <h1 className="text-[48px] font-black tracking-[-2px] text-[var(--text-h)] leading-[1.1] mb-3">
          Encuentra tu <br /><span className="gradient-text italic">colectivo.</span>
        </h1>
        <p className="text-sm text-[var(--text)] leading-[1.7] max-w-[460px] m-0">
          Con\u00e9ctate con desarrolladores que construyen el futuro. \u00danete a hubs especializados de experiencia.
        </p>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-8" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 px-5 py-2 rounded-full text-xs font-bold cursor-pointer border-2 transition-all duration-[var(--duration-fast)] ${
              activeFilter === f
                ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-[var(--shadow-glow)]"
                : "bg-[var(--bg-surface)] text-[var(--text-soft)] border-[var(--border)] hover:border-[var(--primary-border)] hover:text-[var(--primary)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton variant="rect" width="100%" height={120} className="rounded-[var(--radius-2xl)]" />
          <Skeleton variant="rect" width="100%" height={80} className="rounded-[var(--radius-2xl)]" />
        </div>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-4 flex items-center gap-2">
              <Zap size={12} className="text-[var(--accent)]" strokeWidth={2} />
              Tendencias
            </h2>
            <div className="grid gap-3">
              {TRENDING.map(t => (
                <div
                  key={t.id}
                  className={`rounded-[var(--radius-2xl)] p-5 cursor-pointer transition-all duration-[var(--duration-fast)] ${
                    t.featured
                      ? "bg-gradient-to-br from-[var(--primary-soft)] to-[var(--secondary-soft)] border border-[var(--primary-border)] hover:shadow-[var(--shadow-glow)]"
                      : "bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary-border)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base font-extrabold text-[var(--text-h)]">{t.name}</span>
                        {t.badge && <Badge variant="premium">{t.badge}</Badge>}
                      </div>
                      {t.desc && (
                        <p className="text-xs text-[var(--text)] leading-[1.6] mb-2">{t.desc}</p>
                      )}
                      <div className="text-[11px] text-[var(--text-soft)]">
                        <Users size={11} className="inline mr-1" />
                        {t.members} miembros
                        {t.online && (
                          <>
                            <span className="mx-2">·</span>
                            <span className="text-[var(--online)]">{t.online} online</span>
                          </>
                        )}
                      </div>
                    </div>
                    {t.featured && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setJoined(j => ({ ...j, [t.name]: true }))}
                      >
                        {joined[t.name] ? "Unido" : "Unirse"}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-4">
              Mis grupos
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {MY_GROUPS.map(g => (
                <div
                  key={g.name}
                  className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-xl)] p-4 cursor-pointer hover:border-[var(--primary-border)] hover:shadow-[var(--shadow-glow)] transition-all duration-[var(--duration-fast)] min-w-[180px] flex-1"
                >
                  <div className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center mb-3" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
                    <g.Icon size={14} strokeWidth={1.8} />
                  </div>
                  <div className="text-sm font-bold text-[var(--text-h)] mb-0.5">{g.name}</div>
                  <div className="text-[10px] text-[var(--text-soft)]">{g.role}</div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">{g.members} miembros</span>
                    <span className="text-[10px] font-bold text-[var(--online)]">{g.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-4 flex items-center gap-2">
              <MessageSquare size={12} className="text-[var(--primary)]" strokeWidth={2} />
              Discusiones globales
            </h2>
            <div className="space-y-3">
              {DISCUSSIONS.map((d, i) => (
                <div
                  key={i}
                  className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-xl)] p-5 cursor-pointer hover:border-[var(--primary-border)] transition-all duration-[var(--duration-fast)]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="accent" className="!text-[8px]">{d.community}</Badge>
                    <span className="text-[10px] text-[var(--text-soft)]">{d.author}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">· {d.time}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[var(--text-h)] mb-1.5">{d.title}</h3>
                  <p className="text-xs text-[var(--text)] leading-[1.6] mb-3">{d.text}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-[var(--text-soft)] flex items-center gap-1">
                      <MessageSquare size={11} strokeWidth={1.8} /> {d.comments}
                    </span>
                    <span className="text-[10px] text-[var(--text-soft)] flex items-center gap-1">
                      <Share2 size={11} strokeWidth={1.8} /> {d.shares}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-4">
              Top contribuidores
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {CONTRIBUTORS.map(c => (
                <div
                  key={c.name}
                  className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-xl)] p-4 text-center cursor-pointer hover:border-[var(--primary-border)] transition-all duration-[var(--duration-fast)]"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white mx-auto mb-2"
                    style={{ background: c.bg, color: c.color }}
                  >
                    {c.initials}
                  </div>
                  <div className="text-[11px] font-bold text-[var(--text-h)]">{c.name}</div>
                  <div className="text-[9px] text-[var(--text-soft)] mb-1.5">{c.role}</div>
                  <div className="text-[10px] font-bold text-[var(--primary)]">{c.points} pts</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-[var(--primary-soft)] via-[var(--bg-surface)] to-[var(--secondary-soft)] border border-[var(--primary-border)] rounded-[var(--radius-3xl)] p-8 text-center">
            <h2 className="text-2xl font-black text-[var(--text-h)] mb-2">Impulsa tu comunidad</h2>
            <p className="text-sm text-[var(--text)] mb-5 max-w-[400px] mx-auto">
              Obt\u00e9n herramientas de an\u00e1lisis, moderaci\u00f3n avanzada y soporte prioritario para tu comunidad.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary" size="md">
                Ver planes <ArrowUpRight size={13} strokeWidth={2.5} />
              </Button>
              <Button variant="outline" size="md">
                M\u00e1s informaci\u00f3n
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
