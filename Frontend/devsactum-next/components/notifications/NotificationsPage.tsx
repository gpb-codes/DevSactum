"use client"

import React from "react"
import { Bell, CheckCheck, Trash2, Zap } from "lucide-react"
import { NotificationRow } from "./NotificationRow"
import { useNotifications } from "@/hooks/useNotifications"

const TABS = [
  { key: "all",      label: "Todas"    },
  { key: "unread",   label: "Sin leer" },
  { key: "mentions", label: "Menciones"},
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

  const unread  = filtered.filter((n) => !n.read)
  const read    = filtered.filter((n) =>  n.read)

  return (
    <div className="max-w-[680px] mx-auto px-6 py-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          {/* Icono */}
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(196,154,255,0.12)] border border-[rgba(196,154,255,0.3)] flex items-center justify-center">
            <Bell size={18} className="text-[#c49aff]" strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-[22px] font-black tracking-tight text-white m-0">
              Alerts
            </h1>
            <p className="text-[11px] text-[#767575] m-0 mt-0.5 font-mono tracking-widest uppercase">
              {unreadCount > 0 ? `${unreadCount} sin leer` : "Todo al día"}
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              title="Marcar todo como leído"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2e303a] bg-transparent text-[#adaaaa] text-[11px] font-bold cursor-pointer hover:border-[#c49aff] hover:text-[#c49aff] transition-all duration-150"
            >
              <CheckCheck size={13} strokeWidth={2} />
              Marcar leídas
            </button>
          )}
          <button
            onClick={clearAll}
            title="Eliminar todas"
            className="w-8 h-8 rounded-lg border border-[#2e303a] bg-transparent text-[#767575] flex items-center justify-center cursor-pointer hover:border-[rgba(255,148,168,0.5)] hover:text-[#ff94a8] transition-all duration-150"
          >
            <Trash2 size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ── Live badge ── */}
      {unreadCount > 0 && (
        <div className="flex items-center gap-2 mb-5 px-4 py-2.5 rounded-lg bg-[rgba(196,154,255,0.06)] border border-[rgba(196,154,255,0.15)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c49aff] animate-pulse shrink-0" />
          <span className="text-[11px] font-bold text-[#c49aff] uppercase tracking-[1.5px]">
            {unreadCount} notificaciones nuevas
          </span>
          <Zap size={11} className="text-[#c49aff] ml-auto shrink-0" strokeWidth={2} />
        </div>
      )}

      {/* ── Tabs estilo referencia HTML ── */}
      <div className="flex gap-1 mb-6 bg-[#131313] border border-[#2e303a] rounded-lg p-1">
        {TABS.map(({ key, label }) => {
          const count =
            key === "all"      ? filtered.length :
            key === "unread"   ? filtered.filter(n => !n.read).length :
            filtered.filter(n => n.type === "mention").length

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-[7px]
                text-[12px] font-bold cursor-pointer border-none transition-all duration-150
                ${activeTab === key
                  ? "bg-[#c49aff] text-[#1a0033]"
                  : "bg-transparent text-[#767575] hover:text-white"
                }
              `}
            >
              {label}
              {count > 0 && (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-[1.4]
                    ${activeTab === key
                      ? "bg-[rgba(0,0,0,0.2)] text-[#1a0033]"
                      : "bg-[#1a1a1f] text-[#adaaaa]"
                    }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Lista ── */}
      {filtered.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#131313] border border-[#2e303a] flex items-center justify-center mb-5 opacity-50">
            <Bell size={26} className="text-[#767575]" strokeWidth={1.5} />
          </div>
          <p className="text-[15px] font-bold text-white m-0 mb-2">
            {activeTab === "unread"   ? "Sin notificaciones nuevas" :
             activeTab === "mentions" ? "Sin menciones"             :
             "Todo al día"}
          </p>
          <p className="text-[12px] text-[#767575] m-0 max-w-[260px] leading-[1.6]">
            {activeTab === "unread"
              ? "Cuando alguien interactúe contigo, aparecerá aquí"
              : "No hay notificaciones en esta categoría"}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-[#2e303a] overflow-hidden bg-[#131313]">

          {/* Nuevas */}
          {unread.length > 0 && (
            <>
              <div className="px-5 py-2.5 flex items-center justify-between bg-[#1a1919] border-b border-[#2e303a]">
                <span className="text-[9px] font-black uppercase tracking-[2px] text-[#767575]">
                  Nuevas · {unread.length}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#c49aff] animate-pulse" />
              </div>
              {unread.map((n) => (
                <NotificationRow key={n.id} notification={n} onRead={() => markRead(n.id)} />
              ))}
            </>
          )}

          {/* Anteriores */}
          {read.length > 0 && (
            <>
              <div className={`px-5 py-2.5 bg-[#1a1919] border-b border-[#2e303a] ${unread.length > 0 ? "border-t border-[#2e303a]" : ""}`}>
                <span className="text-[9px] font-black uppercase tracking-[2px] text-[#767575]">
                  Anteriores · {read.length}
                </span>
              </div>
              {read.map((n) => (
                <NotificationRow key={n.id} notification={n} onRead={() => markRead(n.id)} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
