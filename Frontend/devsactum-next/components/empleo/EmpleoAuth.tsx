"use client"

import React, { useState } from "react"
import { Briefcase, Building2, User, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Star, CheckCircle } from "lucide-react"
import { useNav } from "@/context/NavContext"
import { useToast } from "@/components/ui/Toast"
import { useJobAuth } from "@/context/JobAuthContext"
import { validateEmail, validatePassword, validateName } from "@/lib/validation"

type AuthMode = "login" | "register"
type AuthRole = "developer" | "company"

export default function EmpleoAuth() {
  const { setActivePage } = useNav()
  const { success, error } = useToast()
  const { login, register } = useJobAuth()
  const [mode, setMode] = useState<AuthMode>("login")
  const [role, setRole] = useState<AuthRole>("developer")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "", companyName: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (mode === "register") {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ email: true, password: true, name: true })
    if (!validate()) return
    setLoading(true)
    try {
      if (mode === "login") {
        await login(form.email, form.password, role)
      } else {
        await register({ name: form.name, email: form.email, password: form.password, role, companyName: form.companyName })
      }
      success(
        mode === "login" ? "Bienvenido de vuelta" : "Cuenta creada",
        role === "company" ? "Redirigiendo al dashboard..." : "Redirigiendo a la bolsa de empleo..."
      )
      setTimeout(() => setActivePage(role === "company" ? "Empleo Dashboard" : "Bolsa de Empleo"), 800)
    } catch {
      error("Error", "Algo salió mal. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden p-6 w-full">
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[rgba(168,85,247,0.06)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-[rgba(251,146,60,0.04)] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[460px] relative z-10 animate-fade-in">
        {/* Back button */}
        <button
          onClick={() => setActivePage("Bolsa de Empleo")}
          className="mb-6 text-[12px] text-text font-bold bg-transparent border-none cursor-pointer hover:text-accent transition-colors flex items-center gap-1"
        >
          ← Volver a la bolsa
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[56px] h-[56px] rounded-[14px] bg-accent-bg border border-accent-border flex items-center justify-center mb-4 animate-glow">
            <Briefcase size={24} className="text-accent" strokeWidth={1.8} />
          </div>
          <h1 className="text-[24px] font-black tracking-tight text-accent m-0">Devsanctum Jobs</h1>
          <p className="text-[13px] text-text mt-1.5 opacity-70">
            {mode === "login" ? "Accede a tu cuenta" : "Crea tu cuenta gratuita"}
          </p>
        </div>

        {/* Role selector */}
        <div className="flex bg-bg-surface border border-border rounded-[12px] p-1 mb-5">
          {([
            { key: "developer" as AuthRole, label: "Desarrollador", icon: User },
            { key: "company" as AuthRole, label: "Empresa", icon: Building2 },
          ]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setRole(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-bold rounded-[9px] cursor-pointer border-none transition-all duration-200 ${
                role === key ? "bg-accent text-[#1a0033]" : "bg-transparent text-text hover:text-text-h"
              }`}
            >
              <Icon size={14} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>

        {/* Mode tabs */}
        <div className="flex gap-1 mb-5">
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 text-[12px] font-bold rounded-[9px] cursor-pointer border transition-all duration-200 ${
                mode === m
                  ? "bg-bg-surface text-text-h border-accent-border"
                  : "bg-transparent text-text border-transparent hover:text-text-h"
              }`}
            >
              {m === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-bg-surface border border-border rounded-[18px] p-7">
          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="mb-4 animate-fade-in">
                <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">
                  {role === "company" ? "Nombre de la empresa" : "Nombre completo"}
                </label>
                <div className="relative">
                  {role === "company" ? <Building2 size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-text opacity-50 pointer-events-none" strokeWidth={1.8} /> : <User size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-text opacity-50 pointer-events-none" strokeWidth={1.8} />}
                  <input
                    type="text"
                    placeholder={role === "company" ? "Mi Empresa S.A." : "Alex Volkov"}
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    onBlur={() => handleBlur("name")}
                    className={`w-full h-[44px] pl-[40px] bg-bg border rounded-[9px] text-[13px] text-text-h outline-none transition-colors ${
                      touched.name && errors.name ? "border-danger" : "border-border focus:border-accent-border"
                    }`}
                  />
                </div>
                {touched.name && errors.name && <p className="text-[10px] text-danger mt-1 m-0">{errors.name}</p>}
              </div>
            )}

            {mode === "register" && role === "company" && (
              <div className="mb-4 animate-fade-in">
                <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">
                  Rubro / Industria
                </label>
                <input
                  type="text"
                  placeholder="Fintech, AI, Web3..."
                  value={form.companyName}
                  onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))}
                  className="w-full h-[44px] px-[14px] bg-bg border border-border rounded-[9px] text-[13px] text-text-h outline-none transition-colors focus:border-accent-border"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-text opacity-50 pointer-events-none" strokeWidth={1.8} />
                <input
                  type="email"
                  placeholder={role === "company" ? "hr@empresa.com" : "dev@sanctum.sh"}
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onBlur={() => handleBlur("email")}
                  className={`w-full h-[44px] pl-[40px] bg-bg border rounded-[9px] text-[13px] text-text-h outline-none transition-colors ${
                    touched.email && errors.email ? "border-danger" : "border-border focus:border-accent-border"
                  }`}
                />
              </div>
              {touched.email && errors.email && <p className="text-[10px] text-danger mt-1 m-0">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-2">Contraseña</label>
              <div className="relative">
                <Lock size={14} className="absolute left-[13px] top-1/2 -translate-y-1/2 text-text opacity-50 pointer-events-none" strokeWidth={1.8} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  onBlur={() => handleBlur("password")}
                  className={`w-full h-[44px] pl-[40px] pr-[44px] bg-bg border rounded-[9px] text-[13px] text-text-h outline-none transition-colors ${
                    touched.password && errors.password ? "border-danger" : "border-border focus:border-accent-border"
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[13px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-text flex">
                  {showPassword ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                </button>
              </div>
              {touched.password && errors.password && <p className="text-[10px] text-danger mt-1 m-0">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[44px] rounded-[9px] border-none flex items-center justify-center gap-2 text-[13px] font-extrabold transition-all duration-150 ${
                loading ? "bg-accent/70 cursor-not-allowed text-[#1a0033]" : "bg-accent text-[#1a0033] cursor-pointer hover:opacity-85"
              }`}
            >
              {loading ? (
                <span className="animate-pulse-slow">Procesando...</span>
              ) : (
                <>
                  {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
                  <ArrowRight size={14} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Premium banner */}
        <div className="mt-6 bg-bg-surface border border-accent-border rounded-[14px] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Star size={14} className="text-accent" fill="currentColor" strokeWidth={0} />
            <span className="text-[12px] font-extrabold text-accent">Premium para Empresas</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {["Match IA", "Analytics", "Messaging", "Badge verificado"].map(f => (
              <div key={f} className="flex items-center gap-1.5 text-[11px] text-text">
                <CheckCircle size={11} className="text-accent shrink-0" strokeWidth={2.5} />
                {f}
              </div>
            ))}
          </div>
          <button
            onClick={() => { setRole("company"); setMode("register") }}
            className="w-full py-2 rounded-[8px] bg-transparent border border-accent-border text-accent text-[11px] font-bold cursor-pointer hover:bg-accent-bg transition-colors"
          >
            Empieza gratis — Premium desde $49/mes
          </button>
        </div>

        <p className="text-center text-[12px] text-text mt-5 opacity-70">
          {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button
            className="bg-transparent border-none cursor-pointer text-accent font-bold text-[12px]"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Regístrate gratis" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  )
}
