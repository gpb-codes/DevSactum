"use client"

import React, { useState } from "react"
import {
  Bell, CheckCheck, Trash2, Zap, Heart, MessageSquare, UserPlus,
  AtSign, Repeat2, Briefcase, Shield, Award, Settings, Volume2, VolumeX,
  Filter, Clock,
} from "lucide-react"
import { useNotifications, type Notification, type NotificationType } from "@/context/NotificationsContext"
import { useNav } from "@/context/NavContext"

const TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; color: string; bg: string }> = {
  like:      { icon: Heart,        color: "text-[#ff94a8]",  bg: "bg-[rgba(255,148,168,0.15)]" },
  comment:   { icon: MessageSquare, color: "text-[#c49aff]",  bg: "bg-[rgba(196,154,255,0.15)]" },
  follow:    { icon: UserPlus,      color: "text-[#4ade80]",  bg: "bg-[rgba(74,222,128,0.12)]"  },
  mention:   { icon: AtSign,        color: "text-[#60a5fa]",  bg: "bg-[rgba(96,165,250,0.12)]"  },
  share:     { icon: Repeat2,       color: "text-[#f59e0b]",  bg: "bg-[rgba(245,158,11,0.12)]"  },
  message:   { icon: MessageSquare, color: "text-[#22d3ee]",  bg: "bg-[rgba(34,211,238,0.12)]"  },
  job:       { icon: Briefcase,     color: "text-[#4ade80]",  bg: "bg-[rgba(74,222,128,0.12)]"  },
  system:    { icon: Zap,           color: "text-accent",     bg: "bg-accent-bg" },
  achievement: { icon: Award,       color: "text-[#f59e0b]",  bg: "bg-[rgba(245,158,11,0.12)]"  },
  security:  { icon: Shield,        color: "text-[#f87171]",  bg: "bg-[rgba(248,113,113,0.12)]" },
}

function NotificationRow({ notif, onRead }: { notif: Notification; onRead: (id: string) => void }) {
  const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
  const Icon = config.icon

  function timeAgo(ts: number): string {
    const diff = Math.floor((Date.now() - ts) / 1000)
    if (diff < 60) return "ahora"
    if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`
    return `hace ${Math.floor(diff / 86400)}d`
  }

  return (
    <div
      onClick={() => !notif.read && onRead(notif.id)}
      className={`flex items-start gap-3.5 px-5 py-4 border-b border-border cursor-pointer transition-all hover:bg-bg-hover animate-fade-in ${
        !notif.read ? "bg-accent-bg/30" : ""
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.bg}`}>
        <Icon size={16} className={config.color} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-bold text-text-h">{notif.title}</span>
          {!notif.read && <div className="w-2 h-2 rounded-full bg-accent shrink-0" />}
        </div>
        <p className="text-[12px] text-text leading-[1.5] m-0 opacity-80">{notif.message}</p>
        <span className="text-[10px] text-text opacity-50 mt-1 block">{timeAgo(notif.timestamp)}</span>
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  const { setActivePage } = useNav()
  const { notifications, unreadCount, markRead, markAllRead, clearAll, soundEnabled, toggleSound, wsState } = useNotifications()
  const [filter, setFilter] = useState<"all" | "unread" | NotificationType>("all")

  const filtered = notifications.filter(n => {
    if (filter === "unread") return !n.read
    if (filter !== "all" && n.type !== filter) return false
    return true
  })

  return (
    <div className="px-6 py-6 max-w-[700px] mx-auto">
      {/* Header */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-accent" strokeWidth={2} />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Notificaciones</span>
            {wsState === "connected" && (
              <span className="flex items-center gap-1 text-[9px] font-bold text-success bg-success-soft px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleSound}
              className="p-1.5 rounded-lg bg-bg-surface border border-border cursor-pointer text-text hover:text-text-h transition-colors"
              title={soundEnabled ? "Silenciar" : "Activar sonido"}>
              {soundEnabled ? <Volume2 size={14} strokeWidth={1.8} /> : <VolumeX size={14} strokeWidth={1.8} />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-black tracking-[-1px] text-text-h m-0">
            Notificaciones {unreadCount > 0 && <span className="text-accent text-[20px]">({unreadCount})</span>}
          </h1>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                className="flex items-center gap-1.5 bg-transparent border border-border text-text rounded-[8px] px-3 py-1.5 text-[11px] font-bold cursor-pointer hover:border-accent-border transition-colors">
                <CheckCheck size={12} strokeWidth={2} /> Marcar todo leído
              </button>
            )}
            {notifications.length > 0 && (
              <button onClick={clearAll}
                className="flex items-center gap-1.5 bg-transparent border border-border text-text rounded-[8px] px-3 py-1.5 text-[11px] font-bold cursor-pointer hover:border-danger hover:text-danger transition-colors">
                <Trash2 size={12} strokeWidth={2} /> Limpiar
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {([
          { key: "all" as const, label: "Todas" },
          { key: "unread" as const, label: `No leídas (${unreadCount})` },
          { key: "like" as const, label: "Likes" },
          { key: "comment" as const, label: "Comentarios" },
          { key: "follow" as const, label: "Seguidores" },
          { key: "message" as const, label: "Mensajes" },
          { key: "job" as const, label: "Empleo" },
          { key: "achievement" as const, label: "Logros" },
        ]).map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer border transition-all ${
              filter === key ? "bg-accent text-[#1a0033] border-accent" : "bg-transparent text-text border-border hover:border-accent-border"
            }`}>{label}</button>
        ))}
      </div>

      {/* Notification list */}
      <div className="bg-bg-surface border border-border rounded-[14px] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Bell size={40} className="mx-auto text-text opacity-20 mb-3" strokeWidth={1.5} />
            <p className="text-[14px] font-bold text-text-h m-0 mb-1">
              {filter === "unread" ? "Todo leído" : "Sin notificaciones"}
            </p>
            <p className="text-[12px] text-text opacity-60 m-0">
              {filter === "unread" ? "No tienes notificaciones nuevas" : "Las notificaciones aparecerán aquí"}
            </p>
          </div>
        ) : (
          filtered.map(notif => (
            <NotificationRow key={notif.id} notif={notif} onRead={markRead} />
          ))
        )}
      </div>

      {/* Bottom hint */}
      <p className="text-center text-[10px] text-text opacity-40 mt-4">
        Las notificaciones se actualizan en tiempo real via WebSocket
      </p>
    </div>
  )
}
