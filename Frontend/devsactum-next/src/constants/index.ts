import type { Page } from "@/src/types"
import {
  Hash, Compass, Users, Bookmark, MessageCircle,
  User, Settings, Bell,
} from "lucide-react"

// ─── Nav sections ─────────────────────────────────────────────────────────────

export const NAV_SECTIONS: {
  label: string
  items: { name: Page; icon: string; badge?: number }[]
}[] = [
  {
    label: "Navegación",
    items: [
      { name: "Feed",     icon: "Hash"    },
      { name: "Explorar", icon: "Compass" },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { name: "Comunidades", icon: "Users",         badge: 3 },
      { name: "Guardados",   icon: "Bookmark"               },
      { name: "Chat",        icon: "MessageCircle", badge: 5 },
    ],
  },
  {
    label: "Cuenta",
    items: [
      { name: "Perfil",         icon: "User"               },
      { name: "Notificaciones", icon: "Bell",    badge: 4  },
      { name: "Configuración",  icon: "Settings"           },
    ],
  },
]

// ─── Avatar palettes ──────────────────────────────────────────────────────────

export const AVATAR_PALETTES = [
  { color: "#c49aff", bg: "rgba(196,154,255,0.15)" },
  { color: "#ff94a8", bg: "rgba(255,148,168,0.15)" },
  { color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  { color: "#4ade80", bg: "rgba(74,222,128,0.12)"  },
  { color: "#f59e0b", bg: "rgba(245,158,11,0.12)"  },
  { color: "#fb923c", bg: "rgba(251,146,60,0.12)"  },
]

// ─── Status colors ────────────────────────────────────────────────────────────

export const STATUS_COLORS = {
  online:  "#3ba55d",
  away:    "#f59e0b",
  offline: "#6b7280",
} as const

// ─── Breakpoints ──────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const
