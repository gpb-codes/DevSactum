"use client"
import React from "react"

type Variant = "text" | "circle" | "rect" | "card"

interface Props {
  variant?: Variant
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({ variant = "text", width, height, className = "" }: Props) {
  const base = "skeleton rounded-[var(--radius-md)]"
  const styles: Record<Variant, string> = {
    text:   `h-3 ${base}`,
    circle: `${base} rounded-full`,
    rect:   `${base}`,
    card:   `${base} rounded-[var(--radius-xl)]`,
  }

  return (
    <div
      className={`${styles[variant]} ${className}`}
      style={{ width, height }}
    />
  )
}

export function PostSkeleton() {
  return (
    <div className="py-6 animate-fade-in">
      <div className="flex gap-3.5">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <Skeleton variant="text" width={120} />
            <Skeleton variant="text" width={80} />
          </div>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rect" width="100%" height={80} />
          <div className="flex gap-4 pt-1">
            <Skeleton variant="text" width={50} />
            <Skeleton variant="text" width={50} />
            <Skeleton variant="text" width={50} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-5 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circle" width={36} height={36} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="rect" width="100%" height={60} className="mt-3" />
    </div>
  )
}
