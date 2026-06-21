"use client"
import React, { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className = "" }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        className={`
          bg-[var(--bg-surface)] border border-[var(--border)] rounded-[var(--radius-2xl)]
          shadow-[var(--shadow-xl)] w-full max-w-lg max-h-[85vh] overflow-y-auto
          animate-scale-in
          ${className}
        `}
      >
        {title && (
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            <h2 className="text-lg font-black text-[var(--text-h)] m-0">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] bg-transparent border-none cursor-pointer text-[var(--text-soft)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-h)] transition-colors"
              aria-label="Cerrar"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
