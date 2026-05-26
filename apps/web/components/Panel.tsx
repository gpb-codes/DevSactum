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

export default function RightPanel() {
  return (
    <aside className="right-panel">
      {/* Tendencias */}
      <div className="panel-heading">Tendencias</div>
      {TRENDS.map((t) => (
        <div key={t.name} className="trend-item">
          <div className="trend-category">{t.category}</div>
          <div className="trend-name">{t.name}</div>
          <div className="trend-count">{t.count}</div>
        </div>
      ))}
 
      <div className="panel-divider" />
 
      {/* Miembros online */}
      <div className="panel-heading">En línea</div>
      {MEMBERS.map((m) => (
        <div key={m.name} className="member-item">
          <div className="member-avatar" style={m.style}>
            {m.initials}
          </div>
          <div>
            <div className="member-name">{m.name}</div>
            <div className="member-role">{m.role}</div>
          </div>
          <div
            className="online-dot"
            style={{ background: STATUS_COLOR[m.status] }}
          />
        </div>
      ))}
    </aside>
  )
}