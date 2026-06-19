"use client"

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react"
import { useWebSocket, type WSMessage } from "@/lib/websocket"

export type NotificationType = "like" | "comment" | "follow" | "mention" | "share" | "message" | "job" | "system" | "achievement" | "security"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  actorName?: string
  actorInitials?: string
  actorColor?: string
  link?: string
  read: boolean
  timestamp: number
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (n: Omit<Notification, "id" | "read" | "timestamp">) => void
  markRead: (id: string) => void
  markAllRead: () => void
  clearAll: () => void
  soundEnabled: boolean
  toggleSound: () => void
  wsState: string
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markRead: () => {},
  markAllRead: () => {},
  clearAll: () => {},
  soundEnabled: true,
  toggleSound: () => {},
  wsState: "disconnected",
})

function playNotificationSound() {
  if (typeof window === "undefined") return
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.2)
  } catch {}
}

export function NotificationsProvider({ children, userId }: { children: React.ReactNode; userId?: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") return true
    return localStorage.getItem("ds-notif-sound") !== "false"
  })
  const notifIdRef = useRef(0)

  const { state: wsState } = useWebSocket({
    userId: userId || "anonymous",
    onMessage: useCallback((msg: WSMessage) => {
      if (msg.type === "notification") {
        const data = msg.data as { type?: string; title?: string; message?: string; actorName?: string } | undefined
        if (data) {
          addNotification({
            type: (data.type as NotificationType) || "system",
            title: data.title || "Notificación",
            message: data.message || "",
            actorName: data.actorName,
          })
        }
      }
      if (msg.type === "chat_message" && msg.senderId !== userId) {
        addNotification({
          type: "message",
          title: msg.sender || "Nuevo mensaje",
          message: msg.content || "",
          actorName: msg.sender,
          link: "/chat",
        })
      }
      if (msg.type === "direct_message" && msg.senderId !== userId) {
        addNotification({
          type: "message",
          title: msg.senderName || "Mensaje directo",
          message: msg.content || "",
          actorName: msg.senderName,
          link: "/chat",
        })
      }
    }, [userId]),
  })

  useEffect(() => {
    localStorage.setItem("ds-notif-sound", String(soundEnabled))
  }, [soundEnabled])

  const addNotification = useCallback((n: Omit<Notification, "id" | "read" | "timestamp">) => {
    notifIdRef.current++
    const notif: Notification = {
      ...n,
      id: `notif-${notifIdRef.current}-${Date.now()}`,
      read: false,
      timestamp: Date.now(),
    }
    setNotifications(prev => [notif, ...prev].slice(0, 100))
    if (soundEnabled) playNotificationSound()
  }, [soundEnabled])

  const markRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markRead,
      markAllRead,
      clearAll,
      soundEnabled,
      toggleSound: () => setSoundEnabled(p => !p),
      wsState,
    }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationsContext)
}
