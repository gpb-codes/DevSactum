"use client"

import React, { useState } from "react"
import {
  Briefcase, Users, Eye, CheckCircle, Clock, XCircle, ArrowUpRight,
  Plus, BarChart3, TrendingUp, MessageSquare, Star, Filter,
  ChevronDown, Building2, Globe, MapPin, DollarSign, Send,
} from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"
import { useJobAuth } from "@/context/JobAuthContext"
import { MOCK_JOBS, MOCK_APPLICATIONS, MOCK_DASHBOARD_STATS } from "@/lib/mock-jobs"
import type { JobApplication } from "@/types"

const STATUS_CONFIG: Record<JobApplication["status"], { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending:     { label: "Pendiente",    color: "text-text",       bg: "bg-bg-hover",       icon: Clock },
  reviewed:    { label: "Revisado",     color: "text-secondary",  bg: "bg-secondary-soft", icon: Eye },
  shortlisted: { label: "Preseleccionado", color: "text-accent",  bg: "bg-accent-bg",     icon: Star },
  interview:   { label: "Entrevista",   color: "text-success",    bg: "bg-success-soft",   icon: MessageSquare },
  offered:     { label: "Oferta",       color: "text-primary",    bg: "bg-primary-soft",   icon: CheckCircle },
  rejected:    { label: "Rechazado",    color: "text-danger",     bg: "bg-danger-soft",    icon: XCircle },
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-bg-surface border border-border rounded-[14px] p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={color} strokeWidth={2} />
        <span className="text-[10px] font-bold uppercase tracking-[1px] text-text opacity-60">{label}</span>
      </div>
      <span className="text-[26px] font-black text-text-h tracking-[-1px]">{value}</span>
    </div>
  )
}

function PostulantRow({ app }: { app: JobApplication }) {
  const [status, setStatus] = useState(app.status)
  const config = STATUS_CONFIG[status]
  const StatusIcon = config.icon

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border animate-fade-in">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
        style={{ background: app.developerBg, color: app.developerColor }}>
        {app.developerInitials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-bold text-text-h">{app.developerName}</span>
          <span className="text-[11px] text-text opacity-50">{app.developerHandle}</span>
        </div>
        <p className="text-[11px] text-text opacity-70 m-0 truncate">{app.coverLetter}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-text opacity-50">{app.appliedAt}</span>
          <span className="text-[10px] text-accent underline">{app.portfolio}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${config.color} ${config.bg}`}>
          <StatusIcon size={10} strokeWidth={2.5} /> {config.label}
        </span>
        <div className="relative group">
          <button className="bg-transparent border border-border text-text rounded-[6px] px-2 py-1 text-[10px] font-bold cursor-pointer hover:border-accent-border transition-colors">
            Acción <ChevronDown size={9} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CompanyDashboard() {
  const { setActivePage } = useNav()
  const { success } = useToast()
  const { user } = useJobAuth()
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "applicants" | "post">("overview")
  const [showPostForm, setShowPostForm] = useState(false)
  const [postForm, setPostForm] = useState({ title: "", location: "", type: "full-time", remote: true, salaryMin: "", salaryMax: "", description: "" })

  const stats = MOCK_DASHBOARD_STATS
  const myJobs = MOCK_JOBS.slice(0, 3)
  const myApps = MOCK_APPLICATIONS

  function handlePostJob(e: React.FormEvent) {
    e.preventDefault()
    if (!postForm.title || !postForm.description) return
    success("Empleo publicado", `"${postForm.title}" ya está visible en la bolsa`)
    setShowPostForm(false)
    setPostForm({ title: "", location: "", type: "full-time", remote: true, salaryMin: "", salaryMax: "", description: "" })
  }

  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto">
      {/* Header */}
      <section className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={16} className="text-accent" strokeWidth={2} />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Panel de Empresa</span>
            </div>
            <h1 className="text-[28px] font-black tracking-[-1px] text-text-h m-0">
              {user?.companyName || user?.name || "Mi Empresa"}
            </h1>
          </div>
          <button
            onClick={() => setActivePage("Empleo Premium")}
            className="flex items-center gap-1.5 bg-accent text-[#1a0033] border-none rounded-[9px] px-4 py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity"
          >
            <Star size={12} strokeWidth={2.5} /> Premium
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {[
          { key: "overview" as const, label: "Resumen", icon: BarChart3 },
          { key: "jobs" as const, label: "Mis empleos", icon: Briefcase },
          { key: "applicants" as const, label: "Postulantes", icon: Users },
          { key: "post" as const, label: "Publicar", icon: Plus },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => { setActiveTab(key); if (key === "post") setShowPostForm(true) }}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] cursor-pointer border-none bg-transparent border-b-2 -mb-px transition-colors duration-150 ${
              activeTab === key ? "border-accent text-accent font-bold" : "border-transparent text-text font-medium hover:text-text-h"
            }`}>
            <Icon size={13} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-4 gap-3 mb-6">
            <StatCard label="Empleos" value={stats.totalJobs.toString()} icon={Briefcase} color="text-accent" />
            <StatCard label="Postulantes" value={stats.totalApplicants.toString()} icon={Users} color="text-secondary" />
            <StatCard label="Preseleccionados" value={stats.shortlisted.toString()} icon={Star} color="text-warning" />
            <StatCard label="Contratados" value={stats.hired.toString()} icon={CheckCircle} color="text-success" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg-surface border border-border rounded-[14px] p-5">
              <h3 className="text-[13px] font-extrabold text-text-h m-0 mb-4">Empleos Activos</h3>
              {myJobs.map(job => (
                <div key={job.id} className="flex items-center gap-3 py-3 border-b border-border last:border-none">
                  <div className="w-8 h-8 rounded-[8px] bg-accent-bg border border-accent-border flex items-center justify-center">
                    <Briefcase size={13} className="text-accent" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-text-h m-0 truncate">{job.title}</p>
                    <p className="text-[10px] text-text opacity-60 m-0">{job.applicants} postulados</p>
                  </div>
                  <ArrowUpRight size={12} className="text-text opacity-40" strokeWidth={2} />
                </div>
              ))}
            </div>

            <div className="bg-bg-surface border border-border rounded-[14px] p-5">
              <h3 className="text-[13px] font-extrabold text-text-h m-0 mb-4">Actividad Reciente</h3>
              {[
                { text: "Sarah Chen se postuló a Senior Rust Engineer", time: "Hace 1h", color: "bg-success" },
                { text: "Alex Rivet fue preseleccionado", time: "Hace 3h", color: "bg-accent" },
                { text: "Nueva postulación para ML Platform Engineer", time: "Hace 5h", color: "bg-secondary" },
                { text: "Dev Guru completó entrevista técnica", time: "Hace 8h", color: "bg-primary" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-border last:border-none">
                  <div className={`w-2 h-2 rounded-full ${item.color} mt-1.5 shrink-0`} />
                  <div>
                    <p className="text-[12px] text-text-h m-0">{item.text}</p>
                    <p className="text-[10px] text-text opacity-50 m-0 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* My Jobs */}
      {activeTab === "jobs" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold text-text-h">{myJobs.length} empleos publicados</span>
            <button onClick={() => { setActiveTab("post"); setShowPostForm(true) }}
              className="flex items-center gap-1.5 bg-accent text-[#1a0033] border-none rounded-[8px] px-3 py-1.5 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity">
              <Plus size={12} strokeWidth={2.5} /> Nuevo empleo
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {myJobs.map((job, idx) => (
              <div key={job.id} className="bg-bg-surface border border-border rounded-[14px] p-5 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[14px] font-extrabold text-text-h m-0">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-text">
                      <span className="flex items-center gap-1"><MapPin size={10} strokeWidth={2} />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} strokeWidth={2} />{job.postedAt}</span>
                      <span className="flex items-center gap-1"><Users size={10} strokeWidth={2} />{job.applicants}</span>
                    </div>
                  </div>
                  <span className="bg-success-soft text-success text-[10px] font-bold px-2.5 py-0.5 rounded-full">Activo</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {job.tags.map(tag => (
                    <span key={tag} className="bg-accent-bg text-accent border border-accent-border text-[9px] font-bold px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applicants */}
      {activeTab === "applicants" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold text-text-h">{myApps.length} postulantes</span>
            <button className="flex items-center gap-1 bg-transparent border border-border text-text rounded-[8px] px-3 py-1.5 text-[11px] font-bold cursor-pointer hover:border-accent-border transition-colors">
              <Filter size={11} strokeWidth={2} /> Filtrar
            </button>
          </div>
          <div className="bg-bg-surface border border-border rounded-[14px] px-5">
            {myApps.map(app => <PostulantRow key={app.id} app={app} />)}
          </div>
        </div>
      )}

      {/* Post form */}
      {activeTab === "post" && showPostForm && (
        <div className="bg-bg-surface border border-border rounded-[18px] p-7 animate-fade-in max-w-[600px]">
          <h2 className="text-[18px] font-black text-text-h m-0 mb-6">Publicar nuevo empleo</h2>
          <form onSubmit={handlePostJob}>
            <div className="mb-4">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Título del puesto</label>
              <input value={postForm.title} onChange={e => setPostForm(p => ({ ...p, title: e.target.value }))}
                placeholder="Senior Rust Engineer"
                className="w-full h-[44px] px-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Ubicación</label>
                <input value={postForm.location} onChange={e => setPostForm(p => ({ ...p, location: e.target.value }))}
                  placeholder="Remote / Ciudad"
                  className="w-full h-[44px] px-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Tipo</label>
                <select value={postForm.type} onChange={e => setPostForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full h-[44px] px-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors appearance-none cursor-pointer">
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Salario mínimo (USD)</label>
                <input type="number" value={postForm.salaryMin} onChange={e => setPostForm(p => ({ ...p, salaryMin: e.target.value }))}
                  placeholder="80000"
                  className="w-full h-[44px] px-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Salario máximo (USD)</label>
                <input type="number" value={postForm.salaryMax} onChange={e => setPostForm(p => ({ ...p, salaryMax: e.target.value }))}
                  placeholder="150000"
                  className="w-full h-[44px] px-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Descripción</label>
              <textarea value={postForm.description} onChange={e => setPostForm(p => ({ ...p, description: e.target.value }))}
                rows={5}
                placeholder="Describe el puesto, responsabilidades y lo que buscan..."
                className="w-full px-[14px] py-3 bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors resize-none leading-[1.6]" />
            </div>

            <div className="flex gap-3">
              <button type="submit"
                className="flex items-center gap-1.5 bg-accent text-[#1a0033] border-none rounded-[9px] px-5 py-2.5 text-[12px] font-extrabold cursor-pointer hover:opacity-85 transition-opacity">
                <Send size={13} strokeWidth={2.5} /> Publicar empleo
              </button>
              <button type="button" onClick={() => setShowPostForm(false)}
                className="bg-transparent border border-border text-text rounded-[9px] px-5 py-2.5 text-[12px] font-bold cursor-pointer hover:border-accent-border transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
