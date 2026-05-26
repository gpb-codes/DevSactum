"use client"
import React from "react"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-[#131313] border border-[#2e303a] flex items-center justify-center mb-5 opacity-60 animate-float">
        {icon}
      </div>
      <p className="text-[15px] font-bold text-[#f3f4f6] m-0 mb-2">{title}</p>
      <p className="text-[13px] text-[#6b6375] m-0 max-w-[260px] leading-[1.6]">{description}</p>
      {action && (
        <button onClick={action.onClick} className="mt-6 bg-[#c49aff] text-[#1a0033] border-none rounded-[9px] px-5 py-2.5 text-[12px] font-bold cursor-pointer hover:opacity-85 transition-opacity">
          {action.label}
        </button>
      )}
    </div>
  )
}
