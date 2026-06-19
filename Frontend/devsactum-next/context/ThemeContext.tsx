"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export type ThemeMode = "dark" | "light" | "system"
export type AccentColor = "purple" | "cyan" | "orange" | "green" | "red" | "blue" | "pink"
export type FontSize = "small" | "medium" | "large"

interface ThemeSettings {
  mode: ThemeMode
  accent: AccentColor
  fontSize: FontSize
  reduceMotion: boolean
  compactMode: boolean
  glassEffect: boolean
}

interface ThemeContextType {
  settings: ThemeSettings
  setMode: (mode: ThemeMode) => void
  setAccent: (accent: AccentColor) => void
  setFontSize: (size: FontSize) => void
  setReduceMotion: (v: boolean) => void
  setCompactMode: (v: boolean) => void
  setGlassEffect: (v: boolean) => void
}

const ACCENT_COLORS: Record<AccentColor, { primary: string; soft: string; border: string; glow: string }> = {
  purple: { primary: "#a855f7", soft: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.3)", glow: "0 0 20px rgba(168,85,247,0.15)" },
  cyan:   { primary: "#22d3ee", soft: "rgba(34,211,238,0.12)",  border: "rgba(34,211,238,0.3)",  glow: "0 0 20px rgba(34,211,238,0.15)" },
  orange: { primary: "#fb923c", soft: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.3)", glow: "0 0 20px rgba(251,146,60,0.15)" },
  green:  { primary: "#4ade80", soft: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.3)", glow: "0 0 20px rgba(74,222,128,0.15)" },
  red:    { primary: "#f87171", soft: "rgba(248,113,113,0.12)",border: "rgba(248,113,113,0.3)",glow: "0 0 20px rgba(248,113,113,0.15)" },
  blue:   { primary: "#60a5fa", soft: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.3)", glow: "0 0 20px rgba(96,165,250,0.15)" },
  pink:   { primary: "#f472b6", soft: "rgba(244,114,182,0.12)",border: "rgba(244,114,182,0.3)",glow: "0 0 20px rgba(244,114,182,0.15)" },
}

const FONT_SIZES: Record<FontSize, string> = {
  small:  "12px",
  medium: "13.5px",
  large:  "15px",
}

const DEFAULT_SETTINGS: ThemeSettings = {
  mode: "dark",
  accent: "orange",
  fontSize: "medium",
  reduceMotion: false,
  compactMode: false,
  glassEffect: true,
}

const ThemeContext = createContext<ThemeContextType>({
  settings: DEFAULT_SETTINGS,
  setMode: () => {},
  setAccent: () => {},
  setFontSize: () => {},
  setReduceMotion: () => {},
  setCompactMode: () => {},
  setGlassEffect: () => {},
})

function loadSettings(): ThemeSettings {
  try {
    const raw = localStorage.getItem("ds-theme-settings")
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {}
  return DEFAULT_SETTINGS
}

function saveSettings(s: ThemeSettings) {
  localStorage.setItem("ds-theme-settings", JSON.stringify(s))
}

function applyAccent(accent: AccentColor) {
  const root = document.documentElement
  const c = ACCENT_COLORS[accent]
  root.style.setProperty("--color-accent", c.primary)
  root.style.setProperty("--color-accent-bg", c.soft)
  root.style.setProperty("--color-accent-border", c.border)
  root.style.setProperty("--shadow-glow", c.glow)
}

function applyFontSize(size: FontSize) {
  document.documentElement.style.fontSize = FONT_SIZES[size]
}

function applyMode(mode: ThemeMode) {
  const root = document.documentElement
  const isDark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  if (isDark) {
    root.classList.remove("light")
    localStorage.setItem("ds-theme", "dark")
  } else {
    root.classList.add("light")
    localStorage.setItem("ds-theme", "light")
  }
}

function applyCompact(compact: boolean) {
  const root = document.documentElement
  root.classList.toggle("compact-mode", compact)
}

function applyGlass(glass: boolean) {
  const root = document.documentElement
  root.classList.toggle("no-glass", !glass)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    const s = loadSettings()
    setSettings(s)
    applyMode(s.mode)
    applyAccent(s.accent)
    applyFontSize(s.fontSize)
    applyCompact(s.compactMode)
    applyGlass(s.glassEffect)
  }, [])

  const update = useCallback((partial: Partial<ThemeSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial }
      saveSettings(next)
      if (partial.mode !== undefined) applyMode(next.mode)
      if (partial.accent !== undefined) applyAccent(next.accent)
      if (partial.fontSize !== undefined) applyFontSize(next.fontSize)
      if (partial.compactMode !== undefined) applyCompact(next.compactMode)
      if (partial.glassEffect !== undefined) applyGlass(next.glassEffect)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{
      settings,
      setMode: (mode) => update({ mode }),
      setAccent: (accent) => update({ accent }),
      setFontSize: (fontSize) => update({ fontSize }),
      setReduceMotion: (v) => update({ reduceMotion: v }),
      setCompactMode: (v) => update({ compactMode: v }),
      setGlassEffect: (v) => update({ glassEffect: v }),
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

export { ACCENT_COLORS, FONT_SIZES }
