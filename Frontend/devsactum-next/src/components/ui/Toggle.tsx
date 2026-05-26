"use client"
import React from "react"

interface ToggleProps {
  enabled: boolean
  onChange: () => void
  size?: "sm" | "md"
}

export function Toggle({ enabled, onChange, size = "md" }: ToggleProps) {
  const w = size === "md" ? "w-10 h-[22px]" : "w-8 h-[18px]"
  const d = size === "md" ? "w-4 h-4 top-[3px] translate-x-[18px]" : "w-3 h-3 top-[2.5px] translate-x-[14px]"
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
      className={`relative ${w} rounded-full border transition-colors duration-200 cursor-pointer shrink-0 ${
        enabled ? "bg-[#c49aff] border-[#c49aff]" : "bg-[#1a1a1f] border-[#2e303a]"
      }`}
    >
      <div
        className={`absolute rounded-full bg-white transition-transform duration-200 ${
          enabled ? d : `w-${size === "md" ? 4 : 3} h-${size === "md" ? 4 : 3} top-[3px] translate-x-[3px]`
        }`}
        style={{
          width:  size === "md" ? 16 : 12,
          height: size === "md" ? 16 : 12,
          top:    size === "md" ? 3  : 2.5,
          transform: enabled
            ? `translateX(${size === "md" ? 18 : 14}px)`
            : "translateX(3px)",
        }}
      />
    </button>
  )
}
