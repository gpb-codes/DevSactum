"use client"

import { useState, useCallback } from "react"
import { MOCK_NOTIFICATIONS } from "@/lib/mock-notifications"
import type { Notification } from "@/types"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "mentions">("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered = notifications.filter((n) => {
    if (activeTab === "unread")   return !n.read
    if (activeTab === "mentions") return n.type === "mention"
    return true
  })

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    filtered,
    unreadCount,
    activeTab,
    setActiveTab,
    markRead,
    markAllRead,
    clearAll,
  }
}
