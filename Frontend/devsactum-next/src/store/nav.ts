"use client"

import { createContext, useContext, useState } from "react"
import type { Page } from "@/src/types"

interface NavState {
  activePage: Page
  setActivePage: (page: Page) => void
}

export const NavContext = createContext<NavState>({
  activePage: "Feed",
  setActivePage: () => {},
})

export function useNav() {
  return useContext(NavContext)
}
