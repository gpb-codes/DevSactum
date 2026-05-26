"use client"

import React, { useState } from "react"
import {
  Terminal, Compass, Users, Bookmark, MessageCircle,
  User, Settings, Bell, ChevronLeft, ChevronRight, Sparkles, Hash,
} from "lucide-react"
import { useNav } from "@/context/NavContext"
import type { Page } from "@/types"

const NAV_SECTIONS: {
  label: string
  items: { name: Page; Icon: React.ElementType; badge?: number; color?: string }[]
}[] = [
  {
    label: "Navegación",
    items: [
      { name: "Feed",     Icon: Hash,    color: "text-accent"    },
      { name: "Explorar", Icon: Compass, color: "text-tertiary"  },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { name: "Comunidades", Icon: Users,         badge: 3 },
      { name: "Guardados",   Icon: Bookmark               },
      { name: "Chat",        Icon: MessageCircle, badge: 5 },
    ],
  },
  {
    label: "Cuenta",
    items: [
      { name: "Perfil",         Icon: User                  },
      { name: "Notificaciones", Icon: Bell,      badge: 4   },
      { name: "Configuración",  Icon: Settings              },
    ],
  },
]

export default function Navbar() {
  const { activePage, setActivePage } = useNav()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav
      style={{
        width: collapsed ? 64 : 220,
        minWidth: collapsed ? 64 : 220,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--color-bg-surface)",
        borderRight: "1px solid var(--color-border)",
        transition: "width 0.25s ease, min-width 0.25s ease",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "18px 16px",
          borderBottom: "1px solid var(--color-border)",
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <div className="w-8 h-8 rounded-[8px] bg-accent-bg border border-accent-border flex items-center justify-center shrink-0 animate-glow">
          <Terminal size={15} className="text-accent" strokeWidth={2} />
        </div>
        {!collapsed && (
          <span className="text-[15px] font-black text-accent tracking-tight truncate">Devsanctum</span>
        )}
      </div>

      {/* Nav items — ocupa todo el espacio disponible */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "12px 8px" }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} style={{ marginBottom: 4 }}>
            {!collapsed && (
              <div className="text-[9px] font-bold text-text uppercase tracking-[1.2px] px-2 mb-1.5 mt-4 opacity-40 first:mt-0">
                {section.label}
              </div>
            )}
            {collapsed && <div style={{ height: 12 }} />}

            {section.items.map(({ name, Icon, badge, color }) => {
              const isActive = activePage === name
              return (
                <button
                  key={name}
                  onClick={() => setActivePage(name)}
                  title={collapsed ? name : undefined}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: collapsed ? "9px 0" : "8px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: 8,
                    border: "1px solid",
                    borderColor: isActive ? "var(--color-accent-border)" : "transparent",
                    background: isActive ? "var(--color-accent-bg)" : "transparent",
                    color: isActive ? "var(--color-accent)" : "var(--color-text)",
                    cursor: "pointer",
                    fontSize: 13,
                    marginBottom: 2,
                    transition: "all 0.15s ease",
                  }}
                  className={`hover:bg-accent-bg hover:text-accent ${!isActive && color ? color : ""}`}
                >
                  <Icon size={15} strokeWidth={1.8} style={{ flexShrink: 0, opacity: 0.85 }} />
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1, textAlign: "left", fontWeight: isActive ? 700 : 500 }}>{name}</span>
                      {badge != null && (
                        <span className="ml-auto bg-accent text-[#1a0033] text-[10px] font-black px-1.5 rounded-full min-w-[18px] text-center" style={{ lineHeight: "18px" }}>
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Bottom: login + collapse */}
      <div
        style={{
          padding: "10px 8px",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: collapsed ? "center" : "stretch",
        }}
      >
        {!collapsed && (
          <button
            onClick={() => setActivePage("Login")}
            className="flex items-center gap-2 bg-accent text-[#1a0033] text-[12px] font-extrabold py-2.5 rounded-[9px] cursor-pointer hover:opacity-85 transition-opacity border-none px-3"
          >
            <Sparkles size={14} strokeWidth={2} />
            Iniciar sesión
          </button>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center py-2 rounded-[9px] bg-transparent border border-border text-text cursor-pointer hover:bg-bg-hover hover:text-text-h transition-all duration-150"
          style={{ width: "100%" }}
        >
          {collapsed
            ? <ChevronRight size={14} strokeWidth={2} />
            : <><ChevronLeft size={14} strokeWidth={2} /><span className="text-[11px] font-medium ml-1">Colapsar</span></>
          }
        </button>
      </div>
    </nav>
  )
}
