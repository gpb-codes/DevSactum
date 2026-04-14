"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Search, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react"

const TRENDS = [
  { category: "Diseño · Popular", name: "#sistemaDiseño", count: "84 posts" },
  { category: "Dev · Activo", name: "#typescript", count: "230 posts" },
  { category: "Evento · Hoy", name: "Sprint Review", count: "18 asistentes" },
]

const MEMBERS = [
  { name: "Juan Pérez", role: "Developer", status: "online", initials: "JP", style: { background: "#3b82f6" } },
  { name: "María García", role: "Designer", status: "away", initials: "MG", style: { background: "#8b5cf6" } },
  { name: "Carlos López", role: "PM", status: "offline", initials: "CL", style: { background: "#ec4899" } },
]

const STATUS_COLOR: Record<string, string> = {
  online: "#3ba55d",
  away:   "#f59e0b",
  offline:"#6b7280",
}

const CONTACTS = [
  { id: 1, initials: "AR", name: "Alex Rivet",   last: "Acabo de hacer push al repo 🚀",        time: "2m",  unread: 3, online: true,  color: "#c49aff", bg: "rgba(196,154,255,.15)" },
  { id: 2, initials: "SC", name: "Sarah Chen",   last: "¿Revisaste el PR que mandé?",           time: "14m", unread: 0, online: true,  color: "#ff94a8", bg: "rgba(255,148,168,.15)" },
  { id: 3, initials: "MR", name: "María R.",     last: "El diseño nuevo se ve increíble 🎨",    time: "1h",  unread: 1, online: false, color: "#4ade80", bg: "rgba(74,222,128,.12)"  },
  { id: 4, initials: "JL", name: "Juan López",   last: "Nos vemos en el standup",               time: "3h",  unread: 0, online: false, color: "#60a5fa", bg: "rgba(96,165,250,.12)"  },
  { id: 5, initials: "DV", name: "Dev Team",     last: "Carlos: CI pasó ✅",                    time: "5h",  unread: 7, online: false, color: "#f59e0b", bg: "rgba(245,158,11,.12)"  },
]

const INITIAL_MESSAGES: Record<number, { id: number; text: string; mine: boolean; time: string; read: boolean }[]> = {
  1: [
    { id: 1, text: "Hey, acabo de hacer push al repo con los cambios del auth 🚀", mine: false, time: "10:32", read: true },
    { id: 2, text: "Genial! Lo reviso ahora", mine: true, time: "10:33", read: true },
    { id: 3, text: "Hay un bug en el middleware, lo ves?", mine: false, time: "10:35", read: true },
    { id: 4, text: "Sí lo veo, lo fixeo en unos minutos", mine: true, time: "10:36", read: false },
  ],
  2: [
    { id: 1, text: "¿Revisaste el PR que mandé ayer?", mine: false, time: "09:15", read: true },
    { id: 2, text: "Todavía no, lo hago ahora", mine: true, time: "09:20", read: true },
  ],
  3: [
    { id: 1, text: "El diseño nuevo se ve increíble 🎨", mine: false, time: "08:00", read: true },
  ],
  4: [
    { id: 1, text: "Nos vemos en el standup a las 10", mine: false, time: "07:45", read: true },
  ],
  5: [
    { id: 1, text: "CI pasó en todos los branches ✅", mine: false, time: "06:30", read: true },
  ],
}

export default function Chat() {
  const [activeChat, setActiveChat] = useState(1)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const contact = CONTACTS.find((c) => c.id === activeChat)!
  const filtered = CONTACTS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat, messages])

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), { id: Date.now(), text, mine: true, time, read: false }],
    }))
    setInput("")
  }

  return (
    <div style={{ display: "flex", height: "calc(100vh - 56px)", background: "var(--bg)", overflow: "hidden" }}>

      {/* Lista de contactos */}
      <div style={{ width: 300, borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Header lista */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-h)", letterSpacing: "-0.5px", marginBottom: 12 }}>Mensajes</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 12px" }}>
            <Search size={13} style={{ color: "var(--text)", opacity: .6, flexShrink: 0 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar conversación..."
              style={{ background: "none", border: "none", outline: "none", fontSize: 12, color: "var(--text-h)", width: "100%", fontFamily: "inherit" }}
            />
          </div>
        </div>

        {/* Contactos */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer",
                background: activeChat === c.id ? "var(--accent-bg)" : "transparent",
                borderLeft: activeChat === c.id ? "2px solid var(--accent)" : "2px solid transparent",
                transition: "all .15s",
              }}
            >
              {/* Avatar con online dot */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                  {c.initials}
                </div>
                {c.online && (
                  <div style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: "#3ba55d", border: "2px solid var(--bg)" }} />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-h)" }}>{c.name}</span>
                  <span style={{ fontSize: 10, color: "var(--text)", opacity: .6 }}>{c.time}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--text)", opacity: .7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 160 }}>{c.last}</span>
                  {c.unread > 0 && (
                    <span style={{ background: "var(--accent)", color: "#1a0033", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 99, flexShrink: 0, marginLeft: 4 }}>{c.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ventana de chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Header chat */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 56, borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: contact.bg, color: contact.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                {contact.initials}
              </div>
              {contact.online && (
                <div style={{ position: "absolute", bottom: 1, right: 1, width: 9, height: 9, borderRadius: "50%", background: "#3ba55d", border: "2px solid var(--bg)" }} />
              )}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-h)" }}>{contact.name}</div>
              <div style={{ fontSize: 11, color: contact.online ? "#3ba55d" : "var(--text)", opacity: contact.online ? 1 : .6 }}>
                {contact.online ? "en línea" : "desconectado"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, color: "var(--text)" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", padding: 6, borderRadius: 6 }}><Phone size={16} strokeWidth={1.8} /></button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", padding: 6, borderRadius: 6 }}><Video size={16} strokeWidth={1.8} /></button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", padding: 6, borderRadius: 6 }}><MoreVertical size={16} strokeWidth={1.8} /></button>
          </div>
        </div>

        {/* Mensajes */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          {(messages[activeChat] || []).map((msg) => (
            <div key={msg.id} style={{ display: "flex", justifyContent: msg.mine ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "65%", padding: "8px 12px", borderRadius: msg.mine ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                background: msg.mine ? "var(--accent-bg)" : "var(--bg-surface)",
                border: `1px solid ${msg.mine ? "var(--accent-border)" : "var(--border)"}`,
              }}>
                <p style={{ fontSize: 13, color: "var(--text-h)", margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: "var(--text)", opacity: .5 }}>{msg.time}</span>
                  {msg.mine && (
                    msg.read
                      ? <CheckCheck size={12} style={{ color: "var(--accent)" }} />
                      : <Check size={12} style={{ color: "var(--text)", opacity: .5 }} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border)", display: "flex", gap: 10, alignItems: "center" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Escribe un mensaje..."
            style={{
              flex: 1, background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 8,
              padding: "10px 14px", fontSize: 13, color: "var(--text-h)", outline: "none", fontFamily: "inherit",
            }}
          />
          <button
            onClick={sendMessage}
            style={{ background: "var(--accent)", border: "none", borderRadius: 8, padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity .15s" }}
          >
            <Send size={15} style={{ color: "#1a0033" }} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Panel de tendencias */}
      <div style={{ width: 280, borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        {/* Tendencias */}
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--text-h)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Tendencias</div>
          {TRENDS.map((t) => (
            <div key={t.name} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)", cursor: "pointer", transition: "opacity .15s" }}>
              <div style={{ fontSize: 10, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{t.category}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-h)", marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "var(--text)" }}>{t.count}</div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "var(--border)", margin: "8px 16px" }} />

        {/* Miembros online */}
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--text-h)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>En línea</div>
          {MEMBERS.map((m) => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.style.background, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>
                  {m.initials}
                </div>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8, borderRadius: "50%", background: STATUS_COLOR[m.status], border: "2px solid var(--bg)" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-h)" }}>{m.name}</div>
                <div style={{ fontSize: 10, color: "var(--text)" }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}