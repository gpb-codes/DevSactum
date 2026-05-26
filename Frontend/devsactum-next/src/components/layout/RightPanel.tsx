"use client"
import React from "react"

const TRENDS = [
  { cat:"Diseño · Popular", name:"#sistemaDiseño",  count:"84 posts"       },
  { cat:"Dev · Activo",     name:"#typescript",     count:"230 posts"      },
  { cat:"Evento · Hoy",     name:"Sprint Review",   count:"18 asistentes"  },
]

const ONLINE = [
  { name:"Juan Pérez",   role:"Developer", status:"online",  init:"JP", bg:"#3b82f6"                                  },
  { name:"María García", role:"Designer",  status:"away",    init:"MG", bg:"linear-gradient(135deg,#8b5cf6,#c49aff)"  },
  { name:"Carlos López", role:"PM",        status:"offline", init:"CL", bg:"#ec4899"                                  },
]

const STATUS_DOT: Record<string, string> = { online:"#3ba55d", away:"#f59e0b", offline:"#6b7280" }

export function RightPanel() {
  return (
    <aside aria-label="Panel de tendencias" style={{ width:260, minWidth:260, height:"100%", overflowY:"auto", background:"#131313", borderLeft:"1px solid #2e303a", flexShrink:0, display:"flex", flexDirection:"column" }}>

      {/* Tendencias */}
      <div style={{ padding:"20px 20px 0" }}>
        <p style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"1.8px", color:"#6b6375", opacity:0.55, marginBottom:12 }}>Tendencias</p>
        {TRENDS.map((t, i) => (
          <div key={t.name} style={{ padding:"12px 0", borderBottom: i < TRENDS.length - 1 ? "1px solid #2e303a" : "none", cursor:"pointer" }}>
            <p style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"1px", color:"#6b6375", opacity:0.5, margin:"0 0 3px" }}>{t.cat}</p>
            <p style={{ fontSize:13, fontWeight:700, color:"#f3f4f6", margin:"0 0 2px" }}>{t.name}</p>
            <p style={{ fontSize:11, color:"#6b6375", margin:0 }}>{t.count}</p>
          </div>
        ))}
      </div>

      <div style={{ height:1, background:"#2e303a", margin:"16px 20px" }} />

      {/* En línea */}
      <div style={{ padding:"0 20px 20px" }}>
        <p style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"1.8px", color:"#6b6375", opacity:0.55, marginBottom:12 }}>En línea</p>
        {ONLINE.map(m => (
          <div key={m.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid #2e303a" }}>
            <div className="relative shrink-0">
              <div style={{ width:32, height:32, borderRadius:"50%", background:m.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff" }}>
                {m.init}
              </div>
              <div style={{ position:"absolute", bottom:0, right:0, width:9, height:9, borderRadius:"50%", border:"2px solid #131313", background:STATUS_DOT[m.status] }} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"#f3f4f6", margin:0, lineHeight:1.3 }}>{m.name}</p>
              <p style={{ fontSize:10, color:"#6b6375", margin:0 }}>{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
