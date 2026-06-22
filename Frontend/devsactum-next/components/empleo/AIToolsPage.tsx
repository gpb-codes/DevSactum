"use client"

import React, { useState } from "react"
import {
  Brain, Sparkles, Target, BarChart3, Zap, Search, FileText,
  TrendingUp, Users, ArrowUpRight, ChevronDown, ChevronUp,
  Check, X, AlertTriangle, Star, Shield, Code2,
} from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"
import { useJobAuth } from "@/context/JobAuthContext"
import { PremiumBadge } from "@/components/ui/PremiumGate"
import {
  aiService, type AIMatch, type AIJobRecommendation,
  type AIResumeAnalysis, type AISkillGap,
} from "@/services/ai"
import { GradientHeading } from "@/components/ui/gradient-heading"

type Tab = "matching" | "resume" | "skill-gap" | "insights"

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const color = score >= 80 ? "var(--color-success)" : score >= 60 ? "var(--color-warning)" : "var(--color-danger)"
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={size/2 - 6} fill="none" stroke="var(--color-bg-hover)" strokeWidth="6"/>
        <circle cx={size/2} cy={size/2} r={size/2 - 6} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={2 * Math.PI * (size/2 - 6)}
          strokeDashoffset={2 * Math.PI * (size/2 - 6) * (1 - score/100)}
          strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black text-text-h" style={{ fontSize: size * 0.3 }}>{score}</span>
        <span className="font-bold text-accent" style={{ fontSize: size * 0.11 }}>%</span>
      </div>
    </div>
  )
}

function MatchCard({ match }: { match: AIMatch }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-bg-surface border border-border rounded-[14px] p-5 hover:border-accent-border transition-all animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-[13px] font-bold shrink-0"
          style={{ background: match.developerBg, color: match.developerColor }}>
          {match.developerInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div>
              <span className="text-[14px] font-extrabold text-text-h">{match.developerName}</span>
              <span className="text-[11px] text-text ml-2 opacity-60">{match.developerHandle}</span>
            </div>
            <ScoreRing score={match.score} size={48} />
          </div>
          <div className="flex gap-1.5 flex-wrap mt-2">
            {match.skills.map(s => (
              <span key={s} className="bg-accent-bg text-accent border border-accent-border text-[9px] font-bold px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-text">
            <span>{match.experience}</span>
            <span>•</span>
            <span className={match.availability === "immediate" ? "text-success" : "text-text"}>{match.availability}</span>
            <span>•</span>
            <span>${(match.salaryExpectation.min/1000).toFixed(0)}k-${(match.salaryExpectation.max/1000).toFixed(0)}k</span>
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className="mt-2 text-[10px] font-bold text-accent bg-transparent border-none cursor-pointer flex items-center gap-1">
            {expanded ? "Ocultar" : "Ver razones"} {expanded ? <ChevronUp size={10}/> : <ChevronDown size={10}/>}
          </button>
          {expanded && (
            <div className="mt-2 p-3 bg-bg-hover rounded-[10px] animate-fade-in">
              <span className="text-[9px] font-bold uppercase tracking-[1px] text-text opacity-60 block mb-2">¿Por qué este match?</span>
              {match.reasons.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-text mb-1">
                  <Check size={10} className="text-success shrink-0" strokeWidth={2.5}/> {r}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function JobRecCard({ rec }: { rec: AIJobRecommendation }) {
  return (
    <div className="bg-bg-surface border border-border rounded-[14px] p-5 hover:border-accent-border transition-all animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[12px] font-bold shrink-0"
          style={{ background: rec.companyBg, color: rec.companyColor }}>
          {rec.companyInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-[14px] font-extrabold text-text-h m-0">{rec.jobTitle}</h3>
              <span className="text-[11px] text-text opacity-60">{rec.companyName}</span>
            </div>
            <ScoreRing score={rec.matchScore} size={48} />
          </div>
          <div className="flex items-center gap-2 mt-2 text-[10px]">
            <span className={`flex items-center gap-1 ${rec.salaryMatch ? "text-success" : "text-danger"}`}>
              {rec.salaryMatch ? <Check size={10} strokeWidth={2.5}/> : <X size={10} strokeWidth={2.5}/>} Salario
            </span>
            <span className={`flex items-center gap-1 ${rec.locationMatch ? "text-success" : "text-danger"}`}>
              {rec.locationMatch ? <Check size={10} strokeWidth={2.5}/> : <X size={10} strokeWidth={2.5}/>} Ubicación
            </span>
          </div>
          {rec.skillGap.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-warning">
              <AlertTriangle size={10} strokeWidth={2}/> Gap: {rec.skillGap.join(", ")}
            </div>
          )}
          <div className="flex gap-1 flex-wrap mt-2">
            {rec.matchReasons.map((r, i) => (
              <span key={i} className="bg-success-soft text-success text-[9px] font-bold px-2 py-0.5 rounded-full">{r}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AIToolsPage() {
  const { setActivePage } = useNav()
  const { success } = useToast()
  const { user } = useJobAuth()
  const [tab, setTab] = useState<Tab>("matching")
  const [loading, setLoading] = useState(false)
  const [matches, setMatches] = useState<AIMatch[]>([])
  const [recommendations, setRecommendations] = useState<AIJobRecommendation[]>([])
  const [resumeAnalysis, setResumeAnalysis] = useState<AIResumeAnalysis | null>(null)
  const [skillGap, setSkillGap] = useState<AISkillGap | null>(null)
  const [resumeText, setResumeText] = useState("")
  const [targetRole, setTargetRole] = useState("Senior Rust Engineer")
  const [skills, setSkills] = useState("Rust, Go, TypeScript, Docker")

  async function runMatching() {
    setLoading(true)
    try {
      const [m, r] = await Promise.all([
        aiService.matchDevelopers("j1", 5),
        aiService.matchJobs("u1", 4),
      ])
      setMatches(m)
      setRecommendations(r)
      success("Análisis completado", "Matches generados con IA")
    } finally { setLoading(false) }
  }

  async function runResumeAnalysis() {
    if (!resumeText.trim()) return
    setLoading(true)
    try {
      const analysis = await aiService.analyzeResume(resumeText, targetRole)
      setResumeAnalysis(analysis)
      success("Resume analizado", `Score: ${analysis.overallScore}%`)
    } finally { setLoading(false) }
  }

  async function runSkillGap() {
    const skillList = skills.split(",").map(s => s.trim()).filter(Boolean)
    if (!skillList.length) return
    setLoading(true)
    try {
      const gap = await aiService.analyzeSkillGap(skillList, targetRole)
      setSkillGap(gap)
      success("Skill gap analizado", `${gap.gapSkills.length} skills faltantes`)
    } finally { setLoading(false) }
  }

  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto animate-fade-in">
      {/* Header */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} className="text-accent" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Herramientas IA</span>
          <PremiumBadge />
        </div>
        <h1 className="text-[32px] font-black tracking-[-1.5px] text-text-h leading-[1.1] mb-2">
          IA <span className="gradient-text italic">Potenciada</span> por Voltagent
        </h1>
        <p className="text-[13px] text-text leading-[1.7] max-w-[500px] opacity-80">
          Matching inteligente, análisis de resumes, skill gaps y insights de mercado. Módulos avanzados de análisis disponibles como add-on.
        </p>
      </section>

      {/* Voltagent badge */}
      <div className="flex items-center gap-3 bg-bg-surface border border-border rounded-[12px] px-4 py-3 mb-6">
        <div className="w-8 h-8 rounded-[8px] bg-accent-bg border border-accent-border flex items-center justify-center">
          <Zap size={14} className="text-accent" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <span className="text-[11px] font-bold text-text-h">Powered by Voltagent AI</span>
          <span className="text-[10px] text-text opacity-60 ml-2">Agentes autónomos para matching y análisis</span>
        </div>
        <a href="https://voltagent.dev" target="_blank" rel="noopener noreferrer"
          className="text-[10px] font-bold text-accent flex items-center gap-1 hover:underline">
          Docs <ArrowUpRight size={9} strokeWidth={2.5} />
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {([
          { key: "matching" as Tab, label: "Smart Match", icon: Target },
          { key: "resume" as Tab, label: "Análisis Resume", icon: FileText },
          { key: "skill-gap" as Tab, label: "Skill Gap", icon: BarChart3 },
          { key: "insights" as Tab, label: "Insights", icon: TrendingUp },
        ]).map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] cursor-pointer border-none bg-transparent border-b-2 -mb-px transition-colors whitespace-nowrap ${
              tab === key ? "border-accent text-accent font-bold" : "border-transparent text-text font-medium hover:text-text-h"
            }`}>
            <Icon size={13} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {/* Smart Match */}
      {tab === "matching" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold text-text-h">Matching inteligente empresa↔dev</span>
            <button onClick={runMatching} disabled={loading}
              className="flex items-center gap-1.5 bg-accent text-[#1a0033] border-none rounded-[8px] px-4 py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity disabled:opacity-50">
              <Sparkles size={12} strokeWidth={2.5} /> {loading ? "Analizando..." : "Ejecutar Match"}
            </button>
          </div>

          {matches.length > 0 && (
            <>
              <h3 className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60 mb-3">Mejores candidatos para Senior Rust Engineer</h3>
              <div className="flex flex-col gap-3 mb-6 animate-stagger">
                {matches.map(m => <MatchCard key={m.developerId} match={m} />)}
              </div>
            </>
          )}

          {recommendations.length > 0 && (
            <>
              <h3 className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60 mb-3">Empleos recomendados para ti</h3>
              <div className="flex flex-col gap-3 animate-stagger">
                {recommendations.map(r => <JobRecCard key={r.jobId} rec={r} />)}
              </div>
            </>
          )}

          {matches.length === 0 && !loading && (
            <div className="text-center py-12">
              <Target size={40} className="mx-auto text-text opacity-20 mb-3" strokeWidth={1.5} />
              <p className="text-[13px] font-bold text-text-h m-0 mb-1">Ejecuta el match para ver resultados</p>
              <p className="text-[11px] text-text opacity-60 m-0">La IA analizará skills, experiencia y compatibilidad</p>
            </div>
          )}
        </div>
      )}

      {/* Resume Analysis */}
      {tab === "resume" && (
        <div className="animate-fade-in">
          <div className="mb-4">
            <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Pega tu resume o LinkedIn</label>
            <textarea value={resumeText} onChange={e => setResumeText(e.target.value)}
              rows={6} placeholder="Pega el texto de tu resume aquí..."
              className="w-full px-4 py-3 bg-bg border border-border rounded-[12px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors resize-none leading-[1.6]" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Rol objetivo</label>
              <input value={targetRole} onChange={e => setTargetRole(e.target.value)}
                className="w-full h-[40px] px-3 bg-bg border border-border rounded-[8px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors" />
            </div>
            <button onClick={runResumeAnalysis} disabled={loading || !resumeText.trim()}
              className="self-end bg-accent text-[#1a0033] border-none rounded-[8px] px-5 py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity disabled:opacity-50 whitespace-nowrap">
              {loading ? "Analizando..." : "Analizar Resume"}
            </button>
          </div>

          {resumeAnalysis && (
            <div className="bg-bg-surface border border-border rounded-[14px] p-5 animate-fade-in">
              <div className="flex items-center gap-6 mb-5">
                <ScoreRing score={resumeAnalysis.overallScore} size={90} />
                <div>
                  <h3 className="text-[16px] font-black text-text-h m-0 mb-1">Score General: {resumeAnalysis.overallScore}%</h3>
                  <p className="text-[11px] text-text m-0 opacity-70">ATS Score: {resumeAnalysis.atsScore}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 animate-stagger">
                {Object.entries(resumeAnalysis.sections).map(([key, val]) => (
                  <div key={key} className="bg-bg-hover border border-border rounded-[10px] p-3">
                    <div className="text-[10px] font-bold uppercase tracking-[1px] text-text opacity-60 mb-1">{key}</div>
                    <div className="flex items-center gap-2">
                      <ScoreRing score={val.score} size={36} />
                      <span className="text-[11px] text-text-h font-bold">{val.score}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60 block mb-2">Skills encontrados</span>
                <div className="flex gap-1.5 flex-wrap">
                  {resumeAnalysis.sections.skills.found.map(s => (
                    <span key={s} className="bg-success-soft text-success text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Check size={9} strokeWidth={2.5}/>{s}</span>
                  ))}
                  {resumeAnalysis.sections.skills.missing.map(s => (
                    <span key={s} className="bg-warning-soft text-warning text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle size={9} strokeWidth={2.5}/>{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60 block mb-2">Sugerencias</span>
                {resumeAnalysis.suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-text mb-1.5">
                    <Sparkles size={10} className="text-accent shrink-0 mt-0.5" strokeWidth={2}/> {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Skill Gap */}
      {tab === "skill-gap" && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Tus skills (separadas por coma)</label>
              <input value={skills} onChange={e => setSkills(e.target.value)}
                className="w-full h-[40px] px-3 bg-bg border border-border rounded-[8px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Rol objetivo</label>
              <input value={targetRole} onChange={e => setTargetRole(e.target.value)}
                className="w-full h-[40px] px-3 bg-bg border border-border rounded-[8px] text-[13px] text-text-h outline-none focus:border-accent-border transition-colors" />
            </div>
          </div>
          <button onClick={runSkillGap} disabled={loading}
            className="bg-accent text-[#1a0033] border-none rounded-[8px] px-5 py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity disabled:opacity-50 mb-5">
            {loading ? "Analizando..." : "Analizar Skill Gap"}
          </button>

          {skillGap && (
            <div className="bg-bg-surface border border-border rounded-[14px] p-5 animate-fade-in">
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="text-center">
                  <div className="text-[24px] font-black text-success">{skillGap.matchingSkills.length}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-text opacity-60">Match</div>
                </div>
                <div className="text-center">
                  <div className="text-[24px] font-black text-danger">{skillGap.gapSkills.length}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-text opacity-60">Gap</div>
                </div>
                <div className="text-center">
                  <div className="text-[24px] font-black text-accent">{skillGap.requiredSkills.length}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-text opacity-60">Requeridas</div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60 block mb-2">Skills que tienes</span>
                <div className="flex gap-1.5 flex-wrap">
                  {skillGap.matchingSkills.map(s => (
                    <span key={s} className="bg-success-soft text-success text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Check size={9} strokeWidth={2.5}/>{s}</span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-danger block mb-2">Skills que necesitas</span>
                <div className="flex gap-1.5 flex-wrap">
                  {skillGap.gapSkills.map(s => (
                    <span key={s} className="bg-danger-soft text-danger text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><X size={9} strokeWidth={2.5}/>{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-accent block mb-2">Plan de aprendizaje</span>
                {skillGap.recommendations.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-none">
                    <span className="text-[12px] font-bold text-text-h">{r.skill}</span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                      r.priority === "high" ? "bg-danger-soft text-danger" : r.priority === "medium" ? "bg-warning-soft text-warning" : "bg-success-soft text-success"
                    }`}>{r.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Insights */}
      {tab === "insights" && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-3 gap-3 mb-6 animate-stagger">
            {[
              { label: "Ofertas activas", value: "10", icon: Code2, color: "text-accent" },
              { label: "Devs activos", value: "2.4k", icon: Users, color: "text-secondary" },
              { label: "Match promedio", value: "82%", icon: Target, color: "text-success" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-bg-surface border border-border rounded-[14px] p-4 text-center">
                <Icon size={18} className={`mx-auto ${color} mb-2`} strokeWidth={1.8} />
                <div className="text-[22px] font-black text-text-h">{value}</div>
                <div className="text-[10px] font-bold uppercase tracking-[1px] text-text opacity-60">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-bg-surface border border-border rounded-[14px] p-5">
            <h3 className="text-[14px] font-extrabold text-text-h m-0 mb-4">Tendencias del Mercado IA</h3>
            <div className="flex flex-col gap-3 animate-stagger-fast">
              {[
                { skill: "Rust", demand: "+45%", salary: "$145k", trend: "up" },
                { skill: "AI/ML", demand: "+62%", salary: "$165k", trend: "up" },
                { skill: "Web3", demand: "+28%", salary: "$155k", trend: "up" },
                { skill: "DevOps", demand: "+35%", salary: "$140k", trend: "stable" },
                { skill: "Frontend", demand: "+18%", salary: "$110k", trend: "stable" },
              ].map(item => (
                <div key={item.skill} className="flex items-center gap-4 py-2 border-b border-border last:border-none">
                  <span className="text-[13px] font-bold text-text-h w-[100px]">{item.skill}</span>
                  <div className="flex-1 h-2 bg-bg-hover rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: item.demand }} />
                  </div>
                  <span className="text-[11px] font-bold text-success">{item.demand}</span>
                  <span className="text-[11px] text-text w-[60px] text-right">{item.salary}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
