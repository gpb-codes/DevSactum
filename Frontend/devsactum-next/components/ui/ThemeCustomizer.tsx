"use client"

import React from "react"
import { Sun, Moon, Monitor, Palette, Type, Minus, Plus, Sparkles, Eye, Zap } from "lucide-react"
import { useTheme, type ThemeMode, type AccentColor, type FontSize } from "@/context/ThemeContext"

const ACCENT_OPTIONS: { key: AccentColor; label: string; color: string }[] = [
  { key: "purple", label: "Purple", color: "#a855f7" },
  { key: "cyan",   label: "Cyan",   color: "#22d3ee" },
  { key: "orange", label: "Orange", color: "#fb923c" },
  { key: "green",  label: "Green",  color: "#4ade80" },
  { key: "red",    label: "Red",    color: "#f87171" },
  { key: "blue",   label: "Blue",   color: "#60a5fa" },
  { key: "pink",   label: "Pink",   color: "#f472b6" },
]

export function ThemeCustomizer() {
  const { settings, setMode, setAccent, setFontSize, setReduceMotion, setCompactMode, setGlassEffect } = useTheme()

  return (
    <div className="flex flex-col gap-6">

      {/* Mode */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette size={14} className="text-accent" strokeWidth={2} />
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text-h">Modo de color</span>
        </div>
        <div className="flex gap-2">
          {([
            { key: "dark" as ThemeMode, label: "Oscuro", icon: Moon },
            { key: "light" as ThemeMode, label: "Claro", icon: Sun },
            { key: "system" as ThemeMode, label: "Sistema", icon: Monitor },
          ]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[10px] text-[12px] font-bold cursor-pointer border transition-all duration-150 ${
                settings.mode === key
                  ? "bg-accent text-[#1a0033] border-accent"
                  : "bg-bg-surface text-text border-border hover:border-accent-border"
              }`}
            >
              <Icon size={14} strokeWidth={2} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Accent color */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-accent" strokeWidth={2} />
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text-h">Color de acento</span>
        </div>
        <div className="flex gap-2">
          {ACCENT_OPTIONS.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setAccent(key)}
              title={label}
              className={`w-9 h-9 rounded-full border-2 cursor-pointer transition-all duration-150 flex items-center justify-center ${
                settings.accent === key ? "border-text-h scale-110" : "border-transparent hover:scale-105"
              }`}
              style={{ background: color }}
            >
              {settings.accent === key && (
                <div className="w-3 h-3 rounded-full bg-white/80" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Type size={14} className="text-accent" strokeWidth={2} />
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text-h">Tamaño de fuente</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const sizes: FontSize[] = ["small", "medium", "large"]
              const idx = sizes.indexOf(settings.fontSize)
              if (idx > 0) setFontSize(sizes[idx - 1])
            }}
            disabled={settings.fontSize === "small"}
            className="w-8 h-8 rounded-[8px] bg-bg-surface border border-border flex items-center justify-center cursor-pointer disabled:opacity-30 text-text hover:border-accent-border transition-colors"
          >
            <Minus size={14} strokeWidth={2} />
          </button>
          <div className="flex-1 bg-bg-surface border border-border rounded-[10px] p-3 text-center">
            <span className="text-text-h font-bold" style={{ fontSize: `var(--text-${settings.fontSize === "small" ? "sm" : settings.fontSize === "large" ? "lg" : "base"})` }}>
              {settings.fontSize === "small" ? "Pequeño" : settings.fontSize === "medium" ? "Mediano" : "Grande"}
            </span>
          </div>
          <button
            onClick={() => {
              const sizes: FontSize[] = ["small", "medium", "large"]
              const idx = sizes.indexOf(settings.fontSize)
              if (idx < 2) setFontSize(sizes[idx + 1])
            }}
            disabled={settings.fontSize === "large"}
            className="w-8 h-8 rounded-[8px] bg-bg-surface border border-border flex items-center justify-center cursor-pointer disabled:opacity-30 text-text hover:border-accent-border transition-colors"
          >
            <Plus size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Toggles */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-accent" strokeWidth={2} />
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text-h">Opciones</span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: "Reducir movimiento", desc: "Deshabilitar animaciones para accesibilidad", value: settings.reduceMotion, onChange: setReduceMotion, icon: Eye },
            { label: "Modo compacto", desc: "Espaciado reducido en toda la interfaz", value: settings.compactMode, onChange: setCompactMode, icon: Minus },
            { label: "Efecto vidrio (Glass)", desc: "Efecto backdrop-blur en paneles y modales", value: settings.glassEffect, onChange: setGlassEffect, icon: Sparkles },
          ].map(({ label, desc, value, onChange, icon: Icon }) => (
            <div key={label} className="flex items-center justify-between bg-bg-surface border border-border rounded-[10px] px-4 py-3">
              <div className="flex items-center gap-3">
                <Icon size={14} className="text-text opacity-60" strokeWidth={1.8} />
                <div>
                  <div className="text-[12px] font-bold text-text-h">{label}</div>
                  <div className="text-[10px] text-text opacity-60">{desc}</div>
                </div>
              </div>
              <button
                onClick={() => onChange(!value)}
                className={`w-10 h-[22px] rounded-full border-none cursor-pointer transition-all duration-200 relative ${
                  value ? "bg-accent" : "bg-bg-hover"
                }`}
              >
                <div className={`absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                  value ? "left-[22px]" : "left-[3px]"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-text opacity-60 block mb-3">Vista previa</span>
        <div className="bg-bg-surface border border-border rounded-[14px] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-[11px] font-bold text-[#1a0033]">AV</div>
            <div>
              <div className="text-[13px] font-bold text-text-h">Alex Volkov</div>
              <div className="text-[11px] text-text opacity-60">@alex_volkov</div>
            </div>
          </div>
          <p className="text-text text-[12px] leading-[1.6] m-0 mb-3">Preview del tema actual con el color de acento seleccionado.</p>
          <div className="flex gap-2">
            <button className="bg-accent text-[#1a0033] border-none rounded-[8px] px-3 py-1.5 text-[11px] font-bold">Botón primario</button>
            <button className="bg-transparent text-text border border-border rounded-[8px] px-3 py-1.5 text-[11px] font-bold">Botón secundario</button>
          </div>
        </div>
      </div>
    </div>
  )
}
