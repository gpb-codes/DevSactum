"use client"
import React from "react"

type Size = "sm" | "md" | "lg" | "xl"
type Shape = "circle" | "rounded" | "square"

interface Props {
  initials: string
  color?: string
  bg?: string
  size?: Size
  shape?: Shape
  className?: string
  online?: boolean
}

const sizeMap: Record<Size, string> = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-[12px]",
  lg: "w-12 h-12 text-[14px]",
  xl: "w-[100px] h-[100px] text-[32px]",
}

const shapeMap: Record<Shape, string> = {
  circle: "rounded-full",
  rounded: "rounded-[var(--radius-lg)]",
  square: "rounded-[var(--radius-md)]",
}

export function Avatar({
  initials,
  color,
  bg,
  size = "md",
  shape = "circle",
  className = "",
  online,
}: Props) {
  return (
    <div className="relative inline-flex shrink-0 group">
      <div
        className={`
          flex items-center justify-center font-extrabold
          ${sizeMap[size]} ${shapeMap[shape]}
          transition-transform duration-[var(--duration-fast)] group-hover:scale-105
          ${className}
        `}
        style={{
          background: bg || "var(--primary-soft)",
          color: color || "var(--primary)",
        }}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={`
            absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg)]
            transition-transform duration-[var(--duration-fast)]
            ${online ? "bg-[var(--online)]" : "bg-[var(--offline)]"}
          `}
        />
      )}
    </div>
  )
}
