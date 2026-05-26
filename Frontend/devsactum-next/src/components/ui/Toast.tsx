"use client"
import React, { createContext, useContext, useState, useCallback } from "react"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"
interface ToastItem { id: string; type: ToastType; title: string; message?: string }
interface ToastCtx  { success(t: string, m?: string): void; error(t: string, m?: string): void; warning(t: string, m?: string): void; info(t: string, m?: string): void }

const Ctx = createContext<ToastCtx>({ success:()=>{}, error:()=>{}, warning:()=>{}, info:()=>{} })

const ICONS = { success:CheckCircle, error:XCircle, warning:AlertCircle, info:Info }
const COLORS = {
  success: { bg:"rgba(59,165,93,0.12)",    border:"rgba(59,165,93,0.3)",    icon:"#3ba55d" },
  error:   { bg:"rgba(239,68,68,0.12)",    border:"rgba(239,68,68,0.3)",    icon:"#ef4444" },
  warning: { bg:"rgba(245,158,11,0.12)",   border:"rgba(245,158,11,0.3)",   icon:"#f59e0b" },
  info:    { bg:"rgba(196,154,255,0.12)",  border:"rgba(196,154,255,0.3)",  icon:"#c49aff" },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const remove = useCallback((id: string) => setToasts(p => p.filter(t => t.id !== id)), [])

  const add = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(p => [...p.slice(-3), { id, type, title, message }])
    setTimeout(() => remove(id), 4000)
  }, [remove])

  const ctx: ToastCtx = {
    success: (t,m) => add("success",t,m),
    error:   (t,m) => add("error",t,m),
    warning: (t,m) => add("warning",t,m),
    info:    (t,m) => add("info",t,m),
  }

  return (
    <Ctx.Provider value={ctx}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none items-center">
        {toasts.map(t => {
          const { bg, border, icon } = COLORS[t.type]
          const Icon = ICONS[t.type]
          return (
            <div key={t.id} className="pointer-events-auto animate-fade-in flex items-start gap-3 px-4 py-3 rounded-[12px] border min-w-[280px] max-w-[380px] shadow-2xl glass" style={{ background:bg, borderColor:border }}>
              <Icon size={15} strokeWidth={2} style={{ color:icon }} className="shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-[#f3f4f6]">{t.title}</div>
                {t.message && <div className="text-[11px] text-[#6b6375] mt-0.5">{t.message}</div>}
              </div>
              <button onClick={() => remove(t.id)} className="bg-transparent border-none cursor-pointer text-[#6b6375] p-0.5 shrink-0 flex">
                <X size={12} strokeWidth={2} />
              </button>
            </div>
          )
        })}
      </div>
    </Ctx.Provider>
  )
}

export function useToast() { return useContext(Ctx) }
