"use client"

import { useNav } from "@/context/NavContext"
import dynamic from "next/dynamic"
import { PageLoader } from "@/components/ui/PageLoader"

const opts = { loading: () => <PageLoader /> }

const Feed              = dynamic(() => import("@/components/feed/Feed"),                        { ...opts, ssr: false })
const ExplorePage       = dynamic(() => import("@/components/explore/ExplorePage"),              { ...opts, ssr: false })
const Chat              = dynamic(() => import("@/components/chat/Chat"),                        { ...opts, ssr: false })
const Comunidades       = dynamic(() => import("@/components/communities/Comunidades"),          { ...opts, ssr: false })
const Login             = dynamic(() => import("@/components/layout/Login"),                     { ...opts, ssr: false })
const ProfilePage       = dynamic(() => import("@/components/profile/ProfilePage"),              { ...opts, ssr: false })
const NotificationsPage = dynamic(() => import("@/components/notifications/NotificationsPage"),  { ...opts, ssr: false })
const SettingsPage      = dynamic(() => import("@/components/settings/Settingspage"),            { ...opts, ssr: false })
const SavedPage         = dynamic(() => import("@/components/saved/SavedPage"),                  { ...opts, ssr: false })
const JobBoard          = dynamic(() => import("@/components/empleo/JobBoard"),                  { ...opts, ssr: false })
const EmpleoAuth        = dynamic(() => import("@/components/empleo/EmpleoAuth"),                { ...opts, ssr: false })
const CompanyDashboard  = dynamic(() => import("@/components/empleo/CompanyDashboard"),          { ...opts, ssr: false })
const PremiumPage       = dynamic(() => import("@/components/empleo/PremiumPage"),               { ...opts, ssr: false })
const AIToolsPage       = dynamic(() => import("@/components/empleo/AIToolsPage"),               { ...opts, ssr: false })
const PortfolioPage     = dynamic(() => import("@/components/portfolio/PortfolioPage"),           { ...opts, ssr: false })
const FreelancePage     = dynamic(() => import("@/components/freelance/FreelancePage"),           { ...opts, ssr: false })
const ValidationPage    = dynamic(() => import("@/components/validation/ValidationPage"),         { ...opts, ssr: false })
const ReputationPage    = dynamic(() => import("@/components/reputation/ReputationPage"),         { ...opts, ssr: false })
const NosotrosPage      = dynamic(() => import("@/components/about/NosotrosPage"),                { ...opts, ssr: false })
const ContactPage       = dynamic(() => import("@/components/about/ContactPage"),                 { ...opts, ssr: false })

export default function PageRenderer() {
  const { activePage } = useNav()

  switch (activePage) {
    case "Feed":              return <Feed />
    case "Explorar":          return <ExplorePage />
    case "Comunidades":       return <Comunidades />
    case "Guardados":         return <SavedPage />
    case "Chat":              return <Chat />
    case "Login":             return <Login />
    case "Perfil":            return <ProfilePage />
    case "Notificaciones":    return <NotificationsPage />
    case "Configuración":     return <SettingsPage />
    case "Bolsa de Empleo":   return <JobBoard />
    case "Empleo Auth":       return <EmpleoAuth />
    case "Empleo Dashboard":  return <CompanyDashboard />
    case "Empleo Premium":    return <PremiumPage />
    case "Empleo IA":         return <AIToolsPage />
    case "Portafolio":        return <PortfolioPage />
    case "Freelancing":       return <FreelancePage />
    case "Validación":        return <ValidationPage />
    case "Reputación":        return <ReputationPage />
    case "Nosotros":          return <NosotrosPage />
    case "Contáctanos":       return <ContactPage />
    default:                  return <Feed />
  }
}
