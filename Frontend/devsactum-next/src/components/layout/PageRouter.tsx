"use client"
import dynamic from "next/dynamic"
import { useNav } from "@/src/store/nav"

/* Lazy-load every page — avoids SSR issues and splits the bundle */
const Feed              = dynamic(() => import("@/src/features/feed/Feed"),                       { ssr:false })
const ExplorePage       = dynamic(() => import("@/src/features/explore/ExplorePage"),             { ssr:false })
const Chat              = dynamic(() => import("@/src/features/chat/Chat"),                       { ssr:false })
const Comunidades       = dynamic(() => import("@/src/features/communities/Comunidades"),         { ssr:false })
const ProfilePage       = dynamic(() => import("@/src/features/profile/ProfilePage"),             { ssr:false })
const NotificationsPage = dynamic(() => import("@/src/features/notifications/NotificationsPage"),{ ssr:false })
const SettingsPage      = dynamic(() => import("@/src/features/settings/SettingsPage"),          { ssr:false })
const SavedPage         = dynamic(() => import("@/src/features/saved/SavedPage"),                { ssr:false })
const Login             = dynamic(() => import("@/src/features/auth/Login"),                     { ssr:false })

export function PageRouter() {
  const { activePage } = useNav()
  switch (activePage) {
    case "Feed":           return <Feed />
    case "Explorar":       return <ExplorePage />
    case "Comunidades":    return <Comunidades />
    case "Guardados":      return <SavedPage />
    case "Chat":           return <Chat />
    case "Perfil":         return <ProfilePage />
    case "Notificaciones": return <NotificationsPage />
    case "Configuración":  return <SettingsPage />
    case "Login":          return <Login />
    default:               return <Feed />
  }
}
