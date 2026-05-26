"use client"
import React from "react"
import { cn } from "@/src/lib/utils"
import { STATUS_COLORS } from "@/src/constants"

type Size   = "xs" | "sm" | "md" | "lg" | "xl"
type Shape  = "circle" | "rounded"
type Status = "online" | "away" | "offline"

interface AvatarProps {
  initials: string
  color: string
  bg: string
  size?: Size
  shape?: Shape
  status?: Status
  className?: string
}

const SIZES: Record<Size, { outer: string; text: string; dot: string; dotPos: string }> = {
  xs: { outer:"w-6 h-6",   text:"text-[9px]",  dot:"w-2 h-2",     dotPos:"-bottom-0.5 -right-0.5" },
  sm: { outer:"w-8 h-8",   text:"text-[10px]", dot:"w-2.5 h-2.5", dotPos:"-bottom-0.5 -right-0.5" },
  md: { outer:"w-10 h-10", text:"text-[12px]", dot:"w-3 h-3",     dotPos:"bottom-0 right-0"        },
  lg: { outer:"w-12 h-12", text:"text-[14px]", dot:"w-3.5 h-3.5", dotPos:"bottom-0 right-0"        },
  xl: { outer:"w-16 h-16", text:"text-[20px]", dot:"w-4 h-4",     dotPos:"bottom-0.5 right-0.5"    },
}

export function Avatar({ initials, color, bg, size = "md", shape = "circle", status, className }: AvatarProps) {
  const s = SIZES[size]
  const r = shape === "circle" ? "rounded-full" : "rounded-[8px]"

  return (
    <div className={cn("relative shrink-0 inline-block", className)}>
      <div
        className={cn(s.outer, r, "flex items-center justify-center font-bold")}
        style={{ background: bg, color }}
      >
        <span className={s.text}>{initials}</span>
      </div>
      {status && (
        <div
          className={cn("absolute border-2 border-[#131313] rounded-full", s.dot, s.dotPos)}
          style={{ background: STATUS_COLORS[status] }}
        />
      )}
    </div>
  )
}
