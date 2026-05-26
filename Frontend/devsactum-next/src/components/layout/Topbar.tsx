"use client"
import React, { useState, useRef, useEffect } from "react"
import { Search, Bell, X, Command } from "lucide-react"
import { useNav } from "@/src/store/nav"
import type { Page } from "@/src/types"
import { Avatar } from "@/src/components/ui"
import { ME } from "@/src/lib/mock-data"

const SUGGESTIONS = [
  { label:"Feed principal",       page:"Feed"          as Page },
  { label:"Explorar comunidades", page:"Explorar"      as Page },
  { label:"Chat",                 page:"Chat"          as Page },
  { label:"Configuración",        page:"Configuración" as Page },
]

export function Topbar() {
  const { setActivePage } = useNav()
  const [q, setQ]           = useState("")
  const [open, setOpen]     = useState(false)
  const inputRef            = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); inputRef.current?.focus(); setOpen(true) }
      if (e.key === "Escape") { setOpen(false); setQ("") }
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [])

  const results = SUGGESTIONS.filter(s => !q || s.label.toLowerCase().includes(q.toLowerCase()))

  return (
    <header style={{ height:56, minHeight:56, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", background:"rgba(19,19,19,0.85)", backdropFilter:"blur(12px)", borderBottom:"1px solid #2e303a", flexShrink:0, zIndex:30, position:"relative" }}>

      {/* Search */}
      <div style={{ flex:1, maxWidth:480, margin:"0 auto", position:"relative" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, border:`1px solid ${open ? "rgba(196,154,255,0.4)" : "#2e303a"}`, borderRadius:9, padding:"7px 12px", background:"#0e0e0e", boxShadow: open ? "0 0 0 3px rgba(196,154,255,0.08)" : "none", transition:"all 0.2s" }}>
          <Search size={13} color="#6b6375" style={{ opacity:0.6, flexShrink:0 }} />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Buscar en Devsanctum..."
            style={{ background:"transparent", border:"none", outline:"none", fontSize:12, color:"#f3f4f6", width:"100%" }}
          />
          {q
            ? <button onClick={() => setQ("")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", color:"#6b6375" }}><X size={12} strokeWidth={2} /></button>
            : <div style={{ display:"flex", alignItems:"center", gap:2, opacity:0.3, flexShrink:0 }}>
                <Command size={10} color="#6b6375" /><span style={{ fontSize:10, fontFamily:"monospace", color:"#6b6375" }}>K</span>
              </div>
          }
        </div>

        {/* Dropdown */}
        {open && results.length > 0 && (
          <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:"#131313", border:"1px solid #2e303a", borderRadius:12, boxShadow:"0 20px 40px rgba(0,0,0,0.6)", overflow:"hidden", zIndex:100 }} className="animate-fade-in">
            <div style={{ padding:"8px 12px 4px", fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"1.5px", color:"#6b6375", opacity:0.5 }}>
              {q ? "Resultados" : "Sugerencias"}
            </div>
            {results.map((s, i) => (
              <button key={i} onClick={() => { setActivePage(s.page); setOpen(false); setQ("") }}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", background:"none", border:"none", cursor:"pointer" }}
                className="hover:bg-[#1a1a1f] transition-colors"
              >
                <span style={{ fontSize:12, fontWeight:600, color:"#f3f4f6" }}>{s.label}</span>
                <span style={{ fontSize:10, color:"#6b6375" }}>Página</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right */}
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <button onClick={() => setActivePage("Notificaciones" as Page)} style={{ position:"relative", width:32, height:32, background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:8, color:"#6b6375" }} className="hover:bg-[#1a1a1f] hover:!text-[#f3f4f6] transition-colors">
          <Bell size={15} strokeWidth={1.8} />
          <span style={{ position:"absolute", top:6, right:6, width:6, height:6, borderRadius:"50%", background:"#ff94a8" }} />
        </button>
        <button onClick={() => setActivePage("Perfil" as Page)} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <Avatar initials={ME.initials} color={ME.avatarColor} bg={ME.avatarBg} size="sm" shape="circle" />
        </button>
      </div>
    </header>
  )
}
