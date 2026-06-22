"use client"

import React, { useState } from "react"
import { ArrowLeft, Send, Building2, MapPin, Globe, Clock, FileText, Link, CheckCircle, Sparkles } from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"
import { MOCK_JOBS } from "@/lib/mock-jobs"
import { getApplyJobId } from "@/lib/apply-state"
import type { JobListing } from "@/types"
import { GradientHeading } from "@/components/ui/gradient-heading"

function formatSalary(min: number, max: number, currency: string, type: string) {
  if (type === "internship") return `$${(min / 1000).toFixed(0)}k/mo`
  if (type === "contract") return `$${min}-${max}/h`
  return `$${(min / 1000).toFixed(0)}k – $${(max / 1000).toFixed(0)}k`
}

export default function PostulacionPage() {
  const { setActivePage } = useNav()
  const { success, error } = useToast()
  const [job] = useState<JobListing>(() => {
    const id = getApplyJobId()
    return MOCK_JOBS.find(j => j.id === id) ?? MOCK_JOBS[0]
  })
  const [coverLetter, setCoverLetter] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!coverLetter.trim()) {
      error("Completa el formulario", "La carta de presentación es obligatoria")
      return
    }
    setSubmitted(true)
    success("Postulación enviada", "Tu postulación fue recibida exitosamente")
  }

  if (submitted) {
    return (
      <div className="px-6 py-6 max-w-[640px] mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center w-full">
          <div className="w-20 h-20 rounded-[20px] bg-success-soft border border-[rgba(74,222,128,0.3)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-success" strokeWidth={1.5} />
          </div>
          <h2 className="text-[24px] font-black text-text-h mb-2">¡Postulación enviada!</h2>
          <p className="text-[14px] text-text mb-6 opacity-70">
            Tu postulación para <strong className="text-accent">{job.title}</strong> en {job.company.name} fue recibida.
          </p>
          <button
            onClick={() => setActivePage("Bolsa de Empleo")}
            className="bg-accent text-[#1a0033] border-none rounded-[9px] px-6 py-2.5 text-[13px] font-extrabold cursor-pointer hover:opacity-85 transition-opacity flex items-center gap-2 mx-auto"
          >
            Volver a la bolsa <ArrowLeft size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-6 max-w-[820px] mx-auto animate-fade-in">
      {/* Back */}
      <button
        onClick={() => setActivePage("Bolsa de Empleo")}
        className="flex items-center gap-1.5 text-[12px] font-bold text-text bg-transparent border-none cursor-pointer hover:text-accent transition-colors mb-6"
      >
        <ArrowLeft size={14} strokeWidth={2.5} />
        Volver a ofertas
      </button>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 animate-stagger">
        {/* Form */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Postulación</span>
          </div>
          <h1 className="text-[32px] font-black tracking-[-1.5px] text-text-h leading-[1.1] mb-6">
            Postularme a
            <br />
            <span className="text-accent">{job.title}</span>
          </h1>

          <form onSubmit={handleSubmit} className="bg-bg-surface border border-border rounded-[18px] p-7">
            {/* Cover letter */}
            <div className="mb-6">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">
                Carta de presentación <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <FileText size={14} className="absolute left-[13px] top-[14px] text-text opacity-50 pointer-events-none" strokeWidth={1.8} />
                <textarea
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Cuéntale a la empresa por qué eres el candidato ideal..."
                  rows={6}
                  className="w-full pl-[40px] pr-[14px] py-3 bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none transition-colors focus:border-accent-border resize-none"
                />
              </div>
              <p className="text-[10px] text-text opacity-50 mt-1">{coverLetter.length} caracteres</p>
            </div>

            {/* Portfolio */}
            <div className="mb-6">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">
                Portafolio / LinkedIn
              </label>
              <div className="relative">
                <Link size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-text opacity-50 pointer-events-none" strokeWidth={1.8} />
                <input
                  type="url"
                  value={portfolio}
                  onChange={e => setPortfolio(e.target.value)}
                  placeholder="https://github.com/tu-usuario"
                  className="w-full h-[44px] pl-[40px] pr-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none transition-colors focus:border-accent-border"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-[44px] rounded-[9px] bg-accent text-[#1a0033] border-none flex items-center justify-center gap-2 text-[13px] font-extrabold cursor-pointer hover:opacity-85 transition-opacity"
            >
              <Send size={14} strokeWidth={2.5} />
              Enviar postulación
            </button>
          </form>
        </div>

        {/* Sidebar — Job info */}
        <div className="bg-bg-surface border border-border rounded-[18px] p-6 h-fit lg:sticky lg:top-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center text-[18px] font-black shrink-0"
              style={{ background: job.company.avatarBg, color: job.company.avatarColor }}
            >
              {job.company.initials}
            </div>
            <div>
              <h3 className="text-[14px] font-extrabold text-text-h m-0">{job.company.name}</h3>
              <p className="text-[11px] text-text opacity-70 m-0">{job.company.industry}</p>
            </div>
          </div>

          <h4 className="text-[16px] font-black text-text-h mb-3">{job.title}</h4>

          <div className="flex flex-col gap-2.5 text-[12px] text-text">
            <span className="flex items-center gap-2">
              <MapPin size={13} strokeWidth={2} className="opacity-50" />
              {job.location}
            </span>
            {job.remote && (
              <span className="flex items-center gap-2 text-online">
                <Globe size={13} strokeWidth={2} />
                Remoto
              </span>
            )}
            <span className="flex items-center gap-2">
              <Clock size={13} strokeWidth={2} className="opacity-50" />
              {job.postedAt}
            </span>
            <span className="flex items-center gap-2 text-success font-bold">
              <Sparkles size={13} strokeWidth={2} />
              {formatSalary(job.salaryMin, job.salaryMax, job.currency, job.type)}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-1.5">
              {job.tags.map(tag => (
                <span key={tag} className="bg-accent-bg text-accent border border-accent-border text-[9px] font-bold px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-[11px] text-text leading-relaxed opacity-70">{job.company.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
