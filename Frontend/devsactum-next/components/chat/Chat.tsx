"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Search, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react"

const TRENDS = [
  { category: "Diseño · Popular", name: "#sistemaDiseño", count: "84 posts" },
  { category: "Dev · Activo", name: "#typescript", count: "230 posts" },
  { category: "Evento · Hoy", name: "Sprint Review", count: "18 asistentes" },
]

const MEMBERS = [
  { name: "Juan Pérez", role: "Developer", status: "online", initials: "JP", bg: "#3b82f6" },
  { name: "María García", role: "Designer", status: "away", initials: "MG", bg: "#8b5cf6" },
  { name: "Carlos López", role: "PM", status: "offline", initials: "CL", bg: "#ec4899" },
]

const STATUS_COLOR: Record<string, string> = {
  online: "#3ba55d",
  away: "#f59e0b",
  offline: "#6b7280",
}

const CONTACTS = [
  { id: 1, initials: "AR", name: "Alex Rivet",  last: "Acabo de hacer push al repo 🚀",     time: "2m",  unread: 3, online: true,  color: "#c49aff", bg: "rgba(196,154,255,.15)" },
  { id: 2, initials: "SC", name: "Sarah Chen",  last: "¿Revisaste el PR que mandé?",        time: "14m", unread: 0, online: true,  color: "#ff94a8", bg: "rgba(255,148,168,.15)" },
  { id: 3, initials: "MR", name: "María R.",    last: "El diseño nuevo se ve increíble 🎨", time: "1h",  unread: 1, online: false, color: "#4ade80", bg: "rgba(74,222,128,.12)" },
  { id: 4, initials: "JL", name: "Juan López",  last: "Nos vemos en el standup",            time: "3h",  unread: 0, online: false, color: "#60a5fa", bg: "rgba(96,165,250,.12)" },
  { id: 5, initials: "DV", name: "Dev Team",    last: "Carlos: CI pasó ✅",                 time: "5h",  unread: 7, online: false, color: "#f59e0b", bg: "rgba(245,158,11,.12)" },
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
  3: [{ id: 1, text: "El diseño nuevo se ve increíble 🎨", mine: false, time: "08:00", read: true }],
  4: [{ id: 1, text: "Nos vemos en el standup a las 10", mine: false, time: "07:45", read: true }],
  5: [{ id: 1, text: "CI pasó en todos los branches ✅", mine: false, time: "06:30", read: true }],
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
    <div className="flex overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>

      {/* Lista de contactos */}
      <div className="w-[300px] border-r border-border flex flex-col shrink-0">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <div className="text-[18px] font-extrabold text-text-h tracking-tight mb-3">Mensajes</div>
          <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-lg px-3 py-[7px]">
            <Search size={13} className="text-text opacity-60 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar conversación..."
              className="bg-transparent border-none outline-none text-[12px] text-text-h w-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 border-l-2 ${
                activeChat === c.id
                  ? "bg-accent-bg border-accent"
                  : "border-transparent hover:bg-bg-hover"
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[13px] font-bold"
                  style={{ background: c.bg, color: c.color }}
                >
                  {c.initials}
                </div>
                {c.online && (
                  <div className="absolute bottom-[1px] right-[1px] w-2.5 h-2.5 rounded-full bg-online border-2 border-bg" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[13px] font-bold text-text-h">{c.name}</span>
                  <span className="text-[10px] text-text opacity-60">{c.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-text opacity-70 whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px]">{c.last}</span>
                  {c.unread > 0 && (
                    <span className="bg-accent text-[#1a0033] text-[10px] font-bold px-1.5 py-0 rounded-full shrink-0 ml-1">{c.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ventana de chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header chat */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold"
                style={{ background: contact.bg, color: contact.color }}
              >
                {contact.initials}
              </div>
              {contact.online && (
                <div className="absolute bottom-[1px] right-[1px] w-[9px] h-[9px] rounded-full bg-online border-2 border-bg" />
              )}
            </div>
            <div>
              <div className="text-[13px] font-bold text-text-h">{contact.name}</div>
              <div className={`text-[11px] ${contact.online ? "text-online" : "text-text opacity-60"}`}>
                {contact.online ? "en línea" : "desconectado"}
              </div>
            </div>
          </div>
          <div className="flex gap-2 text-text">
            <button className="bg-transparent border-none cursor-pointer text-text p-1.5 rounded-md"><Phone size={16} strokeWidth={1.8} /></button>
            <button className="bg-transparent border-none cursor-pointer text-text p-1.5 rounded-md"><Video size={16} strokeWidth={1.8} /></button>
            <button className="bg-transparent border-none cursor-pointer text-text p-1.5 rounded-md"><MoreVertical size={16} strokeWidth={1.8} /></button>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-2">
          {(messages[activeChat] || []).map((msg) => (
            <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[65%] px-3 py-2 ${msg.mine ? "rounded-[12px_12px_2px_12px] bg-accent-bg border border-accent-border" : "rounded-[12px_12px_12px_2px] bg-bg-surface border border-border"}`}
              >
                <p className="text-[13px] text-text-h m-0 leading-[1.5]">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-text opacity-50">{msg.time}</span>
                  {msg.mine && (
                    msg.read
                      ? <CheckCheck size={12} className="text-accent" />
                      : <Check size={12} className="text-text opacity-50" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-border flex gap-2.5 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-bg-surface border border-border rounded-lg px-3.5 py-2.5 text-[13px] text-text-h outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-accent border-none rounded-lg px-3.5 py-2.5 cursor-pointer flex items-center justify-center transition-opacity duration-150 hover:opacity-85"
          >
            <Send size={15} className="text-[#1a0033]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Panel de tendencias */}
      <div className="w-[280px] border-l border-border flex flex-col shrink-0 overflow-y-auto">
        <div className="p-4">
          <div className="text-[12px] font-extrabold text-text-h uppercase tracking-[0.5px] mb-3">Tendencias</div>
          {TRENDS.map((t) => (
            <div key={t.name} className="py-3 border-b border-border cursor-pointer hover:opacity-80 transition-opacity duration-150">
              <div className="text-[10px] text-text uppercase tracking-[0.5px] mb-1">{t.category}</div>
              <div className="text-[14px] font-bold text-text-h mb-0.5">{t.name}</div>
              <div className="text-[11px] text-text">{t.count}</div>
            </div>
          ))}
        </div>

        <div className="h-px bg-border mx-4 my-2" />

        <div className="p-4">
          <div className="text-[12px] font-extrabold text-text-h uppercase tracking-[0.5px] mb-3">En línea</div>
          {MEMBERS.map((m) => (
            <div key={m.name} className="flex items-center gap-2.5 py-2.5 border-b border-border">
              <div className="relative shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ background: m.bg }}
                >
                  {m.initials}
                </div>
                <div
                  className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-bg"
                  style={{ background: STATUS_COLOR[m.status] }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-bold text-text-h">{m.name}</div>
                <div className="text-[10px] text-text">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}