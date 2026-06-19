export type Page =
  | "Feed"
  | "Explorar"
  | "Comunidades"
  | "Guardados"
  | "Chat"
  | "Perfil"
  | "Notificaciones"
  | "Configuración"
  | "Login"
  | "Bolsa de Empleo"
  | "Empleo Auth"
  | "Empleo Dashboard"
  | "Empleo Premium"
  | "Empleo IA"
  | "Portafolio"
  | "Freelancing"
  | "Validación"
  | "Reputación"
  | "Nosotros"
  | "Contáctanos"

export type NotificationType = "like" | "comment" | "follow" | "mention" | "share"

export interface NotificationActor {
  id: string
  name: string
  handle: string
  initials: string
  avatarGradient: string
}

export interface Notification {
  id: string
  type: NotificationType
  actor: NotificationActor
  postPreview?: string
  read: boolean
  createdAt: string
}

export type JobType = "full-time" | "part-time" | "contract" | "freelance" | "internship"
export type ExperienceLevel = "junior" | "mid" | "senior" | "lead" | "executive"
export type AuthRole = "developer" | "company"

export interface JobCompany {
  id: string
  name: string
  initials: string
  avatarColor: string
  avatarBg: string
  industry: string
  size: string
  location: string
  website: string
  description: string
  verified: boolean
  premium: boolean
}

export interface JobListing {
  id: string
  title: string
  company: JobCompany
  location: string
  remote: boolean
  type: JobType
  experience: ExperienceLevel
  salaryMin: number
  salaryMax: number
  currency: string
  description: string
  requirements: string[]
  benefits: string[]
  tags: string[]
  postedAt: string
  applicants: number
  featured: boolean
  urgent: boolean
}

export interface JobApplication {
  id: string
  jobId: string
  developerId: string
  developerName: string
  developerHandle: string
  developerInitials: string
  developerColor: string
  developerBg: string
  status: "pending" | "reviewed" | "shortlisted" | "interview" | "offered" | "rejected"
  appliedAt: string
  coverLetter: string
  portfolio: string
}

export interface CompanyDashboardStats {
  totalJobs: number
  activeJobs: number
  totalApplicants: number
  shortlisted: number
  interviews: number
  hired: number
}

export interface PremiumFeature {
  id: string
  name: string
  description: string
  icon: string
  category: "visibility" | "analytics" | "tools" | "support"
  popular?: boolean
}
