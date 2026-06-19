import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevSactum — La Red Social para Desarrolladores | Dräkkar Labs",
  description: "Conecta, comparte código, debate ideas y construye tu carrera en tecnología. Feed, empleo, comunidades, portafolio, chat e IA en una sola plataforma. Dräkkar Labs.",
  keywords: "desarrolladores, red social, programadores, empleo tech, portafolio, comunidades, LATAM",
  openGraph: {
    title: "DevSactum — La Red Social para Desarrolladores",
    description: "Todo lo que necesitas como developer, en una sola plataforma.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>%E2%9A%94%EF%B8%8F</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
