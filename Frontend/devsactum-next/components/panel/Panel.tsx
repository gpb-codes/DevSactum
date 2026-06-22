"use client"

import React from "react"

const TRENDS = [
  { category: "Diseño · Popular", name: "#sistemaDiseño", count: "84 posts"      },
  { category: "Dev · Activo",     name: "#typescript",    count: "230 posts"     },
  { category: "Evento · Hoy",     name: "Sprint Review",  count: "18 asistentes" },
]

const MEMBERS = [
  { name: "Juan Pérez",   role: "Developer", status: "online",  initials: "JP", bg: "#3b82f6"                    },
  { name: "María García", role: "Designer",  status: "away",    initials: "MG", bg: "linear-gradient(135deg,#8b5cf6,#c49aff)" },
  { name: "Carlos López", role: "PM",        status: "offline", initials: "CL", bg: "#ec4899"                    },
]

const STATUS: Record<string, string> = {
  online:  "#3ba55d",
  away:    "#f59e0b",
  offline: "#6b7280",
}

export default function RightPanel() {
  return (
    <aside className="w-[260px] min-w-[260px] h-full overflow-y-auto overflow-x-hidden bg-bg-surface border-l border-border shrink-0 flex flex-col">
      {/* Tendencias */}
      <div className="px-5 pt-5">
        <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text/50 mb-3">
          Tendencias
        </div>

        <div className="animate-stagger">
          {TRENDS.map((t, i) => (
            <div
              key={t.name}
              className={`py-3 ${i < TRENDS.length - 1 ? "border-b border-border" : ""} cursor-pointer transition-all hover:opacity-80`}
            >
              <div className="text-[9px] font-bold uppercase tracking-[1px] text-text/50 mb-1">
                {t.category}
              </div>
              <div className="text-[13px] font-bold text-text-h mb-0.5">
                {t.name}
              </div>
              <div className="text-[11px] text-text/55">
                {t.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-border mx-5 my-3" />

      {/* En línea */}
      <div className="px-5 pb-5">
        <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text/50 mb-3">
          En línea
        </div>

        <div className="animate-stagger">
          {MEMBERS.map((m) => (
            <div
              key={m.name}
              className="flex items-center gap-2.5 py-2 border-b border-border transition-all hover:opacity-80"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ background: m.bg }}
              >
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-bold text-text-h leading-tight">{m.name}</div>
                <div className="text-[10px] text-text/55">{m.role}</div>
              </div>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: STATUS[m.status] }} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
