"use client"

import Navbar from "@/components/layout/Navbar"
import Topbar from "@/components/layout/Topbar"
import PageRenderer from "@/components/layout/PageRenderer"
import RightPanel from "@/components/panel/Panel"
import Login from "@/components/layout/Login"
import { useNav } from "@/context/NavContext"
import { ToastProvider } from "@/components/ui/Toast"

const PAGES_WITH_PANEL = ["Feed"]

export default function AppShell() {
  const { activePage } = useNav()

  if (activePage === "Login") {
    return (
      <ToastProvider>
        {/* Login ocupa pantalla completa */}
        <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
          <Login />
        </div>
      </ToastProvider>
    )
  }

  const showPanel = PAGES_WITH_PANEL.includes(activePage)

  return (
    <ToastProvider>
      {/*
        Raíz: row, 100% viewport height, sin overflow propio.
        Cada hijo maneja su propio scroll.
      */}
      <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--color-bg)" }}>

        {/* ── Sidebar izquierda ─ altura completa, sin scroll ── */}
        <Navbar />

        {/* ── Columna central + right panel ── */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, height: "100%", overflow: "hidden" }}>

          {/* Topbar fijo en la columna */}
          <Topbar />

          {/* Área de contenido: main + panel, scroll independiente */}
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

            {/* Main: único scroll de la app */}
            <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }} className="animate-fade-in">
              <PageRenderer />
            </main>

            {/* Panel derecho: altura completa, scroll propio */}
            {showPanel && <RightPanel />}
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}
