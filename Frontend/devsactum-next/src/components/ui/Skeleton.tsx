"use client"
import React from "react"
import { cn } from "@/src/lib/utils"

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-md", className)} />
}

export function PostSkeleton() {
  return (
    <div className="py-6 border-b border-[#2e303a] animate-fade-in">
      <div className="flex gap-3.5 px-6">
        <Skeleton className="w-10 h-10 rounded-[10px] shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-36 mb-2" />
          <Skeleton className="h-3 w-28 mb-4" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-4/5 mb-2" />
          <Skeleton className="h-3 w-3/5 mb-4" />
          <div className="flex gap-6">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}
