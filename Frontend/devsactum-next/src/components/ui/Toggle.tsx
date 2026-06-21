"use client"
import React from "react"

interface Props {
  enabled: boolean
  onChange: () => void
  size?: "sm" | "md"
}

export function Toggle({ enabled, onChange, size = "md" }: Props) {
  const h = size === "md" ? "h-[22px]" : "h-[18px]"
  const w = size === "md" ? "w-10" : "w-8"
  const dot = size === "md" ? "w-4 h-4" : "w-3 h-3"
  const onTranslate = size === "md" ? "translate-x-[18px]" : "translate-x-[14px]"

  return (
    <button
      onClick={onChange}
      className={`
        relative ${h} ${w} rounded-full border-2 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] cursor-pointer shrink-0
        ${enabled
          ? "bg-[var(--primary)] border-[var(--primary)]"
          : "bg-[var(--bg-hover)] border-[var(--border)]"
        }
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]
      `}
      aria-checked={enabled}
      role="switch"
    >
      <div
        className={`
          absolute top-[2px] left-[2px] ${dot} rounded-full bg-white
          transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)]
          ${enabled ? onTranslate : "translate-x-0"}
        `}
      />
    </button>
  )
}
