"use client"
import React from "react"
import { cn } from "@/src/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  accent?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

const PAD = { none:"", sm:"p-4", md:"p-5", lg:"p-7" }

export function Card({ hover, accent, padding = "md", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#131313] border border-[#2e303a] rounded-[14px]",
        hover && "transition-all duration-200 cursor-pointer hover:border-[rgba(196,154,255,0.3)]",
        accent && "border-[rgba(196,154,255,0.3)] bg-[rgba(196,154,255,0.06)]",
        PAD[padding], className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
