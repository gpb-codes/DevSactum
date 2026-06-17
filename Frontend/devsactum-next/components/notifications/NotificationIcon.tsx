"use client"

import React from "react"
import { Heart, MessageCircle, UserPlus, AtSign, Repeat2 } from "lucide-react"
import type { NotificationType } from "@/types"

interface Props {
  type: NotificationType
  size?: number
}

const CONFIG: Record<NotificationType, { Icon: React.ElementType; color: string; bg: string }> = {
  like:    { Icon: Heart,         color: "#ff94a8", bg: "rgba(255,148,168,0.15)" },
  comment: { Icon: MessageCircle, color: "#c49aff", bg: "rgba(196,154,255,0.15)" },
  follow:  { Icon: UserPlus,      color: "#4ade80", bg: "rgba(74,222,128,0.12)"  },
  mention: { Icon: AtSign,        color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  share:   { Icon: Repeat2,       color: "#f59e0b", bg: "rgba(245,158,11,0.12)"  },
}

export function NotificationIcon({ type, size = 14 }: Props) {
  const { Icon, color, bg } = CONFIG[type]

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: size * 2.4, height: size * 2.4, background: bg }}
    >
      <Icon size={size} style={{ color }} strokeWidth={2} />
    </div>
  )
}
