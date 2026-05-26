"use client"

import React from "react"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 animate-fade-in">
      <div className="w-[64px] h-[64px] rounded-[16px] bg-bg-surface border border-border flex items-center justify-center mb-5 opacity-60 animate-float">
        {icon}
      </div>
      <p className="text-[15px] font-bold text-text-h m-0 mb-2">{title}</p>
      <p className="text-[13px] text-text m-0 opacity-60 text-center max-w-[280px]">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 bg-accent text-[#1a0033] border-none rounded-[9px] px-5 py-2.5 text-[12px] font-bold cursor-pointer hover:opacity-85 transition-opacity"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}