import type { Metadata } from "next"
import "./globals.css"
import { NavProvider } from "@/context/NavContext"

export const metadata: Metadata = {
  title: "Devsanctum",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <NavProvider>
          {children}
        </NavProvider>
      </body>
    </html>
  )
}