"use client"
import React, { useState } from "react"
import { Terminal, Hash, Compass, Users, Bookmark, MessageCircle, User, Settings, Bell, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { useNav } from "@/src/store/nav"
import type { Page } from "@/src/types"

/* Map icon string → component */
const ICON_MAP: Record<string, React.ElementType> = {
  Hash, Compass, Users, Bookmark, MessageCircle, User, Settings, Bell,
}

const NAV = [
  { label:"Navegación", items:[
    { name:"Feed"    as Page, icon:"Hash",          accent:"text-[#c49aff]" },
    { name:"Explorar"as Page, icon:"Compass",       accent:"text-[#ff94a8]" },
  ]},
  { label:"Comunidad", items:[
    { name:"Comunidades"  as Page, icon:"Users",         badge:3 },
    { name:"Guardados"    as Page, icon:"Bookmark"              },
    { name:"Chat"         as Page, icon:"MessageCircle", badge:5 },
  ]},
  { label:"Cuenta", items:[
    { name:"Perfil"        as Page, icon:"User"               },
    { name:"Notificaciones"as Page, icon:"Bell",    badge:4   },
    { name:"Configuración" as Page, icon:"Settings"           },
  ]},
]

export function Navbar() {
  const { activePage, setActivePage } = useNav()
  const [collapsed, setCollapsed] = useState(false)
  const w = collapsed ? 64 : 220

  return (
    <nav
      aria-label="Navegación principal"
      style={{
        width: w, minWidth: w, height:"100%",
        display:"flex", flexDirection:"column",
        background:"#131313", borderRight:"1px solid #2e303a",
        transition:"width 0.25s ease, min-width 0.25s ease",
        flexShrink: 0, overflow:"hidden",
      }}
    >
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"18px 14px", borderBottom:"1px solid #2e303a", justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ width:32, height:32, borderRadius:8, background:"rgba(196,154,255,0.12)", border:"1px solid rgba(196,154,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <Terminal size={15} color="#c49aff" strokeWidth={2} />
        </div>
        {!collapsed && <span style={{ fontSize:15, fontWeight:900, color:"#c49aff", letterSpacing:"-0.3px", whiteSpace:"nowrap" }}>Devsanctum</span>}
      </div>

      {/* Nav items */}
      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", padding:"10px 8px" }}>
        {NAV.map(section => (
          <div key={section.label}>
            {!collapsed && (
              <div style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"1.2px", color:"#6b6375", opacity:0.45, padding:"14px 8px 4px", marginTop:2 }}>
                {section.label}
              </div>
            )}
            {collapsed && <div style={{ height:8 }} />}
            {section.items.map(({ name, icon, badge, accent }: any) => {
              const Icon    = ICON_MAP[icon]
              const isActive = activePage === name
              return (
                <button
                  key={name}
                  onClick={() => setActivePage(name)}
                  title={collapsed ? name : undefined}
                  style={{
                    width:"100%", display:"flex", alignItems:"center",
                    gap:10, padding: collapsed ? "9px 0" : "8px 10px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius:8, border:"1px solid",
                    borderColor: isActive ? "rgba(196,154,255,0.3)" : "transparent",
                    background:  isActive ? "rgba(196,154,255,0.12)" : "transparent",
                    color: isActive ? "#c49aff" : "#6b6375",
                    cursor:"pointer", fontSize:13, fontWeight: isActive ? 700 : 500,
                    marginBottom:2, transition:"all 0.15s ease",
                  }}
                  onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.background = "rgba(196,154,255,0.06)"; (e.currentTarget as HTMLButtonElement).style.color = "#f3f4f6" } }}
                  onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#6b6375" } }}
                >
                  {Icon && <Icon size={15} strokeWidth={1.8} style={{ flexShrink:0, opacity:0.85 }} />}
                  {!collapsed && (
                    <>
                      <span style={{ flex:1, textAlign:"left" }}>{name}</span>
                      {badge != null && (
                        <span style={{ background:"#c49aff", color:"#1a0033", fontSize:10, fontWeight:800, padding:"0 6px", borderRadius:999, minWidth:18, textAlign:"center", lineHeight:"18px" }}>
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding:"10px 8px", borderTop:"1px solid #2e303a", display:"flex", flexDirection:"column", gap:6 }}>
        {!collapsed && (
          <button
            onClick={() => setActivePage("Login" as Page)}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#c49aff", color:"#1a0033", border:"none", borderRadius:9, padding:"9px 12px", fontSize:12, fontWeight:800, cursor:"pointer", width:"100%", transition:"opacity 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <Sparkles size={14} strokeWidth={2} /> Iniciar sesión
          </button>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:"transparent", border:"1px solid #2e303a", borderRadius:9, padding:"7px 12px", fontSize:11, fontWeight:500, color:"#6b6375", cursor:"pointer", width:"100%", transition:"all 0.15s" }}
          onMouseEnter={e => { (e.currentTarget.style.background) = "#1a1a1f"; (e.currentTarget.style.color) = "#f3f4f6" }}
          onMouseLeave={e => { (e.currentTarget.style.background) = "transparent"; (e.currentTarget.style.color) = "#6b6375" }}
        >
          {collapsed
            ? <ChevronRight size={14} strokeWidth={2} />
            : <><ChevronLeft size={14} strokeWidth={2} /> <span>Colapsar</span></>
          }
        </button>
      </div>
    </nav>
  )
}
