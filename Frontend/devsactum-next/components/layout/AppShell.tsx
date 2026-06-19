"use client"

import React from "react"
import Navbar from "@/components/layout/Navbar"
import Topbar from "@/components/layout/Topbar"
import PageRenderer from "@/components/layout/PageRenderer"
import RightPanel from "@/components/panel/Panel"
import Login from "@/components/layout/Login"
import { useNav } from "@/context/NavContext"
import { ToastProvider } from "@/components/ui/Toast"
import { JobAuthProvider, useJobAuth } from "@/context/JobAuthContext"
import { ThemeProvider } from "@/context/ThemeContext"
import { NotificationsProvider } from "@/context/NotificationsContext"

const PAGES_WITH_PANEL = ["Feed"]

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

function AppContent() {
  const { activePage } = useNav()
  const { user } = useJobAuth()
  const isMobile = useIsMobile()

  if (activePage === "Login") {
    return (
      <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
        <Login />
      </div>
    )
  }

  const showPanel = PAGES_WITH_PANEL.includes(activePage)

  return (
    <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--color-bg)" }}>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, height: "100%", overflow: "hidden" }}>
        <Topbar />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden", minWidth: 0 }} className="animate-fade-in">
            <PageRenderer />
          </main>
          {!isMobile && showPanel && <RightPanel />}
        </div>
      </div>
    </div>
  )
}

export default function AppShell() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <JobAuthProvider>
          <NotificationsProvider>
            <AppContent />
          </NotificationsProvider>
        </JobAuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
