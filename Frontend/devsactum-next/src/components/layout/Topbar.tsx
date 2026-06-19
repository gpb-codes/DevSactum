"use client"
import React, { useState, useRef, useEffect } from "react"
import { Search, Bell, X, Command } from "lucide-react"
import { useNav } from "@/src/store/nav"
import type { Page } from "@/src/types"
import { Avatar } from "@/src/components/ui"
import { ME } from "@/src/lib/mock-data"

const SUGGESTIONS = [
  { label: "Feed principal",       page: "Feed" as Page },
  { label: "Explorar comunidades", page: "Explorar" as Page },
  { label: "Chat",                 page: "Chat" as Page },
  { label: "Configuración",        page: "Configuración" as Page },
]

export function Topbar() {
  const { setActivePage } = useNav()
  const [q, setQ] = useState("")
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === "Escape") { setOpen(false); setQ("") }
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [])

  const results = SUGGESTIONS.filter(
    s => !q || s.label.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <header className="h-[58px] shrink-0 flex items-center justify-between px-5 glass-strong border-b border-[var(--border)] z-30 relative">
      {/* Search */}
      <div className="flex-1 max-w-[480px] mx-auto relative">
        <div
          className={`
            flex items-center gap-2 border-2 rounded-[var(--radius-lg)] px-3 h-[38px]
            bg-[var(--bg)] transition-all duration-[var(--duration-fast)]
            ${open
              ? "border-[var(--border-active)] shadow-[var(--shadow-glow)]"
              : "border-[var(--border)]"
            }
          `}
        >
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Buscar en Devsanctum..."
            className="bg-transparent border-none outline-none text-sm text-[var(--text-h)] w-full placeholder:text-[var(--text-muted)]"
          />
          {q ? (
            <button
              onClick={() => setQ("")}
              className="bg-none border-none cursor-pointer text-[var(--text-muted)] p-0 flex hover:text-[var(--text-h)] transition-colors"
            >
              <X size={12} strokeWidth={2} />
            </button>
          ) : (
            <div className="flex items-center gap-0.5 text-[var(--text-muted)] shrink-0">
              <Command size={10} />
              <span className="text-[10px] font-mono">K</span>
            </div>
          )}
        </div>

        {/* Dropdown */}
        {open && results.length > 0 && (
          <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] overflow-hidden z-[100] animate-fade-in">
            <div className="px-3 pt-2.5 pb-1 text-[9px] font-bold uppercase tracking-[1.5px] text-[var(--text-muted)]">
              {q ? "Resultados" : "Sugerencias"}
            </div>
            {results.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActivePage(s.page); setOpen(false); setQ("") }}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-transparent border-none cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
              >
                <span className="text-sm font-semibold text-[var(--text-h)]">{s.label}</span>
                <span className="text-[10px] text-[var(--text-soft)] font-mono">⌘{i + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActivePage("Notificaciones" as Page)}
          className="relative w-[34px] h-[34px] bg-transparent border-2 border-[var(--border)] cursor-pointer flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-soft)] hover:border-[var(--primary-border)] hover:text-[var(--primary)] transition-all"
        >
          <Bell size={15} strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--danger)]" />
        </button>
        <button
          onClick={() => setActivePage("Perfil" as Page)}
          className="bg-transparent border-none cursor-pointer p-0"
        >
          <Avatar initials={ME.initials} color={ME.avatarColor} bg={ME.avatarBg} size="sm" />
        </button>
      </div>
    </header>
  )
}
