"use client"

import React from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline"
type Size    = "sm" | "md" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
}

const VARIANTS: Record<Variant, string> = {
  primary:   "bg-accent text-[#1a0033] hover:opacity-85 border-accent",
  secondary: "bg-bg-hover text-text-h hover:bg-border border-border",
  ghost:     "bg-transparent text-text hover:bg-bg-hover hover:text-text-h border-transparent",
  danger:    "bg-[rgba(239,68,68,0.15)] text-[#ef4444] hover:bg-[rgba(239,68,68,0.25)] border-[rgba(239,68,68,0.3)]",
  outline:   "bg-transparent text-accent hover:bg-accent-bg border-accent-border",
}

const SIZES: Record<Size, string> = {
  sm: "h-7  px-3   text-[11px] gap-1.5 rounded-[7px]",
  md: "h-9  px-4   text-[12px] gap-2   rounded-[9px]",
  lg: "h-11 px-5   text-[13px] gap-2.5 rounded-[10px]",
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-bold border cursor-pointer",
        "transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </>
      )}
    </button>
  )
}

export default Button