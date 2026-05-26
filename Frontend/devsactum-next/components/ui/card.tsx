"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  accent?: boolean
  padding?: "sm" | "md" | "lg" | "none"
}

const PADDING = {
  none: "",
  sm:   "p-3",
  md:   "p-5",
  lg:   "p-7",
}

export function Card({
  hover = false,
  accent = false,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-bg-surface border border-border rounded-[14px]",
        hover && "transition-all duration-200 cursor-pointer hover:border-accent-border",
        accent && "border-accent-border bg-accent-bg",
        PADDING[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function CardHeader({ title, description, icon, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3 mb-4", className)} {...props}>
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="w-9 h-9 rounded-[9px] bg-accent-bg border border-accent-border flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-[14px] font-extrabold text-text-h m-0 truncate">{title}</h3>
          {description && (
            <p className="text-[11px] text-text opacity-60 m-0 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function CardDivider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border -mx-5 my-4", className)} />
}

export function StatCard({
  label,
  value,
  sub,
  color = "text-text-h",
  className,
}: {
  label: string
  value: string | number
  sub?: string
  color?: string
  className?: string
}) {
  return (
    <Card padding="md" className={cn("text-center", className)}>
      <div className={cn("text-[28px] font-black tracking-tight leading-none mb-1", color)}>
        {value}
      </div>
      <div className="text-[11px] font-bold text-text-h">{label}</div>
      {sub && <div className="text-[10px] text-text opacity-50 mt-0.5">{sub}</div>}
    </Card>
  )
}

export default Card