"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, Bell, X, Command } from "lucide-react"
import { useNav } from "@/context/NavContext"
import { NotificationsBadge } from "@/components/notifications/NotificationsBadge"
import type { Page } from "@/types"

const SUGGESTIONS: { label: string; type: string; page?: Page }[] = [
  { label: "Feed principal",      type: "Página",  page: "Feed"           },
  { label: "Explorar comunidades",type: "Página",  page: "Explorar"       },
  { label: "Chat",                type: "Página",  page: "Chat"           },
  { label: "Configuración",       type: "Página",  page: "Configuración"  },
]

export default function Topbar() {
  const { setActivePage } = useNav()
  const [query,   setQuery]   = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setFocused(true)
      }
      if (e.key === "Escape") { setFocused(false); setQuery("") }
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [])

  const filtered = SUGGESTIONS.filter(s =>
    !query || s.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: 56,
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "rgba(19,19,19,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        flexShrink: 0,
        position: "relative",
        zIndex: 30,
      }}
    >
      {/* Search */}
      <div style={{ flex: 1, maxWidth: 480, margin: "0 auto", position: "relative" }}>
        <motion.div
          animate={{
            borderColor: focused ? "var(--color-accent-border)" : "var(--color-border)",
            boxShadow: focused ? "0 0 0 3px rgba(196,154,255,0.1)" : "none",
          }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid var(--color-border)",
            borderRadius: 9,
            padding: "7px 12px",
            background: "var(--color-bg)",
          }}
        >
          <Search size={13} style={{ color: "var(--color-text)", opacity: 0.5, flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Buscar en Devsanctum..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 12,
              color: "var(--color-text-h)",
              width: "100%",
            }}
          />
          {query ? (
            <motion.button
              onClick={() => setQuery("")}
              whileTap={{ scale: 0.9 }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text)", display: "flex" }}
            >
              <X size={12} strokeWidth={2} />
            </motion.button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 2, opacity: 0.3, flexShrink: 0 }}>
              <Command size={10} style={{ color: "var(--color-text)" }} />
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--color-text)" }}>K</span>
            </div>
          )}
        </motion.div>

        {/* Dropdown */}
        <AnimatePresence>
          {focused && filtered.length > 0 && (
            <motion.div
              key="search-dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                right: 0,
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                overflow: "hidden",
                zIndex: 100,
              }}
            >
              <div style={{ padding: "8px 12px 4px", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-text)", opacity: 0.4 }}>
                {query ? "Resultados" : "Sugerencias"}
              </div>
              {filtered.map((s, i) => (
                <motion.button
                  key={i}
                  onClick={() => { s.page && setActivePage(s.page); setFocused(false); setQuery("") }}
                  whileHover={{ backgroundColor: "var(--color-bg-hover)" }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-h)" }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "var(--color-text)", opacity: 0.5, marginLeft: "auto" }}>{s.type}</div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <NotificationsBadge />
        <motion.button
          onClick={() => setActivePage("Perfil")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-accent-bg)", border: "1px solid var(--color-accent-border)", fontSize: 11, fontWeight: 700, color: "var(--color-accent)", cursor: "pointer" }}
        >
          AV
        </motion.button>
      </div>
    </motion.header>
  )
}
