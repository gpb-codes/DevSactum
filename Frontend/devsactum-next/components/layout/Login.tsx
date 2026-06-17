"use client"

import React, { useState } from "react"
import { Terminal, AtSign, Lock, Eye, EyeOff, GitBranch, Sparkles, ArrowRight } from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"

export default function Login() {
  const { setActivePage } = useNav()
  const { success, error } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [tab, setTab] = useState<"signin" | "signup">("signin")
  const [form, setForm] = useState({ email: "", password: "", name: "" })
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.password) {
      error("Campos requeridos", "Completa todos los campos")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      success(tab === "signin" ? "Bienvenido de vuelta" : "Cuenta creada", "Redirigiendo al feed...")
      setTimeout(() => setActivePage("Feed"), 800)
    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden p-6 w-full">
      {/* Background glows */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[rgba(196,154,255,0.06)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-[rgba(255,148,168,0.04)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(196,154,255,0.03)] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[56px] h-[56px] rounded-[14px] bg-accent-bg border border-accent-border flex items-center justify-center mb-4 animate-glow">
            <Terminal size={24} className="text-accent" strokeWidth={1.8} />
          </div>
          <h1 className="text-[24px] font-black tracking-tight text-accent m-0">Devsanctum</h1>
          <p className="text-[13px] text-text mt-1.5 opacity-70">
            {tab === "signin" ? "Bienvenido de vuelta" : "Crea tu cuenta de dev"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-bg-surface border border-border rounded-[12px] p-1 mb-6">
          {(["signin", "signup"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-[12px] font-bold rounded-[9px] cursor-pointer border-none transition-all duration-200 ${
                tab === t ? "bg-accent text-[#1a0033]" : "bg-transparent text-text hover:text-text-h"
              }`}
            >
              {t === "signin" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-bg-surface border border-border rounded-[18px] p-7">
          <form onSubmit={handleSubmit}>
            {/* Name (signup only) */}
            {tab === "signup" && (
              <div className="mb-4 animate-fade-in">
                <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Alex Volkov"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full h-[44px] px-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none transition-colors focus:border-accent-border"
                />
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">
                {tab === "signin" ? "Email o usuario" : "Email"}
              </label>
              <div className="relative">
                <AtSign size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-text opacity-50 pointer-events-none" strokeWidth={1.8} />
                <input
                  type="text"
                  placeholder="dev@sanctum.sh"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full h-[44px] pl-[40px] pr-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none transition-colors focus:border-accent-border"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text">
                  Contraseña
                </label>
                {tab === "signin" && (
                  <button type="button" className="text-[10px] font-bold text-accent bg-transparent border-none cursor-pointer">
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-text opacity-50 pointer-events-none" strokeWidth={1.8} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full h-[44px] pl-[40px] pr-[44px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none transition-colors focus:border-accent-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[13px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-text flex"
                >
                  {showPassword ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[44px] rounded-[9px] border-none flex items-center justify-center gap-2 text-[13px] font-extrabold transition-all duration-150 ${
                loading ? "bg-accent/70 cursor-not-allowed text-[#1a0033]" : "bg-accent text-[#1a0033] cursor-pointer hover:opacity-85"
              }`}
            >
              {loading ? (
                <span className="animate-pulse-slow">Entrando...</span>
              ) : (
                <>
                  {tab === "signin" ? "Iniciar sesión" : "Crear cuenta"}
                  <ArrowRight size={14} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[9px] font-bold uppercase tracking-[2px] text-text opacity-50">O continúa con</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Google", icon: (
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )},
              { label: "GitHub", icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-h">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              )},
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center gap-2 h-[40px] bg-bg border border-border rounded-[9px] cursor-pointer text-[12px] font-semibold text-text-h transition-colors hover:border-accent-border"
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-[12px] text-text mt-5 opacity-70">
          {tab === "signin" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer text-accent font-bold text-[12px]"
            onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
          >
            {tab === "signin" ? "Regístrate gratis" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  )
}