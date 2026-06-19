import AppShell from "@/components/layout/AppShell"
import { NavProvider } from "@/context/NavContext"

export default function RootPage() {
  return (
    <NavProvider>
      <AppShell />
    </NavProvider>
  )
}
