"use client"

import React, { useState } from "react"
import {
  DollarSign, Clock, MapPin, Star, Users, Filter, Search,
  Briefcase, ArrowUpRight, CheckCircle, Globe, Zap, Shield,
  TrendingUp, MessageSquare, ChevronDown,
} from "lucide-react"
import { useToast } from "@/components/ui/Toast"

type GigType = "all" | "fixed" | "hourly" | "retainer"

const MOCK_GIGS = [
  {
    id: "g1", title: "Smart Contract Audit", company: "CryptoNest", companyInitials: "CN", companyColor: "#f59e0b",
    budget: "$5,000 - $10,000", type: "fixed", duration: "2 semanas", location: "Remote",
    description: "Auditoría completa de smart contracts DeFi. Requiere experiencia en seguridad y herramientas como Slither, Mythril.",
    skills: ["Solidity", "Security", "Foundry"], posted: "Hace 2h", proposals: 8, featured: true,
    rating: 4.9, budgetUSD: 7500,
  },
  {
    id: "g2", title: "Rust Performance Optimization", company: "NexusLabs", companyInitials: "NL", companyColor: "#c49aff",
    budget: "$150 - $200/h", type: "hourly", duration: "1 mes", location: "Remote",
    description: "Optimizar el rendimiento de un runtime en Rust. Benchmarks, profiling, y reducción de latencia.",
    skills: ["Rust", "Performance", "Profiling"], posted: "Hace 5h", proposals: 3, featured: false,
    rating: 4.8, budgetUSD: 175,
  },
  {
    id: "g3", title: "Full-Stack Dashboard", company: "HelixData", companyInitials: "HD", companyColor: "#4ade80",
    budget: "$3,000 - $5,000", type: "fixed", duration: "3 semanas", location: "Remote",
    description: "Desarrollar dashboard de métricas en tiempo real con Next.js, WebSockets, y gráficos interactivos.",
    skills: ["TypeScript", "React", "WebSockets", "D3"], posted: "Hace 1d", proposals: 12, featured: false,
    rating: 4.7, budgetUSD: 4000,
  },
  {
    id: "g4", title: "DevOps Infrastructure", company: "VoidStack", companyInitials: "VS", companyColor: "#60a5fa",
    budget: "$200/hr", type: "retainer", duration: "3 meses", location: "Remote",
    description: "Consultoría DevOps: diseño de infraestructura, CI/CD, monitoreo, y optimización de costes cloud.",
    skills: ["Kubernetes", "Terraform", "AWS", "CI/CD"], posted: "Hace 3d", proposals: 5, featured: true,
    rating: 4.9, budgetUSD: 200,
  },
]

function GigCard({ gig }: { gig: typeof MOCK_GIGS[0] }) {
  return (
    <div className={`bg-bg-surface border rounded-[14px] p-5 transition-all hover:border-accent-border ${
      gig.featured ? "border-accent-border" : "border-border"
    }`}>
      {gig.featured && (
        <div className="flex items-center gap-1.5 mb-3">
          <Zap size={11} className="text-accent" strokeWidth={2.5} />
          <span className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-accent">Featured</span>
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[12px] font-bold shrink-0"
          style={{ background: `${gig.companyColor}18`, color: gig.companyColor }}>
          {gig.companyInitials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-extrabold text-text-h m-0 mb-1">{gig.title}</h3>
          <span className="text-[11px] text-text opacity-60">{gig.company}</span>
          <p className="text-[11px] text-text leading-[1.6] m-0 my-2 opacity-80">{gig.description}</p>
          <div className="flex gap-1.5 flex-wrap mb-3">
            {gig.skills.map(s => (
              <span key={s} className="bg-accent-bg text-accent border border-accent-border text-[9px] font-bold px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[10px] text-text flex-wrap">
            <span className="flex items-center gap-1 font-bold text-success"><DollarSign size={10} strokeWidth={2.5} /> {gig.budget}</span>
            <span className="flex items-center gap-1"><Clock size={10} strokeWidth={2} /> {gig.duration}</span>
            <span className="flex items-center gap-1"><Globe size={10} strokeWidth={2} /> {gig.location}</span>
            <span className="flex items-center gap-1"><Users size={10} strokeWidth={2} /> {gig.proposals} propuestas</span>
            <span className="flex items-center gap-1"><Star size={10} strokeWidth={2} /> {gig.rating}</span>
            <span className="ml-auto opacity-60">{gig.posted}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-accent text-[#1a0033] border-none rounded-[8px] py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity flex items-center justify-center gap-1.5">
          <Send size={11} strokeWidth={2.5} /> Enviar propuesta
        </button>
        <button className="bg-transparent text-text border border-border rounded-[8px] px-4 py-2 text-[11px] font-bold cursor-pointer hover:border-accent-border transition-colors">
          Guardar
        </button>
      </div>
    </div>
  )
}

function Send({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/>
    </svg>
  )
}

export default function FreelancePage() {
  const { success } = useToast()
  const [filter, setFilter] = useState<GigType>("all")
  const [search, setSearch] = useState("")

  const filtered = MOCK_GIGS.filter(g => {
    if (filter !== "all" && g.type !== filter) return false
    if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto">
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase size={16} className="text-accent" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Freelancing</span>
        </div>
        <h1 className="text-[32px] font-black tracking-[-1.5px] text-text-h leading-[1.1] mb-2">
          Gigs <span className="gradient-text italic">técnicos</span>
        </h1>
        <p className="text-[13px] text-text leading-[1.7] max-w-[500px] opacity-80">
          Encuentra proyectos freelance de alta calidad. Auditorías, consultorías, desarrollo por contrato.
        </p>
      </section>

      <div className="flex items-center gap-2.5 bg-bg-surface border border-border rounded-[12px] px-4 py-3 mb-4">
        <Search size={15} className="text-text opacity-50 shrink-0" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar gigs..."
          className="bg-transparent border-none outline-none text-[13px] text-text-h w-full" />
      </div>

      <div className="flex gap-1.5 mb-6">
        {([
          { key: "all" as GigType, label: "Todos" },
          { key: "fixed" as GigType, label: "Precio fijo" },
          { key: "hourly" as GigType, label: "Por hora" },
          { key: "retainer" as GigType, label: "Retainer" },
        ]).map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold cursor-pointer border transition-all ${
              filter === key ? "bg-accent text-[#1a0033] border-accent" : "bg-transparent text-text border-border hover:border-accent-border"
            }`}>{label}</button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map(g => <GigCard key={g.id} gig={g} />)}
      </div>
    </div>
  )
}
