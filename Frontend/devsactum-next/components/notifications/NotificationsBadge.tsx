"use client"

import React, { useState } from "react"
import { Bell, X, CheckCheck } from "lucide-react"
import { useNotifications, type NotificationType } from "@/context/NotificationsContext"
import { useNav } from "@/context/NavContext"

const TYPE_DOTS: Record<NotificationType, string> = {
  like: "bg-[#ff94a8]",
  comment: "bg-[#c49aff]",
  follow: "bg-[#4ade80]",
  mention: "bg-[#60a5fa]",
  share: "bg-[#f59e0b]",
  message: "bg-[#22d3ee]",
  job: "bg-[#4ade80]",
  system: "bg-accent",
  achievement: "bg-[#f59e0b]",
  security: "bg-[#f87171]",
}

export function NotificationsBadge() {
  const { setActivePage } = useNav()
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()
  const [open, setOpen] = useState(false)

  const recent = notifications.slice(0, 5)

  function timeAgo(ts: number): string {
    const diff = Math.floor((Date.now() - ts) / 1000)
    if (diff < 60) return "ahora"
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    return `${Math.floor(diff / 86400)}d`
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg bg-transparent border-none cursor-pointer text-text hover:text-text-h transition-colors"
      >
        <Bell size={16} strokeWidth={1.8} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full bg-accent text-[#1a0033] text-[9px] font-black flex items-center justify-center px-1 animate-fade-in">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-[340px] bg-bg-surface border border-border rounded-[14px] shadow-xl z-50 animate-scale-in overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-[12px] font-bold text-text-h">Notificaciones</span>
              {unreadCount > 0 && (
                <button onClick={markAllRead}
                  className="text-[10px] font-bold text-accent bg-transparent border-none cursor-pointer flex items-center gap-1">
                  <CheckCheck size={10} strokeWidth={2.5} /> Todo leído
                </button>
              )}
            </div>

            {recent.length === 0 ? (
              <div className="py-8 text-center">
                <Bell size={24} className="mx-auto text-text opacity-20 mb-2" strokeWidth={1.5} />
                <p className="text-[11px] text-text opacity-60 m-0">Sin notificaciones</p>
              </div>
            ) : (
              <div className="max-h-[320px] overflow-y-auto">
                {recent.map(n => (
                  <div
                    key={n.id}
                    onClick={() => { markRead(n.id); setOpen(false); if (n.link) setActivePage(n.link as any) }}
                    className={`flex items-start gap-2.5 px-4 py-3 cursor-pointer transition-colors hover:bg-bg-hover border-b border-border last:border-none ${
                      !n.read ? "bg-accent-bg/30" : ""
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${TYPE_DOTS[n.type] || "bg-accent"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-text-h truncate">{n.title}</span>
                        {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                      </div>
                      <p className="text-[10px] text-text opacity-70 m-0 truncate">{n.message}</p>
                    </div>
                    <span className="text-[9px] text-text opacity-40 shrink-0">{timeAgo(n.timestamp)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="px-4 py-2.5 border-t border-border">
              <button onClick={() => { setOpen(false); setActivePage("Notificaciones") }}
                className="w-full text-center text-[11px] font-bold text-accent bg-transparent border-none cursor-pointer">
                Ver todas
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
