"use client"

import React, { useState } from "react"
import {
  Code2, ExternalLink, Star, GitFork, GitBranch, Terminal,
  Layers, Zap, Globe, Shield, Database, Heart, Eye, Award,
  BarChart3, TrendingUp, Plus, Filter,
} from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useJobAuth } from "@/context/JobAuthContext"

type ProjectType = "all" | "repo" | "project" | "contribution"

const PROJECTS = [
  {
    id: 1, name: "lumina-engine", type: "repo" as const, lang: "Rust", langColor: "#f97316",
    desc: "High-performance async runtime for WebAssembly modules in edge environments.",
    stars: 12400, forks: 892, issues: 45, watchers: 230,
    tags: ["Rust", "Wasm", "Performance", "Edge"],
    activity: [80, 60, 90, 40, 70, 85, 95, 60, 75, 80, 90, 100],
    lastUpdate: "Hace 3h", featured: true,
  },
  {
    id: 2, name: "guardian-proxy", type: "repo" as const, lang: "Go", langColor: "#60a5fa",
    desc: "Layer 7 smart proxy with built-in eBPF observability and TLS termination.",
    stars: 4200, forks: 215, issues: 12, watchers: 89,
    tags: ["Go", "Proxy", "eBPF", "Networking"],
    activity: [50, 70, 60, 80, 90, 65, 75, 85, 70, 60, 80, 90],
    lastUpdate: "Hace 1d", featured: true,
  },
  {
    id: 3, name: "vector-db-core", type: "repo" as const, lang: "C++", langColor: "#f87171",
    desc: "Core engine for vector similarity search using HNSW indexing and SIMD acceleration.",
    stars: 28100, forks: 1400, issues: 67, watchers: 520,
    tags: ["C++", "Vector DB", "ML", "SIMD"],
    activity: [90, 85, 95, 80, 70, 90, 100, 85, 90, 95, 88, 92],
    lastUpdate: "Hace 5h", featured: true,
  },
  {
    id: 4, name: "devsanctum", type: "project" as const, lang: "TypeScript", langColor: "#3178c6",
    desc: "Red social para developers con matching laboral y herramientas IA.",
    stars: 890, forks: 120, issues: 23, watchers: 45,
    tags: ["Next.js", "TypeScript", "React", "AI"],
    activity: [40, 50, 60, 70, 80, 90, 100, 95, 85, 75, 80, 85],
    lastUpdate: "Ahora", featured: false,
  },
  {
    id: 5, name: "contrib: tokio-rs/tokio", type: "contribution" as const, lang: "Rust", langColor: "#f97316",
    desc: "Fixed race condition in multi-threaded scheduler. PR #5892 merged.",
    stars: 0, forks: 0, issues: 0, watchers: 0,
    tags: ["Rust", "Async", "Concurrency"],
    activity: [0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0],
    lastUpdate: "Hace 2 sem", featured: false,
  },
]

const SKILLS可视化 = [
  { name: "Rust", level: 95, projects: 12, endorsements: 48 },
  { name: "Go", level: 88, projects: 8, endorsements: 32 },
  { name: "TypeScript", level: 90, projects: 15, endorsements: 55 },
  { name: "C++", level: 82, projects: 5, endorsements: 22 },
  { name: "Python", level: 75, projects: 6, endorsements: 18 },
  { name: "Kubernetes", level: 85, projects: 10, endorsements: 35 },
]

function ActivityHeatmap({ data }: { data: number[] }) {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  return (
    <div className="flex gap-1 items-end h-[40px]">
      {data.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className="w-[18px] rounded-[2px] transition-all hover:opacity-80"
            style={{
              height: `${Math.max(4, v * 0.35)}px`,
              background: v === 0 ? "var(--color-bg-hover)" : `rgba(168,85,247,${0.2 + (v / 100) * 0.8})`,
            }}
          />
          <span className="text-[7px] text-text opacity-40">{months[i].slice(0, 1)}</span>
        </div>
      ))}
    </div>
  )
}

function SkillBar({ skill }: { skill: typeof SKILLS可视化[0] }) {
  return (
    <div className="bg-bg-surface border border-border rounded-[10px] p-3 hover:border-accent-border transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-bold text-text-h">{skill.name}</span>
        <span className="text-[10px] font-bold text-accent">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-bg-hover rounded-full overflow-hidden mb-2">
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${skill.level}%` }} />
      </div>
      <div className="flex items-center gap-3 text-[9px] text-text opacity-60">
        <span>{skill.projects} proyectos</span>
        <span>•</span>
        <span>{skill.endorsements} endorsements</span>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-bg-surface border border-border rounded-[14px] p-5 hover:border-accent-border transition-all animate-fade-in">
      {project.featured && (
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={11} className="text-accent" fill="currentColor" strokeWidth={0} />
          <span className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-accent">Featured</span>
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
          style={{ background: `${project.langColor}18`, color: project.langColor }}>
          <Code2 size={18} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[14px] font-extrabold text-text-h m-0">{project.name}</h3>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-bg-hover text-text border border-border">
              {project.type === "repo" ? "Repository" : project.type === "contribution" ? "Contribution" : "Project"}
            </span>
          </div>
          <p className="text-[11px] text-text leading-[1.6] m-0 mb-3 opacity-80">{project.desc}</p>
          <div className="flex gap-1.5 flex-wrap mb-3">
            {project.tags.map(t => (
              <span key={t} className="bg-accent-bg text-accent border border-accent-border text-[9px] font-bold px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[10px] text-text">
            <span className="flex items-center gap-1"><Star size={10} strokeWidth={2} /> {project.stars > 0 ? `${(project.stars / 1000).toFixed(1)}k` : "—"}</span>
            <span className="flex items-center gap-1"><GitFork size={10} strokeWidth={2} /> {project.forks > 0 ? project.forks : "—"}</span>
            <span className="flex items-center gap-1" style={{ color: project.langColor }}>{project.lang}</span>
            <span className="ml-auto opacity-60">{project.lastUpdate}</span>
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className="mt-3 text-[10px] font-bold text-accent bg-transparent border-none cursor-pointer">
            {expanded ? "Ocultar actividad" : "Ver actividad"}
          </button>
          {expanded && (
            <div className="mt-3 animate-fade-in">
              <span className="text-[9px] font-bold uppercase tracking-[1px] text-text opacity-60 block mb-2">Actividad últimos 12 meses</span>
              <ActivityHeatmap data={project.activity} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const { user } = useJobAuth()
  const [filter, setFilter] = useState<ProjectType>("all")
  const [search, setSearch] = useState("")

  const filtered = PROJECTS.filter(p => {
    if (filter !== "all" && p.type !== filter) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto">
      {/* Header */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Code2 size={16} className="text-accent" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Portafolio</span>
        </div>
        <h1 className="text-[32px] font-black tracking-[-1.5px] text-text-h leading-[1.1] mb-2">
          Tu <span className="gradient-text italic">portafolio técnico</span>
        </h1>
        <p className="text-[13px] text-text leading-[1.7] max-w-[500px] opacity-80">
          Proyectos, repositorios, contribuciones open source y skills verificadas. Tu identidad técnica en un solo lugar.
        </p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Repositorios", value: "5", icon: GitBranch, color: "text-accent" },
          { label: "Stars totales", value: "45.6k", icon: Star, color: "text-warning" },
          { label: "Contribuciones", value: "1,402", icon: GitFork, color: "text-success" },
          { label: "Skills", value: "6", icon: Award, color: "text-secondary" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-bg-surface border border-border rounded-[12px] p-4 text-center">
            <Icon size={16} className={`mx-auto ${color} mb-2`} strokeWidth={2} />
            <div className="text-[20px] font-black text-text-h">{value}</div>
            <div className="text-[9px] font-bold uppercase tracking-[1px] text-text opacity-60">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-5">
        {/* Projects */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Filter size={13} className="text-text opacity-60" strokeWidth={2} />
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Proyectos</span>
          </div>
          <div className="flex gap-1.5 mb-4">
            {([
              { key: "all" as ProjectType, label: "Todos" },
              { key: "repo" as ProjectType, label: "Repos" },
              { key: "project" as ProjectType, label: "Proyectos" },
              { key: "contribution" as ProjectType, label: "Contributions" },
            ]).map(({ key, label }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer border transition-all ${
                  filter === key ? "bg-accent text-[#1a0033] border-accent" : "bg-transparent text-text border-border hover:border-accent-border"
                }`}>{label}</button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>

        {/* Skills sidebar */}
        <div>
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Skills</span>
              <button className="text-[10px] font-bold text-accent bg-transparent border-none cursor-pointer flex items-center gap-1">
                <Plus size={10} strokeWidth={2.5} /> Agregar
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {SKILLS可视化.map(s => <SkillBar key={s.name} skill={s} />)}
            </div>

            <div className="mt-4 bg-bg-surface border border-border rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={13} className="text-accent" strokeWidth={2} />
                <span className="text-[10px] font-bold uppercase tracking-[1px] text-text opacity-60">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Rust", "Go", "TypeScript", "C++", "Python", "Docker", "Kubernetes", "Linux", "eBPF", "Wasm"].map(t => (
                  <span key={t} className="bg-accent-bg text-accent border border-accent-border text-[9px] font-bold px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
