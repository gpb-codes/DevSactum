"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Search, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react"
import { Avatar } from "@/src/components/ui/Avatar"

const CONTACTS = [
  { id: 1, initials: "AR", name: "Alex Rivet",  last: "Acabo de hacer push al repo",     time: "2m",  unread: 3, online: true,  color: "var(--primary)", bg: "var(--primary-soft)" },
  { id: 2, initials: "SC", name: "Sarah Chen",  last: "Revisaste el PR que mande?",        time: "14m", unread: 0, online: true,  color: "var(--accent)",  bg: "var(--accent-soft)" },
  { id: 3, initials: "MR", name: "Maria R.",    last: "El diseno nuevo se ve increible", time: "1h",  unread: 1, online: false, color: "#4ade80",        bg: "rgba(74,222,128,.12)" },
  { id: 4, initials: "JL", name: "Juan Lopez",  last: "Nos vemos en el standup",            time: "3h",  unread: 0, online: false, color: "var(--secondary)", bg: "var(--secondary-soft)" },
  { id: 5, initials: "DV", name: "Dev Team",    last: "Carlos: CI paso",                 time: "5h",  unread: 7, online: false, color: "#fb923c",        bg: "rgba(251,146,60,.12)" },
]

const INITIAL_MESSAGES: Record<number, { id: number; text: string; mine: boolean; time: string; read: boolean }[]> = {
  1: [
    { id: 1, text: "Hey, acabo de hacer push al repo con los cambios del auth", mine: false, time: "10:32", read: true },
    { id: 2, text: "Genial! Lo reviso ahora", mine: true, time: "10:33", read: true },
    { id: 3, text: "Hay un bug en el middleware, lo ves?", mine: false, time: "10:35", read: true },
    { id: 4, text: "Si lo veo, lo fixeo en unos minutos", mine: true, time: "10:36", read: false },
  ],
  2: [
    { id: 1, text: "Revisaste el PR que mande ayer?", mine: false, time: "09:15", read: true },
    { id: 2, text: "Todavia no, lo hago ahora", mine: true, time: "09:20", read: true },
  ],
  3: [{ id: 1, text: "El diseno nuevo se ve increible", mine: false, time: "08:00", read: true }],
  4: [{ id: 1, text: "Nos vemos en el standup a las 10", mine: false, time: "07:45", read: true }],
  5: [{ id: 1, text: "CI paso en todos los branches", mine: false, time: "06:30", read: true }],
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 px-6 py-2">
      <div className="flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[var(--radius-lg)] px-4 py-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-typing-dot-1" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-typing-dot-2" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-typing-dot-3" />
      </div>
    </div>
  )
}

export default function Chat() {
  const [activeChat, setActiveChat] = useState(1)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const contact = CONTACTS.find(c => c.id === activeChat)!
  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat, messages])

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), { id: Date.now(), text, mine: true, time, read: false }],
    }))
    setInput("")
  }

  return (
    <div className="flex overflow-hidden" style={{ height: "calc(100vh - 58px)" }}>
      <div className="w-[300px] border-r border-[var(--border)] flex flex-col shrink-0 bg-[var(--bg-surface)]">
        <div className="px-5 pt-5 pb-3 border-b border-[var(--border)]">
          <div className="text-lg font-black text-[var(--text-h)] tracking-tight mb-3">Mensajes</div>
          <div className="flex items-center gap-2 bg-[var(--bg)] border-2 border-[var(--border)] rounded-[var(--radius-lg)] px-3 h-[38px] focus-within:border-[var(--border-active)] transition-all">
            <Search size={13} className="text-[var(--text-muted)] shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar conversacion..."
              className="bg-transparent border-none outline-none text-xs text-[var(--text-h)] w-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {filtered.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-lg)] cursor-pointer text-left transition-all duration-[var(--duration-fast)] ${
                activeChat === c.id
                  ? "bg-[var(--primary-soft)] border border-[var(--primary-border)]"
                  : "border border-transparent hover:bg-[var(--bg-hover)]"
              }`}
            >
              <Avatar
                initials={c.initials}
                color={c.color}
                bg={c.bg}
                size="sm"
                online={c.online}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-sm font-bold text-[var(--text-h)]">{c.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{c.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-soft)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {c.last}
                  </span>
                  {c.unread > 0 && (
                    <span className="bg-[var(--primary)] text-white text-[10px] font-black px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full ml-1">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg)]">
        <div className="flex items-center justify-between px-5 h-[58px] border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            <Avatar
              initials={contact.initials}
              color={contact.color}
              bg={contact.bg}
              size="sm"
              online={contact.online}
            />
            <div>
              <div className="text-sm font-bold text-[var(--text-h)]">{contact.name}</div>
              <div className={`text-xs ${contact.online ? "text-[var(--online)]" : "text-[var(--text-muted)]"}`}>
                {contact.online ? "en linea" : "desconectado"}
              </div>
            </div>
          </div>
          <div className="flex gap-1 text-[var(--text-soft)]">
            <button className="bg-transparent border-none cursor-pointer p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-h)] transition-colors" aria-label="Llamada de voz">
              <Phone size={16} strokeWidth={1.8} />
            </button>
            <button className="bg-transparent border-none cursor-pointer p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-h)] transition-colors" aria-label="Videollamada">
              <Video size={16} strokeWidth={1.8} />
            </button>
            <button className="bg-transparent border-none cursor-pointer p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-h)] transition-colors" aria-label="Mas opciones">
              <MoreVertical size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-2">
          {(messages[activeChat] || []).map(msg => (
            <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"} animate-fade-in`}>
              <div
                className={`max-w-[65%] px-4 py-2.5 ${
                  msg.mine
                    ? "rounded-[14px_14px_4px_14px] bg-[var(--primary-soft)] border border-[var(--primary-border)]"
                    : "rounded-[14px_14px_14px_4px] bg-[var(--bg-surface)] border border-[var(--border)]"
                }`}
              >
                <p className="text-sm text-[var(--text-h)] m-0 leading-[1.5]">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-[var(--text-muted)]">{msg.time}</span>
                  {msg.mine && (
                    msg.read
                      ? <CheckCheck size={12} className="text-[var(--primary)]" />
                      : <Check size={12} className="text-[var(--text-muted)]" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <TypingIndicator />
          <div ref={bottomRef} />
        </div>

        <div className="px-5 py-3.5 border-t border-[var(--border)] flex gap-2.5 items-center bg-[var(--bg-surface)]">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-[var(--bg)] border-2 border-[var(--border)] rounded-[var(--radius-lg)] px-4 h-[42px] text-sm text-[var(--text-h)] outline-none focus:border-[var(--border-active)] transition-colors"
          />
          <button
            onClick={sendMessage}
            className="bg-[var(--primary)] border-2 border-[var(--primary)] rounded-[var(--radius-lg)] px-4 h-[42px] cursor-pointer flex items-center justify-center hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-all"
            aria-label="Enviar mensaje"
          >
            <Send size={16} className="text-white" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
