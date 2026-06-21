"use client"
import React, { forwardRef } from "react"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  right?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, icon, right, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-soft)]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full h-[44px] bg-[var(--input-bg)] border-2 border-[var(--input-border)]
              rounded-[var(--radius-lg)] text-sm text-[var(--input-text)]
              outline-none transition-all duration-[var(--duration-fast)]
              placeholder:text-[var(--text-muted)]
              focus:border-[var(--input-focus-border)] focus:shadow-[var(--shadow-glow)]
              ${icon ? "pl-[38px]" : "px-3.5"}
              ${right ? "pr-[38px]" : "px-3.5"}
              ${error ? "!border-[var(--danger)]" : ""}
              ${className}
            `}
            {...props}
          />
          {right && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2">{right}</span>
          )}
        </div>
        {error && (
          <span className="text-[11px] font-medium text-[var(--danger)] mt-0.5">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
