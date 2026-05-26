// ─── Navigation ───────────────────────────────────────────────────────────────

export type Page =
  | "Feed"
  | "Explorar"
  | "Comunidades"
  | "Guardados"
  | "Chat"
  | "Login"
  | "Perfil"
  | "Notificaciones"
  | "Configuración"

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationType = "like" | "comment" | "follow" | "mention" | "share"

export interface NotificationActor {
  id: string
  name: string
  handle: string
  initials: string
  avatarGradient: string
}

export interface Notification {
  id: string
  type: NotificationType
  actor: NotificationActor
  postPreview?: string
  read: boolean
  createdAt: string
}

// ─── Feed ─────────────────────────────────────────────────────────────────────

export interface Post {
  id: number
  initials: string
  name: string
  handle: string
  time: string
  text: string
  code?: string
  codeFile?: string
  tags?: string[]
  milestone?: {
    quote: string
    stat: string
    statLabel: string
    statCaption: string
  }
  likes: number
  comments: number
  shares: number
  liked: boolean
  avatarColor: string
  avatarBg: string
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface Contact {
  id: number
  initials: string
  name: string
  last: string
  time: string
  unread: number
  online: boolean
  color: string
  bg: string
}

export interface Message {
  id: number
  text: string
  mine: boolean
  time: string
  read: boolean
}

// ─── Communities ──────────────────────────────────────────────────────────────

export interface Community {
  id: number
  name: string
  badge: string
  featured: boolean
  desc: string
  members: string
  online?: string
  color: string
  bg: string
}

export interface Discussion {
  community: string
  communityColor: string
  author: string
  time: string
  title: string
  text: string
  comments: number
  shares: number
}

export interface Contributor {
  initials: string
  name: string
  role: string
  points: string
  color: string
  bg: string
}
