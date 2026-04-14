"use client"

import React, { useState } from "react"
import { Terminal, AtSign, Lock, Eye, EyeOff, GitBranch } from "lucide-react"
import { useNav } from "@/context/NavContext"

export default function Login() {
  const { setActivePage } = useNav()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setActivePage("Feed")
    }, 1200)
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg)", position: "relative", overflow: "hidden", padding: "24px",
    }}>
      {/* Decoración de fondo */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "40%", height: "40%", background: "rgba(196,154,255,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "30%", height: "30%", background: "rgba(255,148,168,.04)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, background: "var(--bg-surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Terminal size={28} style={{ color: "var(--accent)" }} strokeWidth={1.8} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-1px", color: "var(--accent)", margin: 0 }}>
            Devsanctum
          </h1>
          <p style={{ fontSize: 13, color: "var(--text)", marginTop: 8 }}>Welcome back</p>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(19,19,19,.8)", border: "1px solid var(--border)", borderRadius: 18, padding: 32 }}>
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--text)", marginBottom: 8 }}>
                Username or Email
              </label>
              <div style={{ position: "relative" }}>
                <AtSign size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text)", pointerEvents: "none" }} strokeWidth={1.8} />
                <input
                  type="text"
                  placeholder="dev@sanctum.sh"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  style={{
                    width: "100%", height: 46, paddingLeft: 42, paddingRight: 14,
                    background: "#000", border: "1px solid var(--border)", borderRadius: 9,
                    fontSize: 13, color: "var(--text-h)", fontFamily: "inherit", outline: "none",
                    boxSizing: "border-box", transition: "border-color .15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent-border)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--text)" }}>
                  Password
                </label>
                <button type="button" style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text)", pointerEvents: "none" }} strokeWidth={1.8} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  style={{
                    width: "100%", height: 46, paddingLeft: 42, paddingRight: 46,
                    background: "#000", border: "1px solid var(--border)", borderRadius: 9,
                    fontSize: 13, color: "var(--text-h)", fontFamily: "inherit", outline: "none",
                    boxSizing: "border-box", transition: "border-color .15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent-border)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text)", display: "flex" }}
                >
                  {showPassword ? <EyeOff size={15} strokeWidth={1.8} /> : <Eye size={15} strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", height: 46, borderRadius: 9, border: "none", cursor: loading ? "not-allowed" : "pointer",
                background: "var(--accent)", color: "#1a0033", fontSize: 13, fontWeight: 800,
                letterSpacing: 0.5, transition: "opacity .15s", opacity: loading ? .7 : 1,
                fontFamily: "inherit",
              }}
            >
              {loading ? "Entrando..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "var(--text)" }}>Or continue with</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Social login */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Google", icon: (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )},
              { label: "GitHub", icon: <GitBranch size={18} strokeWidth={1.8} style={{ color: "var(--text-h)" }} /> },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  height: 42, background: "var(--bg-surface)", border: "1px solid var(--border)",
                  borderRadius: 9, cursor: "pointer", fontSize: 12, fontWeight: 600,
                  color: "var(--text-h)", fontFamily: "inherit", transition: "border-color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-border)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text)", marginTop: 24 }}>
          Don't have an account?{" "}
          <button
            type="button"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}
            onClick={() => setActivePage("Feed")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}