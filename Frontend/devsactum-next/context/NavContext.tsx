"use client"

import React, { createContext, useContext, useState } from "react"
import type { Page } from "@/types"

interface NavContextType {
  activePage: Page
  setActivePage: (page: Page) => void
}

const NavContext = createContext<NavContextType>({
  activePage: "Feed",
  setActivePage: () => {},
})

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState<Page>("Feed")
  return (
    <NavContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  return useContext(NavContext)
}