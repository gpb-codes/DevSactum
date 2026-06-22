"use client"

import React, { useState } from "react"
import {
  Shield, Award, CheckCircle, Clock, Star, Code2, Terminal,
  Zap, ExternalLink, ChevronRight, Lock, TrendingUp, Cloud, Globe,
} from "lucide-react"
import { useJobAuth } from "@/context/JobAuthContext"
import { PremiumBadge } from "@/components/ui/PremiumGate"

type CertStatus = "earned" | "in_progress" | "locked"

const CERTIFICATIONS = [
  { id: "c1", name: "Rust Certified Developer", issuer: "Rust Foundation", icon: Terminal, color: "#f97316", status: "earned" as CertStatus, date: "Mar 2024", expiry: "Mar 2026", score: 92 },
  { id: "c2", name: "AWS Solutions Architect", issuer: "Amazon Web Services", icon: Cloud, color: "#60a5fa", status: "in_progress" as CertStatus, date: null, expiry: null, score: 0 },
  { id: "c3", name: "Kubernetes Administrator (CKA)", issuer: "CNCF", icon: Shield, color: "#326ce5", status: "earned" as CertStatus, date: "Ene 2024", expiry: "Ene 2027", score: 88 },
  { id: "c4", name: "Google Cloud Professional", issuer: "Google Cloud", icon: Globe, color: "#4285f4", status: "locked" as CertStatus, date: null, expiry: null, score: 0 },
  { id: "c5", name: "Solana Developer Certification", issuer: "Solana Foundation", icon: Code2, color: "#9945ff", status: "earned" as CertStatus, date: "Jun 2024", expiry: "Jun 2026", score: 95 },
]

const ASSESSMENTS = [
  { id: "a1", name: "Rust Fundamentals", questions: 50, timeLimit: "60 min", difficulty: "Advanced", passed: true, score: 94, attempts: 1 },
  { id: "a2", name: "System Design", questions: 40, timeLimit: "90 min", difficulty: "Expert", passed: true, score: 88, attempts: 2 },
  { id: "a3", name: "TypeScript Mastery", questions: 45, timeLimit: "45 min", difficulty: "Advanced", passed: true, score: 91, attempts: 1 },
  { id: "a4", name: "Kubernetes Operations", questions: 35, timeLimit: "60 min", difficulty: "Intermediate", passed: false, score: 0, attempts: 0 },
  { id: "a5", name: "Smart Contract Security", questions: 30, timeLimit: "45 min", difficulty: "Expert", passed: true, score: 96, attempts: 1 },
]

const STATUS_CONFIG: Record<CertStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  earned: { label: "Obtenida", color: "text-success", bg: "bg-success-soft", icon: CheckCircle },
  in_progress: { label: "En progreso", color: "text-warning", bg: "bg-warning-soft", icon: Clock },
  locked: { label: "Bloqueada", color: "text-text", bg: "bg-bg-hover", icon: Lock },
}

export default function ValidationPage() {
  const { user } = useJobAuth()
  const [activeTab, setActiveTab] = useState<"certs" | "assessments">("certs")

  const earnedCerts = CERTIFICATIONS.filter(c => c.status === "earned").length
  const passedAssessments = ASSESSMENTS.filter(a => a.passed).length

  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto animate-fade-in">
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} className="text-accent" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Validación Técnica</span>
        </div>
        <h1 className="text-[32px] font-black tracking-[-1.5px] text-text-h leading-[1.1] mb-2">
          Valida tu <span className="gradient-text italic">expertise</span>
        </h1>
        <p className="text-[13px] text-text leading-[1.7] max-w-[500px] opacity-80">
          Certificaciones verificadas, assessments técnicos y badges de skills. Demuestra lo que sabes hacer.
        </p>
      </section>

      <div className="grid grid-cols-4 gap-3 mb-6 animate-stagger">
        {[
          { label: "Certificaciones", value: `${earnedCerts}/${CERTIFICATIONS.length}`, icon: Award, color: "text-accent" },
          { label: "Assessments", value: `${passedAssessments}/${ASSESSMENTS.length}`, icon: Code2, color: "text-success" },
          { label: "Score promedio", value: "92%", icon: TrendingUp, color: "text-secondary" },
          { label: "Ranking", value: "Top 5%", icon: Star, color: "text-warning" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-bg-surface border border-border rounded-[12px] p-4 text-center">
            <Icon size={16} className={`mx-auto ${color} mb-2`} strokeWidth={2} />
            <div className="text-[20px] font-black text-text-h">{value}</div>
            <div className="text-[9px] font-bold uppercase tracking-[1px] text-text opacity-60">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 border-b border-border mb-6">
        {([
          { key: "certs" as const, label: "Certificaciones", icon: Award },
          { key: "assessments" as const, label: "Assessments", icon: Code2 },
        ]).map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] cursor-pointer border-none bg-transparent border-b-2 -mb-px transition-colors ${
              activeTab === key ? "border-accent text-accent font-bold" : "border-transparent text-text font-medium hover:text-text-h"
            }`}>
            <Icon size={13} strokeWidth={2} /> {label}
          </button>
        ))}
      </div>

      {activeTab === "certs" && (
        <div className="flex flex-col gap-3 animate-stagger">
          {CERTIFICATIONS.map(cert => {
            const s = STATUS_CONFIG[cert.status]
            const StatusIcon = s.icon
            return (
              <div key={cert.id} className="bg-bg-surface border border-border rounded-[14px] p-5 hover:border-accent-border transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: `${cert.color}18`, color: cert.color }}>
                    <cert.icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[14px] font-extrabold text-text-h m-0">{cert.name}</h3>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${s.color} ${s.bg}`}>
                        <StatusIcon size={9} strokeWidth={2.5} /> {s.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-text opacity-60">{cert.issuer}</span>
                    {cert.date && <span className="text-[10px] text-text opacity-40 ml-2">• Obtenida: {cert.date}</span>}
                    {cert.expiry && <span className="text-[10px] text-text opacity-40 ml-2">• Expira: {cert.expiry}</span>}
                    {cert.score > 0 && <span className="text-[10px] text-accent font-bold ml-2">• Score: {cert.score}%</span>}
                  </div>
                  {cert.status === "locked" && <PremiumBadge />}
                  {cert.status === "in_progress" && (
                    <div className="w-16 h-2 bg-bg-hover rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: "45%" }} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === "assessments" && (
        <div className="flex flex-col gap-3 animate-stagger">
          {ASSESSMENTS.map(a => (
            <div key={a.id} className="bg-bg-surface border border-border rounded-[14px] p-5 hover:border-accent-border transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center ${
                  a.passed ? "bg-success-soft border border-[rgba(74,222,128,0.3)]" : "bg-bg-hover border border-border"
                }`}>
                  <Code2 size={18} className={a.passed ? "text-success" : "text-text opacity-40"} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[14px] font-extrabold text-text-h m-0">{a.name}</h3>
                    {a.passed && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-success bg-success-soft">
                        <CheckCircle size={9} strokeWidth={2.5} /> Aprobado
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-text opacity-60">
                    <span>{a.questions} preguntas</span>
                    <span>•</span>
                    <span>{a.timeLimit}</span>
                    <span>•</span>
                    <span>{a.difficulty}</span>
                    {a.score > 0 && <><span>•</span><span className="text-accent font-bold">Score: {a.score}%</span></>}
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-[8px] text-[11px] font-bold cursor-pointer border transition-all ${
                  a.passed
                    ? "bg-transparent text-text border-border hover:border-accent-border"
                    : "bg-accent text-[#1a0033] border-accent hover:opacity-85"
                }`}>
                  {a.passed ? "Reintentar" : "Comenzar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
