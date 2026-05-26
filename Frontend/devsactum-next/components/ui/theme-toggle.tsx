"use client"

import React, { useState, useEffect } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

type Theme = "dark" | "light" | "system"

interface ThemeToggleProps {
  className?: string
  variant?: "icon" | "full"
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) ?? "dark"
    setTheme(stored)
    applyTheme(stored)
  }, [])

  function applyTheme(t: Theme) {
    const root = document.documentElement
    if (t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }

  function setAndApply(t: Theme) {
    setTheme(t)
    localStorage.setItem("theme", t)
    applyTheme(t)
  }

  const THEMES: { value: Theme; Icon: React.ElementType; label: string }[] = [
    { value: "light",  Icon: Sun,     label: "Claro"  },
    { value: "dark",   Icon: Moon,    label: "Oscuro" },
    { value: "system", Icon: Monitor, label: "Sistema"},
  ]

  if (variant === "full") {
    return (
      <div className={cn("flex bg-bg border border-border rounded-[10px] p-1 gap-1", className)}>
        {THEMES.map(({ value, Icon, label }) => (
          <button
            key={value}
            onClick={() => setAndApply(value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-bold cursor-pointer border-none transition-all duration-150",
              theme === value
                ? "bg-accent text-[#1a0033]"
                : "bg-transparent text-text hover:text-text-h"
            )}
          >
            <Icon size={12} strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>
    )
  }

  const current = THEMES.find(t => t.value === theme)!
  const next    = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]

  return (
    <button
      onClick={() => setAndApply(next.value)}
      title={`Cambiar a ${next.label}`}
      className={cn(
        "w-8 h-8 rounded-lg bg-transparent border border-border flex items-center justify-center",
        "text-text hover:text-text-h hover:bg-bg-hover cursor-pointer transition-colors duration-150",
        className
      )}
    >
      <current.Icon size={14} strokeWidth={1.8} />
    </button>
  )
}

export default ThemeToggle