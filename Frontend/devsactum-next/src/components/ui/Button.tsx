"use client"
import React from "react"
import { cn } from "@/src/lib/utils"

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline"
type Size    = "xs" | "sm" | "md" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

const V: Record<Variant, string> = {
  primary:   "bg-[#c49aff] text-[#1a0033] hover:opacity-85 border-[#c49aff]",
  secondary: "bg-[#1a1a1f] text-[#f3f4f6] hover:bg-[#2e303a] border-[#2e303a]",
  ghost:     "bg-transparent text-[#6b6375] hover:bg-[#1a1a1f] hover:text-[#f3f4f6] border-transparent",
  danger:    "bg-[rgba(239,68,68,0.12)] text-[#ef4444] hover:bg-[rgba(239,68,68,0.2)] border-[rgba(239,68,68,0.3)]",
  outline:   "bg-transparent text-[#c49aff] hover:bg-[rgba(196,154,255,0.12)] border-[rgba(196,154,255,0.3)]",
}

const S: Record<Size, string> = {
  xs: "h-6  px-2.5 text-[10px] gap-1   rounded-md",
  sm: "h-8  px-3.5 text-[11px] gap-1.5 rounded-[8px]",
  md: "h-9  px-4   text-[12px] gap-2   rounded-[9px]",
  lg: "h-11 px-5   text-[13px] gap-2.5 rounded-[10px]",
}

export function Button({
  variant = "primary", size = "md", loading = false,
  icon, iconRight, fullWidth = false,
  children, className, disabled, ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-bold border cursor-pointer select-none",
        "transition-all duration-150 active:scale-[0.97]",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        V[variant], S[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading
        ? <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
        : <>{icon && <span className="shrink-0">{icon}</span>}{children}{iconRight && <span className="shrink-0">{iconRight}</span>}</>
      }
    </button>
  )
}
