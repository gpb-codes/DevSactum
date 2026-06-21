"use client"

import React, { useState } from "react"
import {
  Search, MapPin, Clock, Users, Star, ArrowUpRight, Building2,
  Filter, Bookmark, BookmarkCheck, DollarSign, Globe, Zap, Flame,
  ChevronDown, Briefcase, TrendingUp, ChevronUp, CheckCircle,
  ExternalLink, Send,
} from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"
import { useJobAuth } from "@/context/JobAuthContext"
import { MOCK_JOBS } from "@/lib/mock-jobs"
import { setApplyJobId } from "@/lib/apply-state"
import type { JobListing, JobType, ExperienceLevel } from "@/types"

const JOB_TYPES: { key: JobType | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "full-time", label: "Full-time" },
  { key: "part-time", label: "Part-time" },
  { key: "contract", label: "Contract" },
  { key: "freelance", label: "Freelance" },
  { key: "internship", label: "Internship" },
]

const EXP_LEVELS: { key: ExperienceLevel | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "junior", label: "Junior" },
  { key: "mid", label: "Mid" },
  { key: "senior", label: "Senior" },
  { key: "lead", label: "Lead" },
]

function formatSalary(min: number, max: number, currency: string, type: string) {
  if (type === "internship") return `$${(min / 1000).toFixed(0)}k/mo`
  if (type === "contract") return `$${min}-${max}/h`
  return `$${(min / 1000).toFixed(0)}k – $${(max / 1000).toFixed(0)}k`
}

function JobCard({ job, onBookmark, bookmarked, onApply }: { job: JobListing; onBookmark: () => void; bookmarked: boolean; onApply: () => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        className={`bg-bg-surface border rounded-[14px] p-5 transition-all duration-200 cursor-pointer group ${
          job.featured ? "border-accent-border hover:shadow-glow" : "border-border hover:border-accent-border"
        } ${expanded ? "rounded-b-none border-b-0" : ""}`}
      >
        {job.featured && (
          <div className="flex items-center gap-1.5 mb-3">
            <Star size={11} className="text-accent" fill="currentColor" strokeWidth={0} />
            <span className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-accent">Destacado</span>
            {job.urgent && (
              <span className="ml-1 text-[9px] font-extrabold uppercase tracking-[1.5px] text-danger bg-danger-soft border border-[rgba(248,113,113,0.3)] px-1.5 py-0.5 rounded-full">
                Urgente
              </span>
            )}
          </div>
        )}

        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0"
            style={{ background: job.company.avatarBg, color: job.company.avatarColor }}
          >
            {job.company.initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="text-[14px] font-extrabold text-text-h m-0 group-hover:text-accent transition-colors leading-[1.3]">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[12px] font-semibold text-text">{job.company.name}</span>
                  {job.company.verified && (
                    <span className="text-[9px] font-bold text-online bg-success-soft border border-[rgba(74,222,128,0.3)] px-1.5 py-0.5 rounded-full">✓</span>
                  )}
                  {job.company.premium && (
                    <span className="text-[9px] font-bold text-accent bg-accent-bg border border-accent-border px-1.5 py-0.5 rounded-full">PRO</span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onBookmark() }}
                className="bg-transparent border-none cursor-pointer p-1 text-text hover:text-accent transition-colors shrink-0"
              >
                {bookmarked ? <BookmarkCheck size={16} className="text-accent" strokeWidth={2} /> : <Bookmark size={16} strokeWidth={1.8} />}
              </button>
            </div>

            <div className="flex items-center gap-3 mt-2.5 text-[11px] text-text flex-wrap">
              <span className="flex items-center gap-1"><MapPin size={11} strokeWidth={2} />{job.location}</span>
              {job.remote && <span className="flex items-center gap-1 text-online"><Globe size={11} strokeWidth={2} />Remoto</span>}
              <span className="flex items-center gap-1"><Clock size={11} strokeWidth={2} />{job.postedAt}</span>
              <span className="flex items-center gap-1"><Users size={11} strokeWidth={2} />{job.applicants} postulados</span>
            </div>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="bg-bg-hover border border-border text-text text-[10px] font-bold px-2.5 py-0.5 rounded-full">{job.type}</span>
              <span className="bg-bg-hover border border-border text-text text-[10px] font-bold px-2.5 py-0.5 rounded-full">{job.experience}</span>
              <span className="flex items-center gap-1 bg-success-soft border border-[rgba(74,222,128,0.2)] text-success text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                <DollarSign size={9} strokeWidth={2.5} />
                {formatSalary(job.salaryMin, job.salaryMax, job.currency, job.type)}
              </span>
            </div>

            <div className="flex gap-1.5 mt-3 flex-wrap">
              {job.tags.map(tag => (
                <span key={tag} className="bg-accent-bg text-accent border border-accent-border text-[9px] font-bold px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 mt-3 text-[10px] font-semibold text-text opacity-50">
              {expanded ? <ChevronUp size={12} strokeWidth={2.5} /> : <ChevronDown size={12} strokeWidth={2.5} />}
              {expanded ? "Mostrar menos" : "Ver detalles"}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="bg-bg-surface border border-t-0 rounded-b-[14px] px-5 pb-6 animate-fade-in" style={{ borderColor: job.featured ? "var(--color-accent-border)" : "var(--color-border)" }}>
          <div className="h-px bg-border mb-5" />

          {/* Description */}
          <div className="mb-5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Descripción</h4>
            <p className="text-[13px] text-text leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="mb-5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Requisitos</h4>
            <div className="flex flex-col gap-1.5">
              {job.requirements.map(req => (
                <div key={req} className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-accent shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-[12px] text-text">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Beneficios</h4>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map(b => (
                <span key={b} className="bg-success-soft border border-[rgba(74,222,128,0.2)] text-success text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Company info */}
          <div className="bg-bg border border-border rounded-[10px] p-4 mb-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-[8px] flex items-center justify-center text-[13px] font-black" style={{ background: job.company.avatarBg, color: job.company.avatarColor }}>
                {job.company.initials}
              </div>
              <div>
                <h5 className="text-[13px] font-bold text-text-h m-0">{job.company.name}</h5>
                <p className="text-[10px] text-text opacity-70 m-0">{job.company.industry} · {job.company.size} empleados</p>
              </div>
            </div>
            <p className="text-[12px] text-text mt-2 leading-relaxed">{job.company.description}</p>
            <a
              href={job.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-accent mt-1 hover:underline"
            >
              <ExternalLink size={11} strokeWidth={2} />
              {job.company.website.replace("https://", "")}
            </a>
          </div>

          {/* Apply */}
          <button
            onClick={(e) => { e.stopPropagation(); onApply() }}
            className="w-full h-[44px] rounded-[9px] bg-accent text-[#1a0033] border-none flex items-center justify-center gap-2 text-[13px] font-extrabold cursor-pointer hover:opacity-85 transition-opacity"
          >
            <Send size={14} strokeWidth={2.5} />
            Postularme ahora
          </button>
        </div>
      )}
    </div>
  )
}

export default function JobBoard() {
  const { setActivePage } = useNav()
  const { success } = useToast()
  const { isAuthenticated } = useJobAuth()

  function handleApply(jobId: string) {
    setApplyJobId(jobId)
    setActivePage("Postulación")
  }
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<JobType | "all">("all")
  const [expFilter, setExpFilter] = useState<ExperienceLevel | "all">("all")
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({})
  const [showFilters, setShowFilters] = useState(false)

  const filteredJobs = MOCK_JOBS.filter(job => {
    if (search && !job.title.toLowerCase().includes(search.toLowerCase()) && !job.company.name.toLowerCase().includes(search.toLowerCase()) && !job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false
    if (typeFilter !== "all" && job.type !== typeFilter) return false
    if (expFilter !== "all" && job.experience !== expFilter) return false
    if (remoteOnly && !job.remote) return false
    return true
  })

  const featuredJobs = filteredJobs.filter(j => j.featured)
  const regularJobs = filteredJobs.filter(j => !j.featured)

  return (
    <div className="px-6 py-6 max-w-[820px] mx-auto">
      {/* Header */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Bolsa de Empleo</span>
        </div>
        <h1 className="text-[42px] font-black tracking-[-2px] text-text-h leading-[1.05] mb-3">
          Tu próximo<br />
          <span className="gradient-text italic">reto tech.</span>
        </h1>
        <p className="text-[14px] text-text leading-[1.7] max-w-[420px] m-0 opacity-80">
          Empleos verificados de empresas que valoran el talento developer. Remoto, global, transparente.
        </p>
      </section>

      {/* Auth CTA */}
      {!isAuthenticated && (
        <div className="flex items-center justify-between bg-bg-surface border border-accent-border rounded-[14px] p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[9px] bg-accent-bg border border-accent-border flex items-center justify-center">
              <Briefcase size={16} className="text-accent" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-text-h m-0">¿Buscas empleo o talento?</p>
              <p className="text-[11px] text-text m-0 opacity-70">Crea tu cuenta para postularte o publicar ofertas</p>
            </div>
          </div>
          <button
            onClick={() => setActivePage("Login")}
            className="flex items-center gap-1.5 bg-accent text-[#1a0033] border-none rounded-[8px] px-4 py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity shrink-0"
          >
            Empezar <ArrowUpRight size={12} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* Stats bar */}
      <div className="flex gap-4 mb-6 text-[12px]">
        {[
          { label: "Empleos activos", value: MOCK_JOBS.length.toString(), icon: Briefcase },
          { label: "Empresas", value: "5", icon: Building2 },
          { label: "Postulaciones", value: MOCK_JOBS.reduce((a, j) => a + j.applicants, 0).toString(), icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-2 bg-bg-surface border border-border rounded-[10px] px-3.5 py-2.5">
            <Icon size={13} className="text-accent" strokeWidth={2} />
            <span className="font-bold text-text-h">{value}</span>
            <span className="text-text opacity-60">{label}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2.5 bg-bg-surface border border-border rounded-[12px] px-4 py-3 mb-4">
        <Search size={15} className="text-text opacity-50 shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por título, empresa o tecnología..."
          className="bg-transparent border-none outline-none text-[13px] text-text-h w-full"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-bold border cursor-pointer transition-all ${
            showFilters ? "bg-accent text-[#1a0033] border-accent" : "bg-transparent text-text border-border hover:border-accent-border"
          }`}
        >
          <Filter size={12} strokeWidth={2} /> Filtros
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-bg-surface border border-border rounded-[12px] p-4 mb-6 animate-fade-in">
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-text opacity-60 block mb-2">Tipo</span>
              <div className="flex gap-1.5 flex-wrap">
                {JOB_TYPES.map(t => (
                  <button key={t.key} onClick={() => setTypeFilter(t.key)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer border transition-all ${
                      typeFilter === t.key ? "bg-accent text-[#1a0033] border-accent" : "bg-transparent text-text border-border hover:border-accent-border"
                    }`}>{t.label}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-text opacity-60 block mb-2">Nivel</span>
              <div className="flex gap-1.5 flex-wrap">
                {EXP_LEVELS.map(e => (
                  <button key={e.key} onClick={() => setExpFilter(e.key)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer border transition-all ${
                      expFilter === e.key ? "bg-accent text-[#1a0033] border-accent" : "bg-transparent text-text border-border hover:border-accent-border"
                    }`}>{e.label}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-text opacity-60 block mb-2">Modalidad</span>
              <button
                onClick={() => setRemoteOnly(!remoteOnly)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer border transition-all ${
                  remoteOnly ? "bg-accent text-[#1a0033] border-accent" : "bg-transparent text-text border-border hover:border-accent-border"
                }`}
              >
                <Globe size={10} strokeWidth={2.5} /> Solo remoto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured jobs */}
      {featuredJobs.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame size={14} className="text-accent" strokeWidth={2} />
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Destacados</span>
          </div>
          <div className="flex flex-col gap-3">
            {featuredJobs.map((job, idx) => (
              <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <JobCard job={job} bookmarked={!!bookmarks[job.id]} onApply={() => handleApply(job.id)} onBookmark={() => {
                  setBookmarks(p => ({ ...p, [job.id]: !p[job.id] }))
                  if (!bookmarks[job.id]) success("Guardado", "Oferta guardada en tu lista")
                }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Regular jobs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-text opacity-60" strokeWidth={2} />
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">
              Todas las ofertas ({filteredJobs.length})
            </span>
          </div>
          <button className="text-[11px] text-accent font-bold bg-transparent border-none cursor-pointer flex items-center gap-1">
            Más recientes <ChevronDown size={11} strokeWidth={2.5} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {regularJobs.map((job, idx) => (
            <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${idx * 40}ms` }}>
              <JobCard job={job} bookmarked={!!bookmarks[job.id]} onApply={() => handleApply(job.id)} onBookmark={() => {
                setBookmarks(p => ({ ...p, [job.id]: !p[job.id] }))
                if (!bookmarks[job.id]) success("Guardado", "Oferta guardada en tu lista")
              }} />
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <Search size={40} className="mx-auto text-text opacity-20 mb-4" strokeWidth={1.5} />
            <p className="text-[14px] font-bold text-text-h m-0 mb-1">No se encontraron empleos</p>
            <p className="text-[12px] text-text opacity-60 m-0">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </section>

      {/* Company CTA */}
      <div className="mt-10 bg-bg-surface border border-border rounded-[14px] p-6 text-center">
        <Building2 size={28} className="mx-auto text-accent mb-3" strokeWidth={1.5} />
        <h3 className="text-[18px] font-black text-text-h m-0 mb-2">¿Eres empresa?</h3>
        <p className="text-[12px] text-text mb-4 max-w-[320px] mx-auto opacity-70">
          Publica ofertas y encuentra a los mejores developers del ecosistema. Empieza gratis.
        </p>
        <button
          onClick={() => setActivePage("Login")}
          className="bg-accent text-[#1a0033] border-none rounded-[10px] px-6 py-2.5 text-[12px] font-extrabold cursor-pointer hover:opacity-85 transition-opacity"
        >
          Publicar empleo gratis
        </button>
      </div>
    </div>
  )
}
