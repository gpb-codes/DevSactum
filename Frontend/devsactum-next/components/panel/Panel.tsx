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
    <aside
      style={{
        width: 260,
        minWidth: 260,
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        background: "var(--color-bg-surface)",
        borderLeft: "1px solid var(--color-border)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tendencias */}
      <div style={{ padding: "20px 20px 0" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "var(--color-text)",
            opacity: 0.5,
            marginBottom: 12,
          }}
        >
          Tendencias
        </div>

        {TRENDS.map((t, i) => (
          <div
            key={t.name}
            style={{
              padding: "12px 0",
              borderBottom: i < TRENDS.length - 1 ? "1px solid var(--color-border)" : "none",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text)", opacity: 0.5, marginBottom: 3 }}>
              {t.category}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-h)", marginBottom: 2 }}>
              {t.name}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text)", opacity: 0.55 }}>
              {t.count}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--color-border)", margin: "12px 20px" }} />

      {/* En línea */}
      <div style={{ padding: "0 20px 20px" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "var(--color-text)",
            opacity: 0.5,
            marginBottom: 12,
          }}
        >
          En línea
        </div>

        {MEMBERS.map((m) => (
          <div
            key={m.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 0",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: m.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {m.initials}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-h)", lineHeight: 1.3 }}>{m.name}</div>
              <div style={{ fontSize: 10, color: "var(--color-text)", opacity: 0.55 }}>{m.role}</div>
            </div>

            {/* Status dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: STATUS[m.status],
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>
    </aside>
  )
}
