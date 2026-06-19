"use client"

import React from "react"
import { Lock, Star, ArrowUpRight } from "lucide-react"
import { useJobAuth } from "@/context/JobAuthContext"
import { useNav } from "@/context/NavContext"

interface PremiumGateProps {
  children: React.ReactNode
  featureName?: string
  showBlur?: boolean
}

export function PremiumGate({ children, featureName = "contenido premium", showBlur = true }: PremiumGateProps) {
  const { user } = useJobAuth()
  const { setActivePage } = useNav()

  if (user?.isPremium) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {showBlur && (
        <div className="blur-[6px] pointer-events-none select-none opacity-60">
          {children}
        </div>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/80 backdrop-blur-sm rounded-[14px] border border-accent-border">
        <div className="w-10 h-10 rounded-full bg-accent-bg border border-accent-border flex items-center justify-center mb-3">
          <Lock size={16} className="text-accent" strokeWidth={2} />
        </div>
        <p className="text-[13px] font-bold text-text-h m-0 mb-1">{featureName}</p>
        <p className="text-[11px] text-text opacity-70 m-0 mb-3">Actualiza a Premium para desbloquear</p>
        <button
          onClick={() => setActivePage("Empleo Premium")}
          className="flex items-center gap-1.5 bg-accent text-[#1a0033] border-none rounded-[8px] px-4 py-2 text-[11px] font-bold cursor-pointer hover:opacity-85 transition-opacity"
        >
          <Star size={12} strokeWidth={2.5} fill="currentColor" /> Desbloquear <ArrowUpRight size={11} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

export function PremiumBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 bg-accent-bg border border-accent-border text-accent text-[9px] font-extrabold uppercase tracking-[1px] px-2 py-0.5 rounded-full ${className}`}>
      <Star size={8} strokeWidth={2.5} fill="currentColor" /> Premium
    </span>
  )
}
