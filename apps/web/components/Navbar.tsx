"use client"

import React from "react"
import { Terminal, Compass, Users, Bookmark, MessageCircle } from "lucide-react"
import { useNav, type Page } from "@/context/NavContext"

const NAV_SECTIONS: { label: string; items: { name: Page; Icon: React.ElementType; badge: number | null }[] }[] = [
  {
    label: "Navegación",
    items: [
      { name: "Feed",        Icon: Terminal,      badge: null },
      { name: "Explorar",    Icon: Compass,       badge: null },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { name: "Comunidades", Icon: Users,         badge: 3    },
      { name: "Guardados",   Icon: Bookmark,      badge: null },
      { name: "Chat",        Icon: MessageCircle, badge: 5    },
    ],
  },
]

export default function Navbar() {
  const { activePage, setActivePage } = useNav()

  return (
    <nav className="navbar">
      <div className="navbar-logo">Devsanctum</div>

      <ul className="navbar-links">
        {NAV_SECTIONS.map((section) => (
          <li key={section.label}>
            <div className="navbar-section">{section.label}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
              {section.items.map(({ name, Icon, badge }) => (
                <li key={name}>
                  <button
                    className={`navbar-link ${activePage === name ? "active" : ""}`}
                    onClick={() => setActivePage(name)}
                  >
                    <Icon size={16} strokeWidth={1.8} className="link-icon" />
                    {name}
                    {badge !== null && (
                      <span className="navbar-badge">{badge}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Botón login conectado al contexto */}
      <button
        className="navbar-cta"
        onClick={() => setActivePage("Login")}
      >
        Iniciar sesión
      </button>
    </nav>
  )
}