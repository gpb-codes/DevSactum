"use client"

import React from "react"
import { Bell, CheckCheck, Trash2, Zap } from "lucide-react"
import { NotificationRow } from "./NotificationRow"
import { useNotifications } from "@/src/hooks/useNotifications"
import { EmptyState } from "@/src/components/ui/EmptyState"

const TABS = [
  { key: "all",      label: "Todas" },
  { key: "unread",   label: "Sin leer" },
  { key: "mentions", label: "Menciones" },
] as const

export default function NotificationsPage() {
  const {
    filtered,
    unreadCount,
    activeTab,
    setActiveTab,
    markRead,
    markAllRead,
    clearAll,
  } = useNotifications()

  const unread = filtered.filter(n => !n.read)
  const read   = filtered.filter(n =>  n.read)

  return (
    <div className="max-w-[680px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--primary-soft)] border border-[var(--primary-border)] flex items-center justify-center">
            <Bell size={18} className="text-[var(--primary)]" strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-[var(--text-h)] m-0">
              Alerts
            </h1>
            <p className="text-xs text-[var(--text-soft)] m-0 mt-0.5 font-mono tracking-widest uppercase">
              {unreadCount > 0 ? `${unreadCount} sin leer` : "Todo al día"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-lg)] border-2 border-[var(--border)] bg-transparent text-[var(--text-soft)] text-xs font-bold cursor-pointer hover:border-[var(--primary-border)] hover:text-[var(--primary)] transition-all"
            >
              <CheckCheck size={13} strokeWidth={2} />
              Marcar leídas
            </button>
          )}
          <button
            onClick={clearAll}
            className="w-8 h-8 rounded-[var(--radius-lg)] border-2 border-[var(--border)] bg-transparent text-[var(--text-soft)] flex items-center justify-center cursor-pointer hover:border-[var(--danger)] hover:text-[var(--danger)] transition-all"
          >
            <Trash2 size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Live badge */}
      {unreadCount > 0 && (
        <div className="flex items-center gap-2 mb-5 px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--primary-soft)]/50 border border-[var(--primary-border)]/50">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[var(--primary)]" />
          </span>
          <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-[1.5px]">
            {unreadCount} notificaciones nuevas
          </span>
          <Zap size={11} className="text-[var(--primary)] ml-auto shrink-0" strokeWidth={2} />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-[var(--radius-lg)] p-1">
        {TABS.map(({ key, label }) => {
          const count =
            key === "all"    ? filtered.length :
            key === "unread" ? filtered.filter(n => !n.read).length :
            filtered.filter(n => n.type === "mention").length

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-[var(--radius-md)] text-sm font-bold cursor-pointer border-none transition-all duration-[var(--duration-fast)] ${
                activeTab === key
                  ? "bg-[var(--primary)] text-white shadow-[var(--shadow-glow)]"
                  : "bg-transparent text-[var(--text-soft)] hover:text-[var(--text-h)]"
              }`}
            >
              {label}
              {count > 0 && (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-[1.4] ${
                    activeTab === key
                      ? "bg-white/20 text-white"
                      : "bg-[var(--bg-hover)] text-[var(--text-soft)]"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bell size={24} className="opacity-40" strokeWidth={1.5} />}
          title={activeTab === "unread" ? "Sin notificaciones nuevas" : activeTab === "mentions" ? "Sin menciones" : "Todo al día"}
          description={activeTab === "unread" ? "Cuando alguien interactúe contigo, aparecerá aquí" : "No hay notificaciones en esta categoría"}
        />
      ) : (
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] overflow-hidden bg-[var(--bg-surface)]">
          {unread.length > 0 && (
            <>
              <div className="px-5 py-3 flex items-center justify-between bg-[var(--bg-hover)] border-b border-[var(--border)]">
                <span className="text-[9px] font-black uppercase tracking-[2px] text-[var(--text-soft)]">
                  Nuevas · {unread.length}
                </span>
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[var(--primary)]" />
                </span>
              </div>
              {unread.map(n => (
                <NotificationRow key={n.id} notification={n} onRead={() => markRead(n.id)} />
              ))}
            </>
          )}

          {read.length > 0 && (
            <>
              <div className={`px-5 py-3 bg-[var(--bg-hover)] border-b border-[var(--border)] ${unread.length > 0 ? "border-t border-[var(--border)]" : ""}`}>
                <span className="text-[9px] font-black uppercase tracking-[2px] text-[var(--text-soft)]">
                  Anteriores · {read.length}
                </span>
              </div>
              {read.map(n => (
                <NotificationRow key={n.id} notification={n} onRead={() => markRead(n.id)} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
