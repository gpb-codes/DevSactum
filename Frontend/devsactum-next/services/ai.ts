import { api } from "@/lib/api"

export interface AIMatch {
  developerId: string
  developerName: string
  developerHandle: string
  developerInitials: string
  developerColor: string
  developerBg: string
  score: number
  reasons: string[]
  skills: string[]
  experience: string
  availability: "immediate" | "2-weeks" | "1-month" | "negotiable"
  salaryExpectation: { min: number; max: number; currency: string }
}

export interface AIJobRecommendation {
  jobId: string
  jobTitle: string
  companyName: string
  companyInitials: string
  companyColor: string
  companyBg: string
  matchScore: number
  matchReasons: string[]
  salaryMatch: boolean
  locationMatch: boolean
  skillGap: string[]
}

export interface AIResumeAnalysis {
  overallScore: number
  sections: {
    skills: { score: number; found: string[]; missing: string[] }
    experience: { score: number; years: number; level: string }
    education: { score: number; degree: string; institution: string }
    projects: { score: number; count: number; highlights: string[] }
    keywords: { score: number; matched: string[]; density: number }
  }
  suggestions: string[]
  atsScore: number
  atsIssues: string[]
}

export interface AISkillGap {
  currentSkills: string[]
  targetRole: string
  requiredSkills: string[]
  matchingSkills: string[]
  gapSkills: string[]
  recommendations: { skill: string; priority: "high" | "medium" | "low"; resources: string[] }[]
}

export interface AICompanyInsight {
  companyId: string
  hiringTrend: "growing" | "stable" | "declining"
  avgSalary: number
  topSkills: string[]
  competitorAnalysis: { company: string; avgSalary: number; openPositions: number }[]
  bestTimeToApply: string
  cultureMatch: number
}

export interface VoltagentConfig {
  apiKey: string
  model?: string
  temperature?: number
  maxTokens?: number
}

const VOLTAGENT_API = process.env.NEXT_PUBLIC_VOLTAGENT_API || "https://api.voltagent.dev/v1"

function getVoltagentHeaders(): Record<string, string> {
  const key = typeof window !== "undefined" ? localStorage.getItem("ds-voltagent-key") : null
  return {
    "Content-Type": "application/json",
    ...(key ? { Authorization: `Bearer ${key}` } : {}),
  }
}

async function voltagentRequest<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${VOLTAGENT_API}${path}`, {
    method: "POST",
    headers: getVoltagentHeaders(),
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Voltagent API error: ${response.status}`)
  return response.json()
}

export const aiService = {
  matchDevelopers: (jobId: string, topK?: number) =>
    ai.matchJobCandidates(jobId, topK),

  matchJobs: (developerId: string, topK?: number) =>
    ai.matchDeveloperJobs(developerId, topK),

  analyzeResume: (resumeText: string, targetRole?: string) =>
    ai.analyzeResume(resumeText, targetRole),

  analyzeSkillGap: (currentSkills: string[], targetRole: string) =>
    ai.analyzeSkillGap(currentSkills, targetRole),

  getCompanyInsights: (companyId: string) =>
    ai.getCompanyInsights(companyId),

  generateJobDescription: (params: { title: string; company: string; requirements: string[] }) =>
    ai.generateJobDescription(params),
}

const ai = {
  matchJobCandidates: async (jobId: string, topK = 10): Promise<AIMatch[]> => {
    try {
      const data = await voltagentRequest<{ matches: AIMatch[] }>("/agents/match/candidates", { jobId, topK })
      return data.matches
    } catch {
      return generateMockMatches()
    }
  },

  matchDeveloperJobs: async (developerId: string, topK = 10): Promise<AIJobRecommendation[]> => {
    try {
      const data = await voltagentRequest<{ recommendations: AIJobRecommendation[] }>("/agents/match/jobs", { developerId, topK })
      return data.recommendations
    } catch {
      return generateMockJobRecommendations()
    }
  },

  analyzeResume: async (resumeText: string, targetRole?: string): Promise<AIResumeAnalysis> => {
    try {
      const data = await voltagentRequest<{ analysis: AIResumeAnalysis }>("/agents/analyze/resume", { resumeText, targetRole })
      return data.analysis
    } catch {
      return generateMockResumeAnalysis()
    }
  },

  analyzeSkillGap: async (currentSkills: string[], targetRole: string): Promise<AISkillGap> => {
    try {
      const data = await voltagentRequest<{ gap: AISkillGap }>("/agents/analyze/skill-gap", { currentSkills, targetRole })
      return data.gap
    } catch {
      return generateMockSkillGap(currentSkills, targetRole)
    }
  },

  getCompanyInsights: async (companyId: string): Promise<AICompanyInsight> => {
    try {
      const data = await voltagentRequest<{ insight: AICompanyInsight }>("/agents/insights/company", { companyId })
      return data.insight
    } catch {
      return generateMockCompanyInsight(companyId)
    }
  },

  generateJobDescription: async (params: { title: string; company: string; requirements: string[] }): Promise<string> => {
    try {
      const data = await voltagentRequest<{ description: string }>("/agents/generate/job-description", params)
      return data.description
    } catch {
      return `Buscamos un/a ${params.title} talentoso/a para unirse a ${params.company}. Requisitos: ${params.requirements.join(", ")}.`
    }
  },
}

function generateMockMatches(): AIMatch[] {
  return [
    { developerId: "u1", developerName: "Sarah Chen", developerHandle: "@sarah_codes", developerInitials: "SC", developerColor: "#c49aff", developerBg: "rgba(196,154,255,.15)", score: 94, reasons: ["5+ años Rust experience", "Blockchain contributor", "Distributed systems background"], skills: ["Rust", "Go", "Blockchain", "Docker"], experience: "Senior", availability: "immediate", salaryExpectation: { min: 140000, max: 200000, currency: "USD" } },
    { developerId: "u2", developerName: "Alex Rivet", developerHandle: "@alex_rivet", developerInitials: "AR", developerColor: "#ff94a8", developerBg: "rgba(255,148,168,.15)", score: 87, reasons: ["Systems engineering background", "Open source contributions", "Strong problem solving"], skills: ["Rust", "C++", "Linux", "Networking"], experience: "Senior", availability: "2-weeks", salaryExpectation: { min: 120000, max: 170000, currency: "USD" } },
    { developerId: "u3", developerName: "Dev Guru", developerHandle: "@dev_guru", developerInitials: "DG", developerColor: "#60a5fa", developerBg: "rgba(96,165,250,.12)", score: 82, reasons: ["Web3 developer", "Smart contract experience", "Community leader"], skills: ["Solidity", "Rust", "TypeScript", "React"], experience: "Mid-Senior", availability: "1-month", salaryExpectation: { min: 100000, max: 160000, currency: "USD" } },
    { developerId: "u4", developerName: "oxide_dev", developerHandle: "@oxide_dev", developerInitials: "OD", developerColor: "#4ade80", developerBg: "rgba(74,222,128,.12)", score: 78, reasons: ["Security auditing expertise", "DeFi protocol knowledge", "Bug bounty hunter"], skills: ["Solidity", "Security", "Foundry", "Python"], experience: "Senior", availability: "immediate", salaryExpectation: { min: 130000, max: 190000, currency: "USD" } },
    { developerId: "u5", developerName: "frontend_queen", developerHandle: "@frontend_queen", developerInitials: "FQ", developerColor: "#f59e0b", developerBg: "rgba(245,158,11,.12)", score: 71, reasons: ["Full-stack capabilities", "Fast learner", "Strong portfolio"], skills: ["TypeScript", "React", "Node.js", "PostgreSQL"], experience: "Mid", availability: "negotiable", salaryExpectation: { min: 80000, max: 120000, currency: "USD" } },
  ]
}

function generateMockJobRecommendations(): AIJobRecommendation[] {
  return [
    { jobId: "j1", jobTitle: "Senior Rust Engineer", companyName: "NexusLabs", companyInitials: "NL", companyColor: "#c49aff", companyBg: "rgba(196,154,255,.15)", matchScore: 95, matchReasons: ["Perfect skill match", "Remote preference aligned", "Salary in range"], salaryMatch: true, locationMatch: true, skillGap: [] },
    { jobId: "j5", jobTitle: "Solidity Smart Contract Dev", companyName: "CryptoNest", companyInitials: "CN", companyColor: "#f59e0b", companyBg: "rgba(245,158,11,.12)", matchScore: 88, matchReasons: ["Strong security background", "DeFi experience", "High salary match"], salaryMatch: true, locationMatch: true, skillGap: ["EVM internals"] },
    { jobId: "j10", jobTitle: "Go Backend Engineer", companyName: "NexusLabs", companyInitials: "NL", companyColor: "#c49aff", companyBg: "rgba(196,154,255,.15)", matchScore: 82, matchReasons: ["Go experience", "Backend focus", "Remote"], salaryMatch: true, locationMatch: true, skillGap: ["gRPC", "Event-driven"] },
    { jobId: "j2", jobTitle: "ML Platform Engineer", companyName: "QuantumForge", companyInitials: "QF", companyColor: "#ff94a8", companyBg: "rgba(255,148,168,.15)", matchScore: 74, matchReasons: ["Infrastructure skills transferable", "High salary"], salaryMatch: true, locationMatch: false, skillGap: ["Python", "PyTorch", "Kubernetes"] },
  ]
}

function generateMockResumeAnalysis(): AIResumeAnalysis {
  return {
    overallScore: 87,
    sections: {
      skills: { score: 92, found: ["Rust", "Go", "TypeScript", "Docker", "Kubernetes", "PostgreSQL"], missing: ["GraphQL", "Redis"] },
      experience: { score: 88, years: 6, level: "Senior" },
      education: { score: 80, degree: "B.S. Computer Science", institution: "MIT" },
      projects: { score: 90, count: 12, highlights: ["Open source contributor", "12k GitHub stars", "Published papers"] },
      keywords: { score: 85, matched: ["distributed systems", "microservices", "cloud native", "CI/CD"], density: 0.78 },
    },
    suggestions: [
      "Add more quantifiable achievements (metrics, numbers)",
      "Include GraphQL experience if applicable",
      "Add a section for certifications (AWS, GCP)",
      "Highlight leadership and mentoring experience",
    ],
    atsScore: 91,
    atsIssues: ["Consider using standard section headers", "Add more industry keywords"],
  }
}

function generateMockSkillGap(currentSkills: string[], targetRole: string): AISkillGap {
  const roleSkills: Record<string, string[]> = {
    "Senior Rust Engineer": ["Rust", "Async Runtime", "Systems Programming", "Wasm", "Performance Optimization"],
    "ML Platform Engineer": ["Python", "PyTorch", "TensorFlow", "Kubernetes", "CUDA", "MLOps"],
    "Full-Stack Developer": ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
    "DevOps Engineer": ["Docker", "Kubernetes", "Terraform", "AWS/GCP", "CI/CD", "Monitoring"],
  }
  const required = roleSkills[targetRole] || roleSkills["Senior Rust Engineer"]
  const matching = currentSkills.filter(s => required.some(r => r.toLowerCase().includes(s.toLowerCase())))
  const gap = required.filter(r => !matching.some(m => m.toLowerCase().includes(r.toLowerCase())))

  return {
    currentSkills,
    targetRole,
    requiredSkills: required,
    matchingSkills: matching,
    gapSkills: gap,
    recommendations: gap.map(skill => ({
      skill,
      priority: "high" as const,
      resources: [`https://roadmap.sh/${skill.toLowerCase()}`, `Coursera: ${skill} Specialization`],
    })),
  }
}

function generateMockCompanyInsight(companyId: string): AICompanyInsight {
  return {
    companyId,
    hiringTrend: "growing",
    avgSalary: 145000,
    topSkills: ["Rust", "Go", "TypeScript", "Kubernetes", "AWS"],
    competitorAnalysis: [
      { company: "QuantumForge", avgSalary: 155000, openPositions: 12 },
      { company: "VoidStack", avgSalary: 120000, openPositions: 5 },
      { company: "HelixData", avgSalary: 130000, openPositions: 8 },
    ],
    bestTimeToApply: "Enero-Marzo (Q1 hiring surge)",
    cultureMatch: 85,
  }
}
