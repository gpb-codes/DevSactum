"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const WS_GO = process.env.NEXT_PUBLIC_WS_GO || "ws://localhost:8000/ws"
const WS_NESTJS = process.env.NEXT_PUBLIC_WS_NESTJS || "http://localhost:8001"

export interface WSMessage {
  type: string
  room?: string
  sender?: string
  senderId?: string
  senderName?: string
  receiverId?: string
  content?: string
  data?: unknown
  timestamp?: number
  id?: string
  isTyping?: boolean
  userId?: string
}

type ConnectionState = "connecting" | "connected" | "disconnected" | "reconnecting"

interface UseWebSocketOptions {
  userId?: string
  autoConnect?: boolean
  reconnectAttempts?: number
  reconnectInterval?: number
  onMessage?: (msg: WSMessage) => void
  onConnect?: () => void
  onDisconnect?: () => void
}

class WebSocketClient {
  private ws: WebSocket | null = null
  private url: string
  private listeners: Map<string, Set<(msg: WSMessage) => void>> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 10
  private reconnectInterval = 2000
  private pingInterval: ReturnType<typeof setInterval> | null = null
  private userId: string

  constructor(url: string, userId: string) {
    this.url = url
    this.userId = userId
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const separator = this.url.includes("?") ? "&" : "?"
        this.ws = new WebSocket(`${this.url}${separator}userId=${this.userId}`)

        this.ws.onopen = () => {
          console.log("[WS] Connected to", this.url)
          this.reconnectAttempts = 0
          this.startPing()
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const msg: WSMessage = JSON.parse(event.data)
            this.emit(msg.type, msg)
          } catch {}
        }

        this.ws.onclose = () => {
          this.stopPing()
          this.emit("_disconnected", { type: "_disconnected" })
          this.attemptReconnect()
        }

        this.ws.onerror = (err) => {
          console.error("[WS] Error:", err)
          reject(err)
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("[WS] Max reconnect attempts reached")
      return
    }

    this.reconnectAttempts++
    const delay = this.reconnectInterval * Math.pow(1.5, this.reconnectAttempts - 1)
    console.log(`[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})...`)

    setTimeout(() => {
      this.connect().catch(() => {})
    }, delay)
  }

  private startPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" })
    }, 30000)
  }

  private stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
      this.pingInterval = null
    }
  }

  send(msg: WSMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg))
    }
  }

  on(type: string, callback: (msg: WSMessage) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type)!.add(callback)
    return () => {
      this.listeners.get(type)?.delete(callback)
    }
  }

  private emit(type: string, msg: WSMessage) {
    this.listeners.get(type)?.forEach(cb => cb(msg))
    this.listeners.get("*")?.forEach(cb => cb(msg))
  }

  joinRoom(room: string) {
    this.send({ type: "join_room", room })
  }

  leaveRoom(room: string) {
    this.send({ type: "leave_room", room })
  }

  sendChatMessage(room: string, content: string, senderName: string) {
    this.send({ type: "chat_message", room, content, sender: senderName })
  }

  sendDirectMessage(receiverId: string, content: string, senderName: string) {
    this.send({ type: "direct_message", receiverId, content, sender: senderName })
  }

  sendTyping(room: string, isTyping: boolean) {
    this.send({ type: "typing", room, data: { isTyping } })
  }

  joinUserRoom(userId: string) {
    this.send({ type: "join_user_room", userId })
  }

  disconnect() {
    this.stopPing()
    this.maxReconnectAttempts = 0
    this.ws?.close()
  }

  get connected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

let globalClient: WebSocketClient | null = null

export function getWSClient(userId?: string): WebSocketClient | null {
  return globalClient
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const {
    userId = "user-" + Math.random().toString(36).slice(2, 9),
    autoConnect = true,
    onMessage,
    onConnect,
    onDisconnect,
  } = options

  const [state, setState] = useState<ConnectionState>("disconnected")
  const [onlineCount, setOnlineCount] = useState(0)
  const clientRef = useRef<WebSocketClient | null>(null)

  const connect = useCallback(() => {
    if (clientRef.current?.connected) return

    const client = new WebSocketClient(WS_NESTJS, userId)
    clientRef.current = client
    globalClient = client

    setState("connecting")
    client.connect()
      .then(() => {
        setState("connected")
        onConnect?.()
      })
      .catch(() => {
        setState("reconnecting")
      })

    client.on("pong", () => {})
    client.on("online_count", (msg) => {
      setOnlineCount((msg.data as number) || 0)
    })

    if (onMessage) {
      client.on("*", onMessage)
    }

    client.on("_disconnected", () => {
      setState("disconnected")
      onDisconnect?.()
    })
  }, [userId, onMessage, onConnect, onDisconnect])

  const disconnect = useCallback(() => {
    clientRef.current?.disconnect()
    clientRef.current = null
    globalClient = null
    setState("disconnected")
  }, [])

  useEffect(() => {
    if (autoConnect) {
      connect()
    }
    return () => {
      disconnect()
    }
  }, [autoConnect])

  return {
    state,
    onlineCount,
    client: clientRef.current,
    connect,
    disconnect,
    send: (msg: WSMessage) => clientRef.current?.send(msg),
    joinRoom: (room: string) => clientRef.current?.joinRoom(room),
    leaveRoom: (room: string) => clientRef.current?.leaveRoom(room),
    sendChat: (room: string, content: string, name: string) => clientRef.current?.sendChatMessage(room, content, name),
    sendDM: (receiverId: string, content: string, name: string) => clientRef.current?.sendDirectMessage(receiverId, content, name),
    sendTyping: (room: string, typing: boolean) => clientRef.current?.sendTyping(room, typing),
  }
}

export function useChatSocket(room: string, userId: string, senderName: string) {
  const [messages, setMessages] = useState<WSMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set())
  const { client, state } = useWebSocket({
    userId,
    onMessage: (msg) => {
      if (msg.type === "chat_message" && msg.room === room) {
        setMessages(prev => [...prev, msg])
      }
      if (msg.type === "typing" && msg.room === room) {
        const tid = msg.senderId || ""
        setTypingUsers(prev => {
          const next = new Set(prev)
          if (msg.data && (msg.data as { isTyping: boolean }).isTyping) {
            next.add(tid)
          } else {
            next.delete(tid)
          }
          return next
        })
      }
    },
  })

  useEffect(() => {
    if (state === "connected" && client) {
      client.joinRoom(room)
      return () => { client.leaveRoom(room) }
    }
  }, [state, client, room])

  const sendMessage = useCallback((content: string) => {
    client?.sendChatMessage(room, content, senderName)
  }, [client, room, senderName])

  const sendTypingIndicator = useCallback((isTyping: boolean) => {
    client?.sendTyping(room, isTyping)
  }, [client, room])

  return { messages, typingUsers, sendMessage, sendTypingIndicator, state }
}
