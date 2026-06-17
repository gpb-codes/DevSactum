import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Devsanctum — Red social para developers",
  description: "Donde los developers construyen, comparten y conectan. Proyectos, código, comunidad.",
  keywords: ["developers", "programming", "social", "code", "community", "devs"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
      <body className="h-full overflow-hidden">
        {children}
      </body>
    </html>
  )
}
