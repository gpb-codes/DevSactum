"use client"

import React, { useState } from "react"
import {
  Terminal, Zap, Layers, Cloud, Plus,
  MessageSquare, Share2, ArrowUpRight, Users,
} from "lucide-react"

const FILTERS = ["Todas", "Rust", "Web3", "TypeScript", "Cloud"]

const TRENDING = [
  {
    id: 1, name: "Web3 Builders", badge: "Crecimiento más rápido", featured: true,
    desc: "Construyendo el futuro descentralizado con Ethereum, Solana y contratos inteligentes en Rust.",
    members: "12.4k", Icon: null, color: "text-accent", bg: "bg-accent-bg",
  },
  {
    id: 2, name: "Rustaceans", members: "8.1k", online: "242",
    Icon: Terminal, color: "text-accent", bg: "bg-bg-hover", featured: false, badge: "", desc: "",
  },
  {
    id: 3, name: "Next.js Experts", members: "15.2k", online: "1.1k",
    Icon: Zap, color: "text-tertiary", bg: "bg-bg-hover", featured: false, badge: "", desc: "",
  },
]

const MY_GROUPS = [
  { name: "Go Microservices", role: "Arquitectos",    Icon: Terminal, members: "4.2k", count: "+12" },
  { name: "Typescript Pro",   role: "Hub de lenguaje", Icon: Layers,  members: "21k",  count: "+55" },
  { name: "K8s Masters",      role: "Cloud Nativo",   Icon: Cloud,    members: "3.8k", count: "+9"  },
]

const DISCUSSIONS = [
  {
    community: "Rustaceans", communityColor: "text-accent",
    author: "@oxide_dev", time: "hace 4h",
    title: "Análisis profundo de la gestión de memoria en v1.75: Lo que necesitas saber",
    text: "La última versión trae mejoras significativas en cómo manejamos las asignaciones de memoria concurrentes.",
    comments: 128, shares: 42,
  },
  {
    community: "Next.js Experts", communityColor: "text-tertiary",
    author: "@frontend_queen", time: "hace 8h",
    title: "¿Son las Server Actions el clavo final para las librerías API del lado del cliente?",
    text: "Con la estabilización de las Server Actions, la frontera entre cliente y servidor se difumina más que nunca.",
    comments: 312, shares: 15,
  },
]

const CONTRIBUTORS = [
  { initials: "SC", name: "@sarah_codes", role: "Experta en Rust",  points: "+2.4k", color: "#c49aff", bg: "rgba(196,154,255,.15)" },
  { initials: "DG", name: "@dev_guru",    role: "Gurú de Web3",     points: "+1.8k", color: "#ff94a8", bg: "rgba(255,148,168,.15)" },
  { initials: "VS", name: "@v_scale",     role: "Arquitecto",       points: "+1.1k", color: "#60a5fa", bg: "rgba(96,165,250,.12)" },
]

export default function Comunidades() {
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [joined, setJoined] = useState<Record<string, boolean>>({})

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

        {TRENDING.map((c) =>
          c.featured ? (
            <div key={c.id} className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 relative">
              <span className="bg-bg-hover text-accent border border-accent-border text-[9px] font-extrabold uppercase tracking-[1.5px] px-2.5 py-1 rounded-full inline-block mb-4">
                {c.badge}
              </span>
              <div className="text-[36px] font-black tracking-[-1.5px] text-text-h mb-2.5">{c.name}</div>
              <p className="text-[13px] text-text leading-[1.7] mb-5 max-w-[400px]">{c.desc}</p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-text-h">
                  <Users size={15} className="text-accent" strokeWidth={2} />
                  {c.members} miembros
                </div>
                <button
                  onClick={() => setJoined((p) => ({ ...p, [c.name]: !p[c.name] }))}
                  className={`px-7 py-2.5 rounded-[10px] text-[12px] font-extrabold cursor-pointer transition-all duration-150 border border-accent ${
                    joined[c.name] ? "bg-transparent text-accent" : "bg-accent text-[#1a0033]"
                  }`}
                >
                  {joined[c.name] ? "Unido ✓" : "Unirse al colectivo"}
                </button>
              </div>
            </div>
          ) : (
            <div key={c.id} className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[10px] ${c.bg} flex items-center justify-center shrink-0 ${c.color}`}>
                  {c.Icon && <c.Icon size={20} strokeWidth={1.8} />}
                </div>
                <div>
                  <div className="text-[20px] font-black tracking-[-0.5px] text-text-h mb-1">{c.name}</div>
                  <div className="text-[12px] text-text">{c.members} miembros · {c.online} en línea</div>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-text shrink-0" strokeWidth={1.8} />
            </div>
          )
        )}
      </section>

      {/* Mis grupos */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-text">Mis grupos</span>
        </div>

        {MY_GROUPS.map(({ name, role, Icon, members, count }) => (
          <div key={name} className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[10px] bg-bg-hover flex items-center justify-center shrink-0 text-accent">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[15px] font-bold text-text-h mb-0.5">{name}</div>
                <div className="text-[10px] font-extrabold uppercase tracking-[1px] text-text">{role}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-text mb-0.5">{count} más</div>
              <div className="text-[11px] text-text opacity-60">{members} mems</div>
            </div>
          </div>
        ))}

        {/* Crear colectivo */}
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

        {DISCUSSIONS.map((d) => (
          <div key={d.title} className="bg-bg-surface border border-border rounded-2xl p-6 mb-3 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 text-[12px] font-bold flex-wrap">
              <span className={d.communityColor}>{d.community}</span>
              <span className="opacity-30 text-text">•</span>
              <span className="text-text">Por <span className="text-text-h">{d.author}</span></span>
              <span className="opacity-30 text-text">•</span>
              <span className="text-text opacity-60">{d.time}</span>
            </div>
            <div className="text-[20px] font-black tracking-[-0.5px] text-text-h leading-[1.3] cursor-pointer">{d.title}</div>
            <p className="text-[13px] text-text leading-[1.7] m-0">{d.text}</p>
            <div className="flex gap-5 mt-1">
              <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold text-text p-0">
                <MessageSquare size={15} strokeWidth={1.8} /> {d.comments}
              </button>
              <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold text-text p-0">
                <Share2 size={15} strokeWidth={1.8} /> {d.shares}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Top contributors */}
      <section className="mb-12">
        <div className="text-[10px] font-extrabold uppercase tracking-[2px] text-accent mb-5">Mejores contribuidores</div>
        {CONTRIBUTORS.map((c) => (
          <div key={c.name} className="flex items-center justify-between py-3 border-b border-border cursor-pointer hover:opacity-80 transition-opacity duration-150">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold"
                style={{ background: c.bg, color: c.color }}
              >
                {c.initials}
              </div>
              <div>
                <div className="text-[13px] font-extrabold text-text-h">{c.name}</div>
                <div className="text-[10px] font-bold uppercase tracking-[1px] text-text">{c.role}</div>
              </div>
            </div>
            <span className="text-[13px] font-extrabold text-accent">{c.points}</span>
          </div>
        ))}
      </section>

      {/* CTA Premium */}
      <section className="bg-bg-surface border border-border rounded-[20px] p-7 mb-12">
        <div className="text-[24px] font-black tracking-[-0.5px] text-text-h mb-2">Construye junto a otros.</div>
        <p className="text-[13px] text-text leading-[1.7] mb-5">
          Actualiza a Sanctum Pro para colectivos privados e integraciones ilimitadas de repositorios.
        </p>
        <button className="w-full bg-text-h text-bg border-none rounded-[10px] py-3.5 text-[11px] font-black uppercase tracking-[2px] cursor-pointer hover:opacity-90 transition-opacity duration-150">
          Ir a Premium
        </button>
      </section>

    </div>
  )
}