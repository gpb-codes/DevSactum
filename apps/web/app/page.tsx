"use client"

import Navbar from "@/components/Navbar"
import Topbar from "@/components/Topbar"
import PageRenderer from "@/components/PageRenderer"
import { useNav } from "@/context/NavContext"

function AppShell() {
  const { activePage } = useNav()
  const isLogin = activePage === "Login"

  if (isLogin) {
    return <PageRenderer />
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Topbar />
        <PageRenderer />
      </div>
    </>
  )
}

export default function Home() {
  return <AppShell />
}