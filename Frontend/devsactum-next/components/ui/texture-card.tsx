"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface TextureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
}

export function TextureCard({ className, children, ...props }: TextureCardProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-white/10 dark:border-stone-950/60",
        "bg-gradient-to-b dark:from-neutral-800/50 dark:to-neutral-900/30 from-neutral-100/30 to-white/10",
        className
      )}
      {...props}
    >
      <div className="rounded-[23px] border dark:border-neutral-900/80 border-black/10">
        <div className="rounded-[22px] border dark:border-neutral-950 border-white/20">
          <div className="rounded-[21px] border dark:border-neutral-900/70 border-neutral-950/20">
            <div className="w-full border border-white/20 dark:border-neutral-700/50 rounded-[20px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TextureCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div ref={undefined} className={cn("px-6 pt-6 pb-2", className)} {...props} />
}

export function TextureCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-4", className)} {...props} />
}

export function TextureCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-between px-6 py-4 gap-2", className)} {...props} />
}

export function TextureCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold leading-tight text-neutral-100 pl-2", className)} {...props} />
}

export function TextureCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-neutral-400 pl-2", className)} {...props} />
}
