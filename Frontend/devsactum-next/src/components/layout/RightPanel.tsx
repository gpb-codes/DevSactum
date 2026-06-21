"use client"
import React from "react"
import { TrendingUp, Flame } from "lucide-react"

const TRENDS = [
  { cat: "Diseño · Popular", name: "#sistemaDiseño", count: "84 posts" },
  { cat: "Dev · Activo", name: "#typescript", count: "230 posts" },
  { cat: "Evento · Hoy", name: "Sprint Review", count: "18 asistentes" },
]

const ONLINE = [
  { name: "Juan Pérez", role: "Developer", status: "online", init: "JP", bg: "#a855f7" },
  { name: "María García", role: "Designer", status: "away", init: "MG", bg: "linear-gradient(135deg,#a855f7,#22d3ee)" },
  { name: "Carlos López", role: "PM", status: "offline", init: "CL", bg: "#fb923c" },
]

export function RightPanel() {
  return (
    <aside
      aria-label="Panel lateral"
      className="w-[280px] min-w-[280px] h-full overflow-y-auto border-l border-[var(--border)] shrink-0 flex flex-col bg-[var(--bg-surface)]"
    >
      {/* Tendencias */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Flame size={14} className="text-[var(--accent)]" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[var(--text-muted)]">
            Tendencias
          </span>
        </div>
        <div className="space-y-1">
          {TRENDS.map((t) => (
            <div
              key={t.name}
              className="rounded-[var(--radius-lg)] p-3 hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
            >
              <p className="text-[9px] font-bold uppercase tracking-[1px] text-[var(--text-muted)] m-0 mb-0.5">
                {t.cat}
              </p>
              <p className="text-sm font-bold text-[var(--text-h)] m-0 mb-0.5">{t.name}</p>
              <p className="text-xs text-[var(--text-soft)] m-0">{t.count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-[var(--border)] mx-5" />

      {/* En línea */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={14} className="text-[var(--primary)]" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[var(--text-muted)]">
            En línea
          </span>
        </div>
        <div className="space-y-2">
          {ONLINE.map((m) => (
            <div
              key={m.name}
              className="flex items-center gap-3 p-2.5 rounded-[var(--radius-lg)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <div className="relative shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: m.bg }}
                >
                  {m.init}
                </div>
                <span
                  className={`
                    absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full border-2 border-[var(--bg-surface)]
                    ${m.status === "online" ? "bg-[var(--online)]" : ""}
                    ${m.status === "away" ? "bg-[var(--away)]" : ""}
                    ${m.status === "offline" ? "bg-[var(--offline)]" : ""}
                  `}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--text-h)] m-0 leading-[1.3]">{m.name}</p>
                <p className="text-[11px] text-[var(--text-soft)] m-0">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
