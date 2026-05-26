"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

interface ToastContextType {
  toast: (type: ToastType, title: string, message?: string) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
})

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const COLORS = {
  success: { bg: "rgba(59,165,93,0.15)", border: "rgba(59,165,93,0.3)", text: "#3ba55d" },
  error:   { bg: "rgba(239,68,68,0.15)",  border: "rgba(239,68,68,0.3)",  text: "#ef4444" },
  warning: { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", text: "#f59e0b" },
  info:    { bg: "rgba(196,154,255,0.15)", border: "rgba(196,154,255,0.3)", text: "#c49aff" },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev.slice(-3), { id, type, title, message }])
    setTimeout(() => removeToast(id), 4000)
  }, [removeToast])

  const ctx: ToastContextType = {
    toast: addToast,
    success: (t, m) => addToast("success", t, m),
    error:   (t, m) => addToast("error",   t, m),
    warning: (t, m) => addToast("warning", t, m),
    info:    (t, m) => addToast("info",    t, m),
  }

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none items-center">
        {toasts.map(t => {
          const Icon = ICONS[t.type]
          const c = COLORS[t.type]
          return (
            <div
              key={t.id}
              className="pointer-events-auto animate-fade-in flex items-start gap-3 px-4 py-3 rounded-[12px] border min-w-[280px] max-w-[380px] shadow-2xl glass"
              style={{ background: c.bg, borderColor: c.border }}
            >
              <Icon size={16} style={{ color: c.text }} className="shrink-0 mt-0.5" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-text-h">{t.title}</div>
                {t.message && <div className="text-[11px] text-text mt-0.5 opacity-80">{t.message}</div>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="bg-transparent border-none cursor-pointer text-text p-0.5 shrink-0"
              >
                <X size={12} strokeWidth={2} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}