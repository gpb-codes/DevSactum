"use client"
import React, { useState } from "react"
import { NavContext } from "@/src/store/nav"
import { Navbar } from "./Navbar"
import { Topbar } from "./Topbar"
import { RightPanel } from "./RightPanel"
import { PageRouter } from "./PageRouter"
import { ToastProvider } from "@/src/components/ui"
import type { Page } from "@/src/types"

const PAGES_WITH_PANEL: Page[] = ["Feed"]

export function AppShell() {
  const [activePage, setActivePage] = useState<Page>("Feed")
  const showPanel = PAGES_WITH_PANEL.includes(activePage)

  return (
    <NavContext.Provider value={{ activePage, setActivePage }}>
      <ToastProvider>
        {/* Background ambient glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[60%] bg-gradient-to-br from-[var(--primary)]/5 to-transparent rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-[var(--secondary)]/4 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex h-dvh w-full overflow-hidden bg-[var(--bg)]">
          <Navbar />
          <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
            <Topbar />
            <div className="flex flex-1 overflow-hidden">
              <main className="flex-1 overflow-y-auto overflow-x-hidden">
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
