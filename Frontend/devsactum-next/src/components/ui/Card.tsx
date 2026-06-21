"use client"
import React from "react"

type Variant = "default" | "glass" | "bento" | "interactive" | "neo"

interface Props {
  variant?: Variant
  className?: string
  children: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}

const variantStyles: Record<Variant, string> = {
  default:
    "bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-xl)]",
  glass:
    "glass rounded-[var(--radius-xl)]",
  bento:
    "bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-md)]",
  interactive:
    "bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-xl)] cursor-pointer hover:border-[var(--card-hover-border)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]",
  neo:
    "bg-[var(--card-bg)] neo-border rounded-[var(--radius-lg)]",
}

export function Card({ variant = "default", className = "", children, onClick, style }: Props) {
  const Comp = onClick ? "button" : "div"
  return (
    <Comp
      onClick={onClick}
      className={`${variantStyles[variant]} ${onClick ? "text-left w-full" : ""} ${className}`}
      style={style}
    >
      {children}
    </Comp>
  )
}

export function CardHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`px-5 pt-5 pb-0 ${className}`}>{children}</div>
}

export function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`px-5 py-5 ${className}`}>{children}</div>
}

export function CardFooter({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`px-5 py-4 border-t border-[var(--border)] ${className}`}>{children}</div>
}
