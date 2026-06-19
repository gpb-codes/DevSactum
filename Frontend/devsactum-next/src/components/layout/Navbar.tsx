"use client"
import React, { useState } from "react"
import {
  Terminal, Hash, Compass, Users, Bookmark, MessageCircle,
  User, Settings, Bell, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react"
import { useNav } from "@/src/store/nav"
import type { Page } from "@/src/types"

const ICON_MAP: Record<string, React.ElementType> = {
  Hash, Compass, Users, Bookmark, MessageCircle, User, Settings, Bell,
}

const NAV = [
  { label: "Navegación", items: [
    { name: "Feed" as Page, icon: "Hash", accent: true },
    { name: "Explorar" as Page, icon: "Compass" },
  ]},
  { label: "Comunidad", items: [
    { name: "Comunidades" as Page, icon: "Users", badge: 3 },
    { name: "Guardados" as Page, icon: "Bookmark" },
    { name: "Chat" as Page, icon: "MessageCircle", badge: 5 },
  ]},
  { label: "Cuenta", items: [
    { name: "Perfil" as Page, icon: "User" },
    { name: "Notificaciones" as Page, icon: "Bell", badge: 4 },
    { name: "Configuración" as Page, icon: "Settings" },
  ]},
]

export function Navbar() {
  const { activePage, setActivePage } = useNav()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav
      aria-label="Navegación principal"
      className={`
        flex flex-col h-full shrink-0 overflow-hidden border-r
        bg-[var(--bg-surface)] border-[var(--border)]
        transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]
        ${collapsed ? "w-[68px]" : "w-[228px]"}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-[18px] h-[58px] shrink-0 border-b border-[var(--border)] ${collapsed ? "justify-center px-0" : ""}`}>
        <div className="w-8 h-8 rounded-[var(--radius-lg)] bg-[var(--primary-soft)] border border-[var(--primary-border)] flex items-center justify-center shrink-0 glow-primary">
          <Terminal size={15} className="text-[var(--primary)]" strokeWidth={2} />
        </div>
        {!collapsed && (
          <span className="text-base font-black gradient-text tracking-[-0.3px]">
            Devsanctum
          </span>
        )}
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {NAV.map(section => (
          <div key={section.label}>
            {!collapsed && (
              <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-[var(--text-muted)] px-2 pb-1">
                {section.label}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map(({ name, icon, badge }: { name: Page; icon: string; badge?: number }) => {
                const Icon = ICON_MAP[icon]
                const isActive = activePage === name
                return (
                  <button
                    key={name}
                    onClick={() => setActivePage(name)}
                    title={collapsed ? name : undefined}
                    className={`
                      w-full flex items-center gap-2.5 rounded-[var(--radius-lg)] text-sm font-semibold cursor-pointer
                      transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]
                      ${collapsed ? "justify-center px-0 py-[10px] mx-auto w-10 h-10" : "px-3 py-2.5"}
                      ${isActive
                        ? "bg-[var(--nav-active-bg)] text-[var(--primary)] border border-[var(--nav-active-border)] shadow-[var(--shadow-glow)]"
                        : "text-[var(--text-soft)] border border-transparent hover:bg-[var(--nav-hover-bg)] hover:text-[var(--text-h)]"
                      }
                    `}
                  >
                    {Icon && (
                      <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} className="shrink-0" />
                    )}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{name}</span>
                        {badge != null && (
                          <span className="bg-[var(--primary)] text-white text-[10px] font-black px-1.5 min-w-[20px] h-[18px] flex items-center justify-center rounded-full leading-none">
                            {badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-[var(--border)] space-y-2">
        {!collapsed && (
          <button
            onClick={() => setActivePage("Login" as Page)}
            className="flex items-center justify-center gap-2 bg-[var(--primary)] text-white border-none rounded-[var(--radius-lg)] px-3 py-2.5 text-sm font-bold cursor-pointer w-full hover:brightness-110 transition-all shadow-[var(--shadow-glow)]"
          >
            <Sparkles size={14} strokeWidth={2} />
            Iniciar sesión
          </button>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center gap-1.5 bg-transparent border border-[var(--border)] rounded-[var(--radius-lg)] px-3 py-2 text-[11px] font-semibold text-[var(--text-soft)] cursor-pointer w-full hover:bg-[var(--bg-hover)] hover:text-[var(--text-h)] transition-colors"
        >
          {collapsed
            ? <ChevronRight size={14} strokeWidth={2} />
            : <><ChevronLeft size={14} strokeWidth={2} /> <span>Colapsar</span></>
          }
        </button>
      </div>
    </nav>
  )
}
