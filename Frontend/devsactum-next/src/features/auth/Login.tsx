"use client"

import React, { useState, useEffect } from "react"
import { Terminal, AtSign, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useNav } from "@/src/store/nav"
import { useToast } from "@/src/components/ui/Toast"
import { Button } from "@/src/components/ui/Button"

const CODE_LINES = [
  "> git init devsanctum",
  "> npm create @devs",
  "> Connecting to global network...",
  "> Authenticating peer identity...",
  ">  \u2713 Dev environment ready",
  "> $ Welcome to Devsanctum",
]

export default function Login() {
  const { setActivePage } = useNav()
  const { success, error } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [tab, setTab] = useState<"signin" | "signup">("signin")
  const [form, setForm] = useState({ email: "", password: "", name: "" })
  const [loading, setLoading] = useState(false)
  const [codeIndex, setCodeIndex] = useState(0)

  useEffect(() => {
    if (codeIndex < CODE_LINES.length) {
      const t = setTimeout(() => setCodeIndex(i => i + 1), 600)
      return () => clearTimeout(t)
    }
  }, [codeIndex])

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
    <div className="min-h-screen flex bg-[var(--bg)] w-full overflow-hidden">
      <div className="hidden lg:flex flex-1 flex-col justify-center px-16 relative overflow-hidden bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg)]">
        <div className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] bg-[var(--primary)]/5 rounded-full blur-[120px] animate-gradient-shift" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[var(--secondary)]/4 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-[480px]">
          <div className="w-14 h-14 rounded-[var(--radius-2xl)] bg-[var(--primary-soft)] border border-[var(--primary-border)] flex items-center justify-center mb-6 glow-primary">
            <Terminal size={24} className="text-[var(--primary)]" strokeWidth={1.8} />
          </div>
          <h1 className="gradient-text text-[44px] font-black tracking-[-2px] leading-[1.1] mb-4">
            Donde los devs<br />
            construyen juntos.
          </h1>
          <p className="text-base text-[var(--text-soft)] leading-[1.8] mb-8 max-w-[380px]">
            Comparte c\u00f3digo, conecta con builders globales y haz crecer tu reputaci\u00f3n como desarrollador.
          </p>

          <div className="bg-[var(--color-black)] border border-[var(--border)] rounded-[var(--radius-2xl)] p-5 font-mono text-xs">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            {CODE_LINES.slice(0, codeIndex).map((line, i) => (
              <p key={i} className="m-0 mb-1 animate-fade-in">
                {line.startsWith(">") ? (
                  <span className="text-[var(--primary)]">{line}</span>
                ) : line.startsWith(" ") ? (
                  <span className="text-[var(--secondary)]">{line}</span>
                ) : (
                  <span className="text-[var(--text-h)]">{line}</span>
                )}
              </p>
            ))}
            {codeIndex < CODE_LINES.length && (
              <span className="animate-cursor text-[var(--text-muted)]">_</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-[420px]">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--primary-soft)] border border-[var(--primary-border)] flex items-center justify-center">
              <Terminal size={18} className="text-[var(--primary)]" strokeWidth={1.8} />
            </div>
            <span className="text-lg font-black gradient-text">Devsanctum</span>
          </div>

          <div className="flex gap-1 mb-8 bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-[var(--radius-lg)] p-1">
            {(["signin", "signup"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-[var(--radius-md)] text-sm font-bold cursor-pointer border-none transition-all duration-[var(--duration-fast)] ${
                  tab === t
                    ? "bg-[var(--primary)] text-white shadow-[var(--shadow-glow)]"
                    : "bg-transparent text-[var(--text-soft)] hover:text-[var(--text-h)]"
                }`}
              >
                {t === "signin" ? "Iniciar sesi\u00f3n" : "Crear cuenta"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === "signup" && (
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-soft)] mb-1.5 block">
                  Nombre completo
                </label>
                <div className="relative">
                  <AtSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={1.8} />
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Tu nombre"
                    className="w-full h-[44px] pl-[38px] pr-3.5 bg-[var(--input-bg)] border-2 border-[var(--input-border)] rounded-[var(--radius-lg)] text-sm text-[var(--input-text)] outline-none transition-all focus:border-[var(--input-focus-border)] focus:shadow-[var(--shadow-glow)] placeholder:text-[var(--text-muted)]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-soft)] mb-1.5 block">
                Correo electr\u00f3nico
              </label>
              <div className="relative">
                <AtSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={1.8} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="dev@ejemplo.com"
                  className="w-full h-[44px] pl-[38px] pr-3.5 bg-[var(--input-bg)] border-2 border-[var(--input-border)] rounded-[var(--radius-lg)] text-sm text-[var(--input-text)] outline-none transition-all focus:border-[var(--input-focus-border)] focus:shadow-[var(--shadow-glow)] placeholder:text-[var(--text-muted)]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-soft)] mb-1.5 block">
                Contrase\u00f1a
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={1.8} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full h-[44px] pl-[38px] pr-10 bg-[var(--input-bg)] border-2 border-[var(--input-border)] rounded-[var(--radius-lg)] text-sm text-[var(--input-text)] outline-none transition-all focus:border-[var(--input-focus-border)] focus:shadow-[var(--shadow-glow)] placeholder:text-[var(--text-muted)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-h)] transition-colors"
                >
                  {showPassword ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              {tab === "signin" ? "Entrar" : "Crear cuenta"} <ArrowRight size={16} strokeWidth={2.5} />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[var(--bg)] text-[var(--text-muted)] font-semibold">O contin\u00faa con</span>
            </div>
          </div>

          <div className="flex gap-3">
            {["GitHub", "Google", "Twitter"].map(provider => (
              <button
                key={provider}
                className="flex-1 h-[42px] bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-[var(--radius-lg)] text-xs font-bold text-[var(--text-soft)] cursor-pointer hover:border-[var(--primary-border)] hover:text-[var(--primary)] transition-all"
              >
                {provider}
              </button>
            ))}
          </div>

          <p className="text-xs text-[var(--text-muted)] text-center mt-6 leading-[1.6]">
            Al continuar, aceptas nuestros{" "}
            <button className="bg-transparent border-none text-[var(--primary)] font-bold cursor-pointer hover:underline p-0">
              T\u00e9rminos
            </button>{" "}
            y{" "}
            <button className="bg-transparent border-none text-[var(--primary)] font-bold cursor-pointer hover:underline p-0">
              Privacidad
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
