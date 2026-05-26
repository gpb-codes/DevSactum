"use client"

import React, { useState, useRef, useEffect } from "react"
import { Search, Bell, X, Command } from "lucide-react"
import { useNav } from "@/context/NavContext"
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
    <header
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: `1px solid ${focused ? "var(--color-accent-border)" : "var(--color-border)"}`,
            borderRadius: 9,
            padding: "7px 12px",
            background: focused ? "var(--color-bg)" : "var(--color-bg)",
            boxShadow: focused ? "0 0 0 3px rgba(196,154,255,0.1)" : "none",
            transition: "all 0.2s ease",
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
            <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text)", display: "flex" }}>
              <X size={12} strokeWidth={2} />
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 2, opacity: 0.3, flexShrink: 0 }}>
              <Command size={10} style={{ color: "var(--color-text)" }} />
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--color-text)" }}>K</span>
            </div>
          )}
        </div>

        {/* Dropdown */}
        {focused && filtered.length > 0 && (
          <div
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
            className="animate-fade-in"
          >
            <div style={{ padding: "8px 12px 4px", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-text)", opacity: 0.4 }}>
              {query ? "Resultados" : "Sugerencias"}
            </div>
            {filtered.map((s, i) => (
              <button
                key={i}
                onClick={() => { s.page && setActivePage(s.page); setFocused(false); setQuery("") }}
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
                className="hover:bg-bg-hover"
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-h)" }}>{s.label}</div>
                <div style={{ fontSize: 10, color: "var(--color-text)", opacity: 0.5, marginLeft: "auto" }}>{s.type}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button
          onClick={() => setActivePage("Notificaciones")}
          style={{ position: "relative", width: 32, height: 32, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, color: "var(--color-text)" }}
          className="hover:bg-bg-hover hover:text-text-h transition-colors"
        >
          <Bell size={15} strokeWidth={1.8} />
          <span style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: "50%", background: "var(--color-tertiary)" }} />
        </button>
        <button
          onClick={() => setActivePage("Perfil")}
          style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-accent-bg)", border: "1px solid var(--color-accent-border)", fontSize: 11, fontWeight: 700, color: "var(--color-accent)", cursor: "pointer" }}
          className="hover:bg-accent hover:text-[#1a0033] transition-colors"
        >
          AV
        </button>
      </div>
    </header>
  )
}
