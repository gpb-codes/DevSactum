"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { AuthRole } from "@/types"
import { authService, type AuthUser } from "@/services/auth"

interface JobAuthUser {
  id: string
  name: string
  email: string
  role: AuthRole
  initials: string
  companyName?: string
  isPremium: boolean
}

interface JobAuthContextType {
  user: JobAuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: AuthRole) => Promise<boolean>
  register: (data: { name: string; email: string; password: string; role: AuthRole; companyName?: string }) => Promise<boolean>
  logout: () => void
  upgradeToPremium: () => void
}

const JobAuthContext = createContext<JobAuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  upgradeToPremium: () => {},
})

function mapToJobUser(authUser: AuthUser, role: AuthRole, companyName?: string): JobAuthUser {
  return {
    id: authUser.id,
    name: authUser.displayName,
    email: authUser.email,
    role,
    initials: authUser.initials,
    companyName,
    isPremium: authUser.isPremium,
  }
}

export function JobAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JobAuthUser | null>(null)

  useEffect(() => {
    const stored = authService.getStoredUser()
    if (stored) {
      setUser(mapToJobUser(stored, stored.role as AuthRole))
    }
  }, [])

  const login = useCallback(async (email: string, password: string, role: AuthRole) => {
    try {
      const authUser = await authService.login(email, password)
      setUser(mapToJobUser(authUser, role))
      return true
    } catch (err) {
      console.error("Login failed:", err)
      return false
    }
  }, [])

  const register = useCallback(async (data: { name: string; email: string; password: string; role: AuthRole; companyName?: string }) => {
    try {
      const authUser = await authService.register(data)
      setUser(mapToJobUser(authUser, data.role, data.companyName))
      return true
    } catch (err) {
      console.error("Register failed:", err)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const upgradeToPremium = useCallback(() => {
    setUser(prev => prev ? { ...prev, isPremium: true } : null)
  }, [])

  return (
    <JobAuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, upgradeToPremium }}>
      {children}
    </JobAuthContext.Provider>
  )
}

export function useJobAuth() {
  return useContext(JobAuthContext)
}
