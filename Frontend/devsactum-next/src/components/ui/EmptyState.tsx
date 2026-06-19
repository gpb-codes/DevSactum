"use client"
import React from "react"

interface Props {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className = "" }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 text-center px-6 ${className}`}>
      {icon && (
        <div className="w-16 h-16 rounded-[var(--radius-2xl)] bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center mb-5 text-[var(--text-muted)]">
          {icon}
        </div>
      )}
      <p className="text-base font-black text-[var(--text-h)] m-0 mb-2">{title}</p>
      {description && (
        <p className="text-sm text-[var(--text-soft)] m-0 max-w-[280px] leading-[1.6]">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
