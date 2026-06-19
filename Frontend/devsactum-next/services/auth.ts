import { apiGo, apiNestjs } from "@/lib/api"

export interface AuthUser {
  id: string
  email: string
  username: string
  displayName: string
  role: "developer" | "company"
  initials: string
  companyName?: string
  isPremium: boolean
  token: string
}

interface LoginResponse {
  user: {
    id: string
    email: string
    username: string
    display_name: string
  }
  token: string
}

interface RegisterResponse {
  user: {
    id: string
    email: string
    username: string
    display_name: string
  }
}

function mapUser(raw: LoginResponse["user"]): AuthUser {
  const initials = raw.display_name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return {
    id: raw.id,
    email: raw.email,
    username: raw.username,
    displayName: raw.display_name,
    role: "developer",
    initials,
    isPremium: false,
    token: "",
  }
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthUser> => {
    const res = await apiNestjs.post<LoginResponse>("/auth/login", { email, password })
    const user = mapUser(res.user)
    user.token = res.token
    localStorage.setItem("ds-token", res.token)
    localStorage.setItem("ds-user", JSON.stringify(user))
    return user
  },

  register: async (data: { name: string; email: string; password: string; role: "developer" | "company"; companyName?: string }): Promise<AuthUser> => {
    const res = await apiNestjs.post<RegisterResponse>("/auth/register", {
      email: data.email,
      username: data.name.toLowerCase().replace(/\s+/g, "_"),
      password: data.password,
      displayName: data.name,
    })
    const user: AuthUser = {
      id: res.user.id,
      email: res.user.email,
      username: res.user.username,
      displayName: res.user.display_name,
      role: data.role,
      initials: data.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      companyName: data.companyName,
      isPremium: false,
      token: "",
    }
    return user
  },

  logout: () => {
    localStorage.removeItem("ds-token")
    localStorage.removeItem("ds-user")
  },

  getProfile: async (userId: string) => {
    const res = await apiNestjs.get<{ user: Record<string, unknown> }>(`/auth/user/${userId}`)
    return res.user
  },

  updateProfile: async (userId: string, data: Record<string, unknown>) => {
    const res = await apiNestjs.put<{ user: Record<string, unknown> }>(`/auth/user/${userId}`, data)
    return res.user
  },

  getStoredUser: (): AuthUser | null => {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem("ds-user")
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  },
}
