import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Devsanctum — Red social para developers",
  description: "Donde los developers construyen, comparten y conectan. Proyectos, código, comunidad.",
  keywords: ["developers", "programming", "social", "code", "community", "devs"],
  manifest: "/manifest.json",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#020617",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var t = localStorage.getItem('ds-theme');
                if (t === 'light' || (t !== 'dark' && window.matchMedia('(prefers-color-scheme:light)').matches))
                  document.documentElement.classList.add('light');
              })();
            `,
          }}
        />
      </head>
      <body className="h-full overflow-hidden" style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
