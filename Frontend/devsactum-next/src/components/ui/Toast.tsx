"use client"
import React, { createContext, useContext, useState, useCallback, useRef } from "react"
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: number
  type: ToastType
  title: string
  message?: string
}

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={16} className="text-[var(--success)]" strokeWidth={2} />,
  error:   <AlertCircle size={16} className="text-[var(--danger)]" strokeWidth={2} />,
  info:    <Info size={16} className="text-[var(--secondary)]" strokeWidth={2} />,
}

const Ctx = createContext<{
  success: (title: string, message?: string) => void
  error:   (title: string, message?: string) => void
  info:    (title: string, message?: string) => void
}>({ success: () => {}, error: () => {}, info: () => {} })

export function useToast() {
  return useContext(Ctx)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(0)

  const add = useCallback((type: ToastType, title: string, message?: string) => {
    const id = ++idRef.current
    setToasts(prev => [...prev, { id, type, title, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const remove = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const success = useCallback((title: string, message?: string) => add("success", title, message), [add])
  const error   = useCallback((title: string, message?: string) => add("error", title, message), [add])
  const info    = useCallback((title: string, message?: string) => add("info", title, message), [add])

  return (
    <Ctx.Provider value={{ success, error, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[2000] flex flex-col gap-2 max-w-[360px]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              glass-strong rounded-[var(--radius-lg)] p-4
              flex items-start gap-3 shadow-[var(--shadow-lg)]
              animate-slide-in
            `}
          >
            <span className="shrink-0 mt-0.5">{iconMap[toast.type]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--text-h)] m-0">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-[var(--text-soft)] m-0 mt-0.5">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => remove(toast.id)}
              className="shrink-0 bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-h)] p-0 transition-colors"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
