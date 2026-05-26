import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Devsanctum — Red social para developers",
  description: "Plataforma social para desarrolladores. Comparte proyectos, conecta con la comunidad y crece profesionalmente.",
  keywords: ["developers", "programming", "social", "code", "community"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" style={{ height:"100%" }}>
      <body style={{ height:"100%", overflow:"hidden" }}>
        {children}
      </body>
    </html>
  )
}
