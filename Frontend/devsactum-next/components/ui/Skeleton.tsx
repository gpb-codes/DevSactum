"use client"

import React from "react"

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
}

export function Skeleton({ className = "", width, height }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height }}
    />
  )
}

export function PostSkeleton() {
  return (
    <div className="border-b border-border pb-8 animate-fade-in">
      <div className="flex gap-4">
        <Skeleton className="w-11 h-11 rounded-[10px] shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24 mb-4" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-4/5 mb-2" />
          <Skeleton className="h-3 w-3/5 mb-4" />
          <div className="flex gap-6">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="px-6 py-6 max-w-[1100px] mx-auto animate-fade-in">
      <div className="bg-bg-surface border border-border rounded-[14px] overflow-hidden mb-6">
        <Skeleton className="h-[180px] rounded-none" />
        <div className="px-7 pb-7">
          <div className="flex items-end gap-5 -mt-14">
            <Skeleton className="w-[100px] h-[100px] rounded-[14px] shrink-0" />
            <div className="pb-1 flex-1">
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="mt-4">
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-4/5 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-6 animate-fade-in">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <Skeleton className={`h-10 rounded-[12px] ${i % 2 === 0 ? "w-48" : "w-40"}`} />
        </div>
      ))}
    </div>
  )
}