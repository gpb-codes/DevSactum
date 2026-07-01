"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Terminal, Compass, Users, Bookmark, MessageCircle,
  User, Settings, Bell, ChevronLeft, ChevronRight, Sparkles, Hash, Briefcase, Brain,
  Code2, DollarSign, Shield, Award, Building2, Phone, Crown,
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
      { name: "Feed",             Icon: Hash,      color: "text-accent"    },
      { name: "Explorar",         Icon: Compass,   color: "text-tertiary"  },
      { name: "Bolsa de Empleo",  Icon: Briefcase, color: "text-success"   },
      { name: "Empleo IA",        Icon: Brain,     color: "text-primary"   },
      { name: "Freelancing",      Icon: DollarSign, color: "text-warning"  },
    ],
  },
  {
    label: "Tu Carrera",
    items: [
      { name: "Portafolio",       Icon: Code2,     color: "text-secondary" },
      { name: "Reputación",       Icon: Award,     color: "text-accent"    },
      { name: "Validación",       Icon: Shield,    color: "text-success"   },
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
    label: "Pro",
    items: [
      { name: "Membresía Dev",        Icon: Crown,     color: "text-accent"   },
      { name: "Membresía Reclutador", Icon: Building2, color: "text-tertiary" },
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
  {
    label: "Empresa",
    items: [
      { name: "Nosotros",       Icon: Building2, color: "text-secondary" },
      { name: "Contáctanos",    Icon: Phone,     color: "text-accent"    },
    ],
  },
]

export default function Navbar() {
  const { activePage, setActivePage } = useNav()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setCollapsed(true)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <motion.nav
      animate={{ width: collapsed ? 64 : 220, minWidth: collapsed ? 64 : 220 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--color-bg-surface)",
        flexShrink: 0,
        ...(isMobile ? { position: "fixed" as const, zIndex: 40, height: "100%" } : {}),
      }}
    >
      {/* Logo */}
      <motion.div
        layout
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              key="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="text-[15px] font-black text-accent tracking-tight truncate"
            >
              Devsanctum
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "12px 8px" }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} style={{ marginBottom: 4 }}>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  key="label"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 0.4, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="text-[9px] font-bold text-text uppercase tracking-[1.2px] px-2 mb-1.5 mt-4 first:mt-0"
                >
                  {section.label}
                </motion.div>
              )}
            </AnimatePresence>
            {collapsed && <div style={{ height: 12 }} />}

            {section.items.map(({ name, Icon, badge, color }) => {
              const isActive = activePage === name
              return (
                <motion.button
                  key={name}
                  onClick={() => setActivePage(name)}
                  title={collapsed ? name : undefined}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
                  }}
                  className={`hover:bg-accent-bg hover:text-accent ${!isActive && color ? color : ""}`}
                >
                  <Icon size={15} strokeWidth={1.8} style={{ flexShrink: 0, opacity: 0.85 }} />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ flex: 1, textAlign: "left", fontWeight: isActive ? 700 : 500, overflow: "hidden", whiteSpace: "nowrap" }}
                      >
                        {name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!collapsed && badge != null && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto bg-accent text-[#1a0033] text-[10px] font-black px-1.5 rounded-full min-w-[18px] text-center"
                      style={{ lineHeight: "18px" }}
                    >
                      {badge}
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Bottom: login + collapse */}
      <motion.div
        layout
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding: "10px 8px",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: collapsed ? "center" : "stretch",
        }}
      >
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.button
              key="login-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              onClick={() => setActivePage("Login")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-accent text-[#1a0033] text-[12px] font-extrabold py-2.5 rounded-[9px] cursor-pointer border-none px-3"
            >
              <Sparkles size={14} strokeWidth={2} />
              Iniciar sesión
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center py-2 rounded-[9px] bg-transparent border border-border text-text cursor-pointer hover:bg-bg-hover hover:text-text-h transition-colors duration-150"
          style={{ width: "100%" }}
        >
          {collapsed
            ? <ChevronRight size={14} strokeWidth={2} />
            : <><ChevronLeft size={14} strokeWidth={2} /><span className="text-[11px] font-medium ml-1">Colapsar</span></>
          }
        </motion.button>
      </motion.div>
    </motion.nav>
  )
}
