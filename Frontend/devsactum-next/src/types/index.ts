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

// ─── User / Auth ──────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  handle: string
  initials: string
  avatarColor: string
  avatarBg: string
  role?: string
  bio?: string
  online?: boolean
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationType = "like" | "comment" | "follow" | "mention" | "share"

export interface NotificationActor extends User {
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

// ─── Feed / Posts ─────────────────────────────────────────────────────────────

export interface PostMilestone {
  quote: string
  stat: string
  statLabel: string
  statCaption: string
}

export interface Post {
  id: number
  author: User
  time: string
  text: string
  code?: string
  codeFile?: string
  tags?: string[]
  milestone?: PostMilestone
  likes: number
  comments: number
  shares: number
  liked: boolean
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface Contact extends User {
  last: string
  time: string
  unread: number
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
  badge?: string
  featured?: boolean
  desc: string
  members: string
  online?: string
  iconColor: string
  iconBg: string
}

export interface Discussion {
  id: number
  community: string
  communityColor: string
  author: string
  time: string
  title: string
  text: string
  comments: number
  shares: number
}

export interface Contributor extends User {
  points: string
}

// ─── Saved ────────────────────────────────────────────────────────────────────

export type SavedType = "post" | "article" | "repo" | "community"

export interface SavedItem {
  id: number
  type: SavedType
  title: string
  author: User
  preview: string
  savedAt: string
  tags?: string[]
}
