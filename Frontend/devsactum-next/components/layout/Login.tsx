"use client"

import React, { useState, useRef, useEffect } from "react"
import { Terminal, AtSign, Lock, Eye, EyeOff, ArrowRight, User, Building2, Check, Code2, Globe } from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"
import { validateEmail, validatePassword, validateName, getPasswordStrength } from "@/lib/validation"

type AuthRole = "developer" | "company"

const FLOATING_ICONS = [
  { Icon: Code2, x: "15%", y: "20%", size: 18, delay: "0s", duration: "4s" },
  { Icon: Globe, x: "80%", y: "15%", size: 14, delay: "1s", duration: "5s" },
  { Icon: Terminal, x: "10%", y: "70%", size: 16, delay: "2s", duration: "4.5s" },
  { Icon: Code2, x: "85%", y: "75%", size: 12, delay: "0.5s", duration: "3.8s" },
]

export default function Login() {
  const { setActivePage } = useNav()
  const { success, error } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [tab, setTab] = useState<"signin" | "signup">("signin")
  const [role, setRole] = useState<AuthRole>("developer")
  const [form, setForm] = useState({ email: "", password: "", name: "" })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [remember, setRemember] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailRef.current?.focus()
  }, [tab])

  const REQUIREMENTS = [
    { label: "Mín. 8 caracteres", check: form.password.length >= 8 },
    { label: "Una mayúscula", check: /[A-Z]/.test(form.password) },
    { label: "Un número", check: /\d/.test(form.password) },
  ]

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (tab === "signup") {
      const nameErr = validateName(form.name)
      if (nameErr) newErrors.name = nameErr
    }
    const emailErr = validateEmail(form.email)
    if (emailErr) newErrors.email = emailErr
    const passErr = validatePassword(form.password)
    if (passErr) newErrors.password = passErr
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleBlur(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }))
    validate()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ email: true, password: true, name: true })
    if (!validate()) return
    if (tab === "signup" && !acceptTerms) {
      error("Acepta los términos", "Debes aceptar Términos y Condiciones para registrarte")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      success(tab === "signin" ? "Bienvenido de vuelta" : "Cuenta creada", "Redirigiendo al feed...")
      setTimeout(() => setActivePage("Feed"), 800)
    }, 1200)
  }

  const passwordStrength = getPasswordStrength(form.password)

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 w-full animate-fade-in"
      style={{ background: "linear-gradient(135deg, #020617 0%, #0c0a1d 50%, #020617 100%)" }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute -top-[25%] -left-[15%] w-[60%] h-[60%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div className="absolute -bottom-[25%] -right-[15%] w-[60%] h-[60%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(251,146,60,0.05) 0%, transparent 60%)",
          animation: "float 12s ease-in-out infinite",
        }}
      />

      {/* Floating code icons */}
      {FLOATING_ICONS.map(({ Icon, x, y, size, delay, duration }) => (
        <div
          key={x + y}
          className="absolute pointer-events-none opacity-[0.08]"
          style={{
            left: x, top: y,
            animation: `float ${duration} ease-in-out infinite`,
            animationDelay: delay,
          }}
        >
          <Icon size={size} className="text-accent" strokeWidth={1.5} />
        </div>
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,211,238,0.1))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(168,85,247,0.2)",
              boxShadow: "0 0 30px rgba(168,85,247,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <Terminal size={24} className="text-accent" strokeWidth={1.8} />
          </div>
          <h1 className="text-[26px] font-black tracking-tight m-0 gradient-text-warm">Devsanctum</h1>
          <p className="text-[13px] mt-1.5" style={{ color: "rgba(161,161,170,0.7)" }}>
            {tab === "signin" ? "Bienvenido de vuelta, developer" : "Comienza tu viaje"}
          </p>
        </div>

        {/* Glass card */}
        <div
          className="rounded-[20px] p-8"
          style={{
            background: "rgba(17,17,20,0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Role selector */}
          <div
            className="flex rounded-[12px] p-1 mb-4"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {([
              { key: "developer" as AuthRole, label: "Desarrollador", icon: User },
              { key: "company" as AuthRole, label: "Empresa", icon: Building2 },
            ]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-bold rounded-[9px] cursor-pointer border-none transition-all duration-300 ${
                  role === key
                    ? "text-[#1a0033]"
                    : "bg-transparent hover:text-text-h"
                }`}
                style={role === key ? {
                  background: "linear-gradient(135deg, #fb923c, #f97316)",
                  boxShadow: "0 2px 12px rgba(251,146,60,0.3)",
                } : {
                  color: "rgba(161,161,170,0.6)",
                }}
              >
                <Icon size={14} strokeWidth={2} />
                {label}
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div
            className="flex rounded-[12px] p-1 mb-6"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {(["signin", "signup"] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-[12px] font-bold rounded-[9px] cursor-pointer border-none transition-all duration-300 ${
                  tab === t
                    ? "text-[#1a0033]"
                    : "bg-transparent hover:text-text-h"
                }`}
                style={tab === t ? {
                  background: "linear-gradient(135deg, #a855f7, #9333ea)",
                  boxShadow: "0 2px 12px rgba(168,85,247,0.3)",
                } : {
                  color: "rgba(161,161,170,0.6)",
                }}
              >
                {t === "signin" ? "Iniciar sesión" : "Registrarse"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name (signup only) */}
            {tab === "signup" && (
              <div className="mb-4" style={{ animation: "fadeIn 0.2s ease" }}>
                <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] mb-2" style={{ color: "rgba(161,161,170,0.6)" }}>
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder={role === "company" ? "Tu nombre" : "Alex Volkov"}
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = "rgba(251,146,60,0.4)"}
                  onBlur={e => {
                    handleBlur("name")
                    e.target.style.borderColor = errors.name ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.06)"
                  }}
                  className="w-full h-[44px] px-[14px] rounded-[10px] text-[13px] outline-none transition-all duration-300"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${errors.name ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.06)"}`,
                    color: "var(--color-text-h)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                />
                {touched.name && errors.name && <p className="text-[10px] mt-1 m-0" style={{ color: "rgba(248,113,113,0.8)" }}>{errors.name}</p>}
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] mb-2" style={{ color: "rgba(161,161,170,0.6)" }}>
                Email
              </label>
              <div className="relative">
                <AtSign size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.8} style={{ color: "rgba(161,161,170,0.3)" }} />
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="dev@ejemplo.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = "rgba(251,146,60,0.4)"}
                  onBlur={e => {
                    handleBlur("email")
                    e.target.style.borderColor = errors.email ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.06)"
                  }}
                  className="w-full h-[44px] pl-[40px] pr-[14px] rounded-[10px] text-[13px] outline-none transition-all duration-300"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${errors.email ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.06)"}`,
                    color: "var(--color-text-h)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                />
              </div>
              {touched.email && errors.email && <p className="text-[10px] mt-1 m-0" style={{ color: "rgba(248,113,113,0.8)" }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-extrabold uppercase tracking-[1.5px]" style={{ color: "rgba(161,161,170,0.6)" }}>
                  Contraseña
                </label>
                {tab === "signin" && (
                  <button type="button" className="text-[10px] font-bold bg-transparent border-none cursor-pointer hover:underline" style={{ color: "rgba(251,146,60,0.7)" }}>
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.8} style={{ color: "rgba(161,161,170,0.3)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = "rgba(251,146,60,0.4)"}
                  onBlur={e => {
                    handleBlur("password")
                    e.target.style.borderColor = errors.password ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.06)"
                  }}
                  className="w-full h-[44px] pl-[40px] pr-[44px] rounded-[10px] text-[13px] outline-none transition-all duration-300"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${errors.password ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.06)"}`,
                    color: "var(--color-text-h)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[13px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer flex"
                  style={{ color: "rgba(161,161,170,0.4)" }}
                >
                  {showPassword ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                </button>
              </div>
              {touched.password && errors.password && <p className="text-[10px] mt-1 m-0" style={{ color: "rgba(248,113,113,0.8)" }}>{errors.password}</p>}
            </div>

            {/* Password strength + requirements (signup) */}
            {tab === "signup" && form.password.length > 0 && (
              <div className="mb-4 p-3 rounded-[10px]" style={{ animation: "fadeIn 0.2s ease", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex gap-1 mb-3">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full transition-all duration-500"
                      style={{
                        background: i < passwordStrength.score
                          ? passwordStrength.score >= 4 ? "#4ade80" : passwordStrength.score >= 3 ? "#fb923c" : "#f87171"
                          : "rgba(255,255,255,0.06)",
                        boxShadow: i < passwordStrength.score ? `0 0 6px ${
                          passwordStrength.score >= 4 ? "rgba(74,222,128,0.4)" : passwordStrength.score >= 3 ? "rgba(251,146,60,0.4)" : "rgba(248,113,113,0.4)"
                        }` : "none",
                      }}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  {REQUIREMENTS.map(r => (
                    <div key={r.label} className="flex items-center gap-2">
                      <div
                        className="w-[14px] h-[14px] rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: r.check ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${r.check ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.06)"}`,
                        }}
                      >
                        {r.check && <Check size={8} className="text-success" strokeWidth={3} />}
                      </div>
                      <span
                        className="text-[9px] font-semibold transition-colors duration-300"
                        style={{ color: r.check ? "rgba(74,222,128,0.8)" : "rgba(161,161,170,0.4)" }}
                      >
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remember me (signin) */}
            {tab === "signin" && (
              <div className="flex items-center gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  className="w-4 h-4 rounded-[4px] flex items-center justify-center transition-all cursor-pointer shrink-0 border-none"
                  style={{
                    background: remember ? "linear-gradient(135deg, #fb923c, #f97316)" : "rgba(0,0,0,0.3)",
                    border: `1px solid ${remember ? "rgba(251,146,60,0.3)" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: remember ? "0 0 8px rgba(251,146,60,0.3)" : "none",
                  }}
                >
                  {remember && <Check size={10} className="text-[#1a0033]" strokeWidth={3} />}
                </button>
                <span className="text-[11px]" style={{ color: "rgba(161,161,170,0.5)" }}>Recordar sesión</span>
              </div>
            )}

            {/* Terms (signup) */}
            {tab === "signup" && (
              <div className="flex items-start gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className="w-4 h-4 rounded-[4px] flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5 border-none"
                  style={{
                    background: acceptTerms ? "linear-gradient(135deg, #fb923c, #f97316)" : "rgba(0,0,0,0.3)",
                    border: `1px solid ${acceptTerms ? "rgba(251,146,60,0.3)" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: acceptTerms ? "0 0 8px rgba(251,146,60,0.3)" : "none",
                  }}
                >
                  {acceptTerms && <Check size={10} className="text-[#1a0033]" strokeWidth={3} />}
                </button>
                <span className="text-[11px] leading-relaxed" style={{ color: "rgba(161,161,170,0.5)" }}>
                  Acepto los{" "}
                  <button type="button" className="bg-transparent border-none cursor-pointer font-bold text-[11px] p-0 hover:underline" style={{ color: "rgba(251,146,60,0.7)" }}>
                    Términos y Condiciones
                  </button>{" "}
                  y la{" "}
                  <button type="button" className="bg-transparent border-none cursor-pointer font-bold text-[11px] p-0 hover:underline" style={{ color: "rgba(251,146,60,0.7)" }}>
                    Política de Privacidad
                  </button>
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[44px] rounded-[10px] border-none flex items-center justify-center gap-2 text-[13px] font-extrabold transition-all duration-300 cursor-pointer relative overflow-hidden"
              style={loading ? {
                background: "linear-gradient(135deg, rgba(251,146,60,0.5), rgba(249,115,22,0.5))",
                color: "rgba(26,0,51,0.7)",
                cursor: "not-allowed",
              } : {
                background: "linear-gradient(135deg, #fb923c, #f97316)",
                color: "#1a0033",
                boxShadow: "0 4px 16px rgba(251,146,60,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-1px)"
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(251,146,60,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = loading ? "none" : "0 4px 16px rgba(251,146,60,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
              }}
            >
              {loading ? (
                <>
                  <span
                    className="absolute inset-0 rounded-[10px]"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.2s ease-in-out infinite",
                    }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }} className="animate-pulse-slow">Entrando...</span>
                </>
              ) : (
                <>
                  {tab === "signin" ? "Iniciar sesión" : "Crear cuenta"}
                  <ArrowRight size={14} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[2px]" style={{ color: "rgba(161,161,170,0.3)" }}>O continúa con</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
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
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 10.385.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925-.81 1.095-.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              )},
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center gap-2 h-[40px] rounded-[10px] cursor-pointer text-[12px] font-semibold transition-all duration-300 border-none"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  color: "rgba(244,244,245,0.7)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(251,146,60,0.2)"
                  e.currentTarget.style.background = "rgba(251,146,60,0.08)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"
                  e.currentTarget.style.background = "rgba(0,0,0,0.25)"
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Card bottom glow */}
          <div
            className="absolute bottom-0 left-[10%] right-[10%] h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(251,146,60,0.15), transparent)",
            }}
          />
        </div>

        {/* Switch auth mode */}
        <div
          className="mt-6 text-center rounded-[14px] py-3 px-4"
          style={{
            background: "rgba(17,17,20,0.4)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <span className="text-[12px]" style={{ color: "rgba(161,161,170,0.6)" }}>
            {tab === "signin" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          </span>
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer font-bold text-[12px] hover:underline transition-all"
            style={{ color: "rgba(251,146,60,0.8)" }}
            onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
          >
            {tab === "signin" ? "Regístrate gratis" : "Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  )
}
