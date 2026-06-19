"use client"
import React from "react"
import { Loader2 } from "lucide-react"

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline"
type Size = "sm" | "md" | "lg"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-white border-2 border-[var(--primary)] hover:brightness-110 active:scale-[0.97] shadow-[var(--shadow-glow)]",
  secondary:
    "bg-[var(--secondary)] text-[var(--color-black)] border-2 border-[var(--secondary)] hover:brightness-110 active:scale-[0.97]",
  ghost:
    "bg-transparent text-[var(--text-h)] border-2 border-transparent hover:bg-[var(--bg-hover)] active:bg-[var(--bg-surface-2)]",
  danger:
    "bg-[var(--danger-soft)] text-[var(--danger)] border-2 border-[var(--danger)] hover:bg-[var(--danger-hover)] active:scale-[0.97]",
  outline:
    "bg-transparent text-[var(--text-h)] border-2 border-[var(--border)] hover:border-[var(--primary-border)] hover:text-[var(--primary)] active:bg-[var(--bg-hover)] active:scale-[0.97]",
}

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-[var(--radius-md)]",
  md: "px-4 py-2 text-sm gap-2 rounded-[var(--radius-lg)]",
  lg: "px-6 py-3 text-base gap-2.5 rounded-[var(--radius-lg)]",
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  disabled,
  className = "",
  children,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-bold cursor-pointer
        transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:scale-100
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === "sm" ? 12 : 14} className="animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  )
}
