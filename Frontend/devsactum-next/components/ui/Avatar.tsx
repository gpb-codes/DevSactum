"use client"

import React from "react"

interface AvatarProps {
  initials: string
  color: string
  bg: string
  size?: "sm" | "md" | "lg" | "xl"
  online?: boolean
  shape?: "circle" | "rounded"
}

const SIZES = {
  sm:  { outer: "w-7 h-7",   text: "text-[10px]", dot: "w-2 h-2" },
  md:  { outer: "w-9 h-9",   text: "text-[12px]", dot: "w-2.5 h-2.5" },
  lg:  { outer: "w-11 h-11", text: "text-[13px]", dot: "w-3 h-3" },
  xl:  { outer: "w-16 h-16", text: "text-[18px]", dot: "w-3.5 h-3.5" },
}

export function Avatar({ initials, color, bg, size = "md", online, shape = "circle" }: AvatarProps) {
  const s = SIZES[size]
  const radius = shape === "circle" ? "rounded-full" : "rounded-[8px]"

  return (
    <div className="relative shrink-0">
      <div
        className={`${s.outer} ${radius} flex items-center justify-center ${s.text} font-bold`}
        style={{ background: bg, color }}
      >
        {initials}
      </div>
      {online !== undefined && (
        <div
          className={`absolute bottom-0 right-0 ${s.dot} rounded-full border-2 border-bg`}
          style={{ background: online ? "var(--color-online)" : "#6b7280" }}
        />
      )}
    </div>
  )
}