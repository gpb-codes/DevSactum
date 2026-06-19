import type { JobListing, JobCompany, PremiumFeature, CompanyDashboardStats, JobApplication } from "@/types"

export const JOB_COMPANIES: JobCompany[] = [
  {
    id: "c1", name: "NexusLabs", initials: "NL", avatarColor: "#c49aff", avatarBg: "rgba(196,154,255,.15)",
    industry: "Web3 / Blockchain", size: "50-200", location: "Remote", website: "https://nexuslabs.dev",
    description: "Building the next generation of decentralized developer tools.", verified: true, premium: true,
  },
  {
    id: "c2", name: "QuantumForge", initials: "QF", avatarColor: "#ff94a8", avatarBg: "rgba(255,148,168,.15)",
    industry: "AI / Machine Learning", size: "200-500", location: "San Francisco, CA", website: "https://quantumforge.ai",
    description: "Pioneering quantum-inspired ML architectures for enterprise.", verified: true, premium: true,
  },
  {
    id: "c3", name: "VoidStack", initials: "VS", avatarColor: "#60a5fa", avatarBg: "rgba(96,165,250,.12)",
    industry: "Cloud Infrastructure", size: "10-50", location: "Berlin, DE", website: "https://voidstack.io",
    description: "Serverless edge computing platform with sub-millisecond cold starts.", verified: true, premium: false,
  },
  {
    id: "c4", name: "HelixData", initials: "HD", avatarColor: "#4ade80", avatarBg: "rgba(74,222,128,.12)",
    industry: "Data Engineering", size: "100-300", location: "London, UK", website: "https://helixdata.co",
    description: "Real-time data pipelines processing 2M events/sec.", verified: true, premium: false,
  },
  {
    id: "c5", name: "CryptoNest", initials: "CN", avatarColor: "#f59e0b", avatarBg: "rgba(245,158,11,.12)",
    industry: "Fintech / DeFi", size: "50-100", location: "Remote", website: "https://cryptonest.finance",
    description: "Decentralized financial protocols for the next billion users.", verified: false, premium: true,
  },
]

export const MOCK_JOBS: JobListing[] = [
  {
    id: "j1", title: "Senior Rust Engineer", company: JOB_COMPANIES[0],
    location: "Remote (Global)", remote: true, type: "full-time", experience: "senior",
    salaryMin: 140000, salaryMax: 200000, currency: "USD",
    description: "We're looking for a senior Rust engineer to build our next-gen blockchain consensus layer. You'll work on high-performance distributed systems that process thousands of transactions per second.",
    requirements: ["5+ years Rust", "Distributed systems", "Blockchain protocols", "Async/concurrency", "Performance optimization"],
    benefits: ["Unlimited PTO", "Token equity", "Remote-first", "Learning budget $5k/yr", "Hardware allowance"],
    tags: ["Rust", "Blockchain", "Web3", "Systems"],
    postedAt: "Hace 2h", applicants: 47, featured: true, urgent: false,
  },
  {
    id: "j2", title: "ML Platform Engineer", company: JOB_COMPANIES[1],
    location: "San Francisco, CA", remote: false, type: "full-time", experience: "mid",
    salaryMin: 130000, salaryMax: 180000, currency: "USD",
    description: "Join our ML platform team to build infrastructure that powers quantum-inspired models. You'll design training pipelines, model serving, and monitoring systems at scale.",
    requirements: ["3+ years ML infrastructure", "Python / PyTorch", "Kubernetes", "CUDA/GPU optimization", "MLOps"],
    benefits: ["Equity package", "Conference budget", "Gym membership", "Free lunch", "Relocation assistance"],
    tags: ["Python", "ML", "Kubernetes", "GPU"],
    postedAt: "Hace 5h", applicants: 89, featured: true, urgent: true,
  },
  {
    id: "j3", title: "Full-Stack TypeScript Dev", company: JOB_COMPANIES[2],
    location: "Remote (EU)", remote: true, type: "full-time", experience: "mid",
    salaryMin: 80000, salaryMax: 120000, currency: "EUR",
    description: "Build developer-facing tools for our serverless edge platform. Work with Next.js, tRPC, and our custom edge runtime.",
    requirements: ["TypeScript", "React / Next.js", "Node.js", "PostgreSQL", "API design"],
    benefits: ["4-day work week", "Equity", "Remote EU", "Conference passes", "Co-working stipend"],
    tags: ["TypeScript", "React", "Next.js", "Edge"],
    postedAt: "Hace 1d", applicants: 34, featured: false, urgent: false,
  },
  {
    id: "j4", title: "Data Engineer — Spark/Scala", company: JOB_COMPANIES[3],
    location: "London, UK", remote: false, type: "full-time", experience: "senior",
    salaryMin: 90000, salaryMax: 130000, currency: "GBP",
    description: "Design and operate real-time data pipelines processing millions of events. Work with Apache Spark, Kafka, and our custom stream processing engine.",
    requirements: ["Apache Spark", "Scala or Java", "Kafka", "AWS/GCP", "Data modeling"],
    benefits: ["Pension scheme", "Stock options", "Flexible hours", "25 days PTO", "Home office budget"],
    tags: ["Scala", "Spark", "Kafka", "Data"],
    postedAt: "Hace 2d", applicants: 21, featured: false, urgent: false,
  },
  {
    id: "j5", title: "Solidity Smart Contract Dev", company: JOB_COMPANIES[4],
    location: "Remote (Global)", remote: true, type: "full-time", experience: "senior",
    salaryMin: 150000, salaryMax: 250000, currency: "USD",
    description: "Architect and audit DeFi protocols handling $100M+ in TVL. Deep expertise in EVM, gas optimization, and security patterns required.",
    requirements: ["Solidity", "EVM internals", "DeFi protocols", "Security auditing", "Foundry/Hardhat"],
    benefits: ["Token allocation", "Bug bounty bonus", "Remote-first", "Annual retreat", "Unlimited PTO"],
    tags: ["Solidity", "DeFi", "Web3", "Security"],
    postedAt: "Hace 3h", applicants: 63, featured: true, urgent: true,
  },
  {
    id: "j6", title: "Junior Frontend Developer", company: JOB_COMPANIES[2],
    location: "Berlin, DE", remote: false, type: "full-time", experience: "junior",
    salaryMin: 45000, salaryMax: 60000, currency: "EUR",
    description: "Perfect role for a motivated junior. Build beautiful UIs for our developer dashboard with modern React and Tailwind.",
    requirements: ["React", "TypeScript basics", "CSS/Tailwind", "Git", "Eagerness to learn"],
    benefits: ["Mentorship program", "Growth plan", "Team events", "Public transport pass", "Relocation support"],
    tags: ["React", "TypeScript", "CSS", "Junior"],
    postedAt: "Hace 4d", applicants: 112, featured: false, urgent: false,
  },
  {
    id: "j7", title: "DevOps / Platform Engineer", company: JOB_COMPANIES[1],
    location: "Remote (US)", remote: true, type: "full-time", experience: "lead",
    salaryMin: 170000, salaryMax: 240000, currency: "USD",
    description: "Lead our platform engineering team. Design and operate Kubernetes clusters, CI/CD pipelines, and observability stacks for 50+ microservices.",
    requirements: ["Kubernetes", "Terraform", "AWS/GCP", "Observability", "Team leadership"],
    benefits: ["Leadership equity", "Full remote US", "Executive coaching", "Unlimited PTO", "$10k learning budget"],
    tags: ["Kubernetes", "Terraform", "AWS", "Platform"],
    postedAt: "Hace 6h", applicants: 28, featured: true, urgent: false,
  },
  {
    id: "j8", title: "Flutter Mobile Developer", company: JOB_COMPANIES[3],
    location: "Remote (Global)", remote: true, type: "contract", experience: "mid",
    salaryMin: 80, salaryMax: 120, currency: "USD/h",
    description: "6-month contract to build a cross-platform mobile app for real-time data visualization. Flutter + Dart experience required.",
    requirements: ["Flutter", "Dart", "REST APIs", "State management", "Mobile UI/UX"],
    benefits: ["Flexible schedule", "Extension potential", "High daily rate", "Remote global"],
    tags: ["Flutter", "Dart", "Mobile", "Contract"],
    postedAt: "Hace 12h", applicants: 56, featured: false, urgent: false,
  },
  {
    id: "j9", title: "AI Research Intern", company: JOB_COMPANIES[1],
    location: "San Francisco, CA", remote: false, type: "internship", experience: "junior",
    salaryMin: 6000, salaryMax: 8000, currency: "USD/mo",
    description: "6-month paid internship working alongside our research team on novel neural architectures. Ideal for CS grad students.",
    requirements: ["Python", "PyTorch basics", "Linear algebra", "Research interest", "Enrolled in CS program"],
    benefits: ["Paid internship", "Mentorship", "Publication opportunity", "Conversion to FTE", "Free meals"],
    tags: ["Python", "AI", "Research", "Internship"],
    postedAt: "Hace 1d", applicants: 234, featured: false, urgent: true,
  },
  {
    id: "j10", title: "Go Backend Engineer", company: JOB_COMPANIES[0],
    location: "Remote (Global)", remote: true, type: "full-time", experience: "mid",
    salaryMin: 110000, salaryMax: 160000, currency: "USD",
    description: "Build high-performance microservices in Go for our blockchain indexer. Work on systems handling millions of on-chain events daily.",
    requirements: ["Go", "gRPC", "PostgreSQL", "Docker", "Event-driven architecture"],
    benefits: ["Token equity", "Remote-first", "Async culture", "Annual team retreat", "Health insurance"],
    tags: ["Go", "gRPC", "Microservices", "Blockchain"],
    postedAt: "Hace 8h", applicants: 41, featured: false, urgent: false,
  },
]

export const MOCK_APPLICATIONS: JobApplication[] = [
  { id: "a1", jobId: "j1", developerId: "u1", developerName: "Sarah Chen", developerHandle: "@sarah_codes", developerInitials: "SC", developerColor: "#c49aff", developerBg: "rgba(196,154,255,.15)", status: "shortlisted", appliedAt: "Hace 1d", coverLetter: "5+ years Rust experience, contributed to Solana core.", portfolio: "github.com/sarahchen" },
  { id: "a2", jobId: "j1", developerId: "u2", developerName: "Alex Rivet", developerHandle: "@alex_rivet", developerInitials: "AR", developerColor: "#ff94a8", developerBg: "rgba(255,148,168,.15)", status: "pending", appliedAt: "Hace 3h", coverLetter: "Systems engineer with blockchain background.", portfolio: "alexrivet.dev" },
  { id: "a3", jobId: "j2", developerId: "u3", developerName: "Dev Guru", developerHandle: "@dev_guru", developerInitials: "DG", developerColor: "#60a5fa", developerBg: "rgba(96,165,250,.12)", status: "interview", appliedAt: "Hace 2d", coverLetter: "ML infra engineer at FAANG, 4 yrs experience.", portfolio: "github.com/devguru" },
  { id: "a4", jobId: "j5", developerId: "u4", developerName: "oxide_dev", developerHandle: "@oxide_dev", developerInitials: "OD", developerColor: "#4ade80", developerBg: "rgba(74,222,128,.12)", status: "reviewed", appliedAt: "Hace 1d", coverLetter: "Audited $500M+ in DeFi protocols. Solidity expert.", portfolio: "oxide-security.io" },
  { id: "a5", jobId: "j3", developerId: "u5", developerName: "frontend_queen", developerHandle: "@frontend_queen", developerInitials: "FQ", developerColor: "#f59e0b", developerBg: "rgba(245,158,11,.12)", status: "pending", appliedAt: "Hace 5h", coverLetter: "Full-stack TS dev, 3 years Next.js.", portfolio: "frontendqueen.dev" },
]

export const MOCK_DASHBOARD_STATS: CompanyDashboardStats = {
  totalJobs: 8, activeJobs: 5, totalApplicants: 342, shortlisted: 28, interviews: 12, hired: 7,
}

export const PREMIUM_FEATURES: PremiumFeature[] = [
  { id: "pf1", name: "Empleo Destacado", description: "Tu oferta aparece en la parte superior con badge premium y mayor visibilidad.", icon: "star", category: "visibility", popular: true },
  { id: "pf2", name: "Match Inteligente con IA", description: "Algoritmo que sugiere automáticamente los candidatos ideales para cada puesto.", icon: "brain", category: "tools", popular: true },
  { id: "pf3", name: "Analytics Profundo", description: "Métricas detalladas: vistas, tiempo de lectura, tasa de conversión, fuente de tráfico.", icon: "chart", category: "analytics", popular: true },
  { id: "pf4", name: "Filtro de Candidatos Premium", description: "Filtra por skills, experiencia, salario期望, disponibilidad y más criterios avanzados.", icon: "filter", category: "tools" },
  { id: "pf5", name: "Badge Empresa Verificada", description: "Sello de verificación que genera confianza y aumenta la tasa de aplicación un 40%.", icon: "shield", category: "visibility" },
  { id: "pf6", name: "Messaging Directo", description: "Contacta candidatos directamente sin esperar a que se postulen. Outreach proactivo.", icon: "message", category: "tools" },
  { id: "pf7", name: "Dashboard de Reclutamiento", description: "Kanban board para gestionar el pipeline de candidatos de cada vacante.", icon: "kanban", category: "tools" },
  { id: "pf8", name: "Publicación Ilimitada", description: "Sin límite de ofertas activas. Las cuentas free solo permiten 2 publicaciones.", icon: "infinity", category: "support" },
  { id: "pf9", name: "Reporte Salarial del Mercado", description: "Datos en tiempo real de cómo se comparan tus ofertas con el mercado tech.", icon: "dollar", category: "analytics" },
  { id: "pf10", name: "Integración ATS", description: "Conecta con Greenhouse, Lever, Ashby y otros ATS populares automáticamente.", icon: "plug", category: "tools" },
  { id: "pf11", name: "Soporte Prioritario", description: "Respuesta en menos de 2 horas. Account manager dedicado para empresas enterprise.", icon: "headset", category: "support" },
  { id: "pf12", name: "Info Personal Protegida", description: "Sin Premium, tu información de contacto y datos personales están ocultos. Solo se ven publicaciones y perfil público.", icon: "shield", category: "visibility", popular: true },
]

export const SALARY_RANGES: Record<string, { min: number; max: number; currency: string }> = {
  junior:  { min: 40000, max: 70000, currency: "USD" },
  mid:     { min: 80000, max: 140000, currency: "USD" },
  senior:  { min: 120000, max: 220000, currency: "USD" },
  lead:    { min: 150000, max: 280000, currency: "USD" },
  executive: { min: 200000, max: 400000, currency: "USD" },
}
