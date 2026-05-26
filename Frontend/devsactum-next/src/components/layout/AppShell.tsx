"use client"
import React, { useState } from "react"
import { NavContext } from "@/src/store/nav"
import { Navbar }    from "./Navbar"
import { Topbar }    from "./Topbar"
import { RightPanel } from "./RightPanel"
import { PageRouter } from "./PageRouter"
import { ToastProvider } from "@/src/components/ui"
import type { Page }  from "@/src/types"

const PAGES_WITH_PANEL: Page[] = ["Feed"]

export function AppShell() {
  const [activePage, setActivePage] = useState<Page>("Feed")
  const showPanel = PAGES_WITH_PANEL.includes(activePage)

  return (
    <NavContext.Provider value={{ activePage, setActivePage }}>
      <ToastProvider>
        {/* Root: full viewport, no overflow */}
        <div style={{ display:"flex", height:"100dvh", width:"100%", overflow:"hidden", background:"#0e0e0e" }}>

          {/* ── Sidebar ── */}
          <Navbar />

          {/* ── Main column ── */}
          <div style={{ display:"flex", flexDirection:"column", flex:1, minWidth:0, height:"100%", overflow:"hidden" }}>
            <Topbar />

            {/* ── Content row ── */}
            <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
              <main
                style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}
                className="animate-fade-in"
              >
                <PageRouter />
              </main>
              {showPanel && <RightPanel />}
            </div>
          </div>
        </div>
      </ToastProvider>
    </NavContext.Provider>
  )
}
