"use client"
import React from "react"

type Variant = "default" | "success" | "warning" | "danger" | "info" | "accent" | "premium"

interface Props {
  variant?: Variant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  default: "bg-[var(--bg-hover)] text-[var(--text-soft)] border-[var(--border)]",
  success: "bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]/30",
  warning: "bg-[var(--warning-soft)] text-[var(--warning)] border-[var(--warning)]/30",
  danger:   "bg-[var(--danger-soft)] text-[var(--danger)] border-[var(--danger)]/30",
  info:    "bg-[var(--secondary-soft)] text-[var(--secondary)] border-[var(--secondary)]/30",
  accent:  "bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary-border)]",
  premium: "bg-gradient-to-r from-[var(--primary-soft)] to-[var(--secondary-soft)] text-[var(--primary)] border-[var(--primary-border)]",
}

export function Badge({ variant = "default", className = "", children }: Props) {
  return (
    <span
      className={`
        inline-flex items-center text-[9px] font-bold uppercase tracking-[1px]
        px-2.5 py-0.5 rounded-full border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
