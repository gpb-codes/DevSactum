"use client"

import React from "react"
import { Heart, MessageSquare, UserPlus, AtSign, Repeat2 } from "lucide-react"
import type { Notification } from "@/types"

const TYPE_CONFIG = {
  like:    { Icon: Heart,         color: "#ff94a8", bg: "rgba(255,148,168,0.15)", label: "dio like a tu post"    },
  comment: { Icon: MessageSquare, color: "#c49aff", bg: "rgba(196,154,255,0.15)", label: "comentó tu post"      },
  follow:  { Icon: UserPlus,      color: "#4ade80", bg: "rgba(74,222,128,0.12)",  label: "empezó a seguirte"    },
  mention: { Icon: AtSign,        color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  label: "te mencionó"          },
  share:   { Icon: Repeat2,       color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  label: "compartió tu post"    },
}

interface NotificationRowProps {
  notification: Notification
  onRead: () => void
}

export function NotificationRow({ notification, onRead }: NotificationRowProps) {
  const { Icon, color, bg, label } = TYPE_CONFIG[notification.type]

  return (
    <div
      onClick={onRead}
      className={`
        group flex items-start gap-4 px-5 py-4 border-b border-[#2e303a] last:border-b-0
        cursor-pointer transition-all duration-150 hover:bg-[#1a1a1f]
        ${!notification.read ? "bg-[rgba(196,154,255,0.04)]" : ""}
      `}
    >
      {/* Avatar con badge de tipo */}
      <div className="relative shrink-0 mt-0.5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
          style={{ background: notification.actor.avatarGradient }}
        >
          {notification.actor.initials}
        </div>
        {/* Type badge — esquina inferior derecha */}
        <div
          className="absolute -bottom-1 -right-1 w-[22px] h-[22px] rounded-full border-2 border-[#131313] flex items-center justify-center"
          style={{ background: bg }}
        >
          <Icon size={10} style={{ color }} strokeWidth={2.5} />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] leading-[1.55] m-0">
          <span className="font-bold text-white">{notification.actor.name}</span>
          {" "}
          <span className="text-[#adaaaa]">{label}</span>
        </p>
        {notification.postPreview && (
          <p className="text-[11px] text-[#767575] m-0 mt-1 truncate max-w-[360px]">
            &ldquo;{notification.postPreview}&rdquo;
          </p>
        )}
        <p className="text-[10px] text-[#767575] m-0 mt-1.5 font-mono tracking-wide">
          {notification.createdAt}
        </p>
      </div>

      {/* Dot no leído */}
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-[#c49aff] shrink-0 mt-2 animate-pulse" />
      )}
    </div>
  )
}
