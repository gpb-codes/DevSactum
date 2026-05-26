"use client"
import React from "react"
import { cn } from "@/src/lib/utils"

type Variant = "accent" | "tertiary" | "success" | "warning" | "danger" | "neutral"

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  dot?: boolean
  className?: string
}

const V: Record<Variant, string> = {
  accent:   "bg-[rgba(196,154,255,0.15)] text-[#c49aff] border-[rgba(196,154,255,0.3)]",
  tertiary: "bg-[rgba(255,148,168,0.15)] text-[#ff94a8] border-[rgba(255,148,168,0.3)]",
  success:  "bg-[rgba(74,222,128,0.12)]  text-[#4ade80] border-[rgba(74,222,128,0.3)]",
  warning:  "bg-[rgba(245,158,11,0.12)]  text-[#f59e0b] border-[rgba(245,158,11,0.3)]",
  danger:   "bg-[rgba(239,68,68,0.12)]   text-[#ef4444] border-[rgba(239,68,68,0.3)]",
  neutral:  "bg-[#1a1a1f] text-[#6b6375] border-[#2e303a]",
}

export function Badge({ children, variant = "accent", dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full",
        "text-[10px] font-extrabold uppercase tracking-[1px] border",
        V[variant], className
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
