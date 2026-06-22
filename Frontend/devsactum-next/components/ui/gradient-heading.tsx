import React from "react"
import { cn } from "@/lib/utils"

const headingVariants = {
  default: "bg-gradient-to-t from-neutral-300 to-neutral-500 dark:from-stone-100 dark:to-neutral-300",
  warm: "bg-gradient-to-t from-orange-400 to-purple-500",
  cool: "bg-gradient-to-t from-cyan-400 to-purple-500",
  accent: "bg-gradient-to-t from-accent to-accent/60 dark:from-accent dark:to-accent/70",
  primary: "bg-gradient-to-t from-primary to-secondary",
}

const headingSizes = {
  xs: "text-lg sm:text-xl lg:text-2xl",
  sm: "text-xl sm:text-2xl lg:text-3xl",
  md: "text-2xl sm:text-3xl lg:text-4xl",
  lg: "text-3xl sm:text-4xl lg:text-5xl",
  xl: "text-4xl sm:text-5xl lg:text-6xl",
}

interface GradientHeadingProps {
  variant?: keyof typeof headingVariants
  size?: keyof typeof headingSizes
  as?: "h1" | "h2" | "h3" | "h4"
  className?: string
  children: React.ReactNode
}

export function GradientHeading({
  variant = "default",
  size = "md",
  as: Tag = "h2",
  className,
  children,
}: GradientHeadingProps) {
  return (
    <Tag className={cn("font-bold tracking-tight", headingSizes[size], className)}>
      <span className={cn("bg-clip-text text-transparent", headingVariants[variant])}>
        {children}
      </span>
    </Tag>
  )
}
