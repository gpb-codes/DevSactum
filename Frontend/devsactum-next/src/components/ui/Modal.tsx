"use client"
import React, { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const SIZES = { sm:"max-w-[400px]", md:"max-w-[560px]", lg:"max-w-[720px]" }

export function Modal({ open, onClose, title, size = "md", children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.75)", backdropFilter:"blur(6px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className={cn(SIZES[size], "w-full bg-[#131313] border border-[#2e303a] rounded-[16px] shadow-2xl animate-fade-in")}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e303a]">
            <h2 className="text-[15px] font-extrabold text-[#f3f4f6] m-0">{title}</h2>
            <button onClick={onClose} className="bg-transparent border-none cursor-pointer text-[#6b6375] p-1.5 rounded-md hover:bg-[#1a1a1f] hover:text-[#f3f4f6] transition-colors">
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
