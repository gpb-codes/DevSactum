"use client"
import React, { forwardRef } from "react"
import { cn } from "@/src/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#6b6375]">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6375] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-10 bg-[#0e0e0e] border rounded-[8px] text-[13px] text-[#f3f4f6]",
              "outline-none transition-all duration-150",
              "placeholder:text-[#6b6375] placeholder:opacity-60",
              "focus:border-[rgba(196,154,255,0.5)] focus:shadow-[0_0_0_3px_rgba(196,154,255,0.08)]",
              error ? "border-[rgba(239,68,68,0.5)]" : "border-[#2e303a]",
              leftIcon  ? "pl-9"   : "px-3.5",
              rightIcon ? "pr-9"   : "pr-3.5",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6375]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-[11px] text-red-400">{error}</p>}
        {hint && !error && <p className="text-[11px] text-[#6b6375] opacity-70">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"
