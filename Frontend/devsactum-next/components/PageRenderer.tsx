"use client"

import { useNav } from "@/context/NavContext"
import dynamic from "next/dynamic"

const Feed        = dynamic(() => import("@/components/Feed"),        { ssr: false })
const ExplorePage = dynamic(() => import("@/components/ExplorePage"), { ssr: false })
const Chat        = dynamic(() => import("@/components/Chat"),        { ssr: false })
const Comunidades = dynamic(() => import("@/components/Comunidades"), { ssr: false })
const Login       = dynamic(() => import("@/components/Login"),       { ssr: false })

const Placeholder = ({ name }: { name: string }) => (
  <div style={{ padding: "2rem", color: "var(--text-h)", fontSize: "1.25rem", fontWeight: 700 }}>
    {name} — próximamente
  </div>
)

export default function PageRenderer() {
  const { activePage } = useNav()

  switch (activePage) {
    case "Feed":        return <Feed />
    case "Explorar":    return <ExplorePage />
    case "Comunidades": return <Comunidades />
    case "Guardados":   return <Placeholder name="Guardados" />
    case "Chat":        return <Chat />
    case "Login":       return <Login />
    default:            return <Feed />
  }
}