"use client"

import { useState, useCallback } from "react"
import { MOCK_NOTIFICATIONS } from "@/src/lib/mock-data"
import type { Notification } from "@/src/types"

type Tab = "all" | "unread" | "mentions"

export function useNotifications() {
  const [items, setItems]     = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [activeTab, setTab]   = useState<Tab>("all")

  const unreadCount = items.filter(n => !n.read).length

  const filtered = items.filter(n => {
    if (activeTab === "unread")   return !n.read
    if (activeTab === "mentions") return n.type === "mention"
    return true
  })

  const markRead    = useCallback((id: string) => setItems(p => p.map(n => n.id === id ? { ...n, read: true } : n)), [])
  const markAllRead = useCallback(() => setItems(p => p.map(n => ({ ...n, read: true }))), [])
  const clearAll    = useCallback(() => setItems([]), [])

  return { filtered, unreadCount, activeTab, setActiveTab: setTab, markRead, markAllRead, clearAll }
}
