"use client"

import React from "react"
import { AnimatePresence, motion } from "motion/react"
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ height: "100%", width: "100%", overflow: "auto" }}
      >
        <Login />
      </motion.div>
    )
  }

  const showPanel = PAGES_WITH_PANEL.includes(activePage)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--color-bg)" }}
    >
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, height: "100%", overflow: "hidden" }}>
        <Topbar />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden", minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: "100%" }}
              >
                <PageRenderer />
              </motion.div>
            </AnimatePresence>
          </main>
          {!isMobile && showPanel && <RightPanel />}
        </div>
      </div>
    </motion.div>
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
