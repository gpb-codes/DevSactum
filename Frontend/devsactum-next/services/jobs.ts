import { apiNestjs } from "@/lib/api"
import type { JobListing, JobApplication, CompanyDashboardStats, JobType, ExperienceLevel } from "@/types"

interface JobListResponse {
  jobs: JobListing[]
  total: number
  page: number
  pages: number
}

interface ApplicationListResponse {
  applications: JobApplication[]
  total: number
}

export const jobService = {
  list: (params?: { type?: JobType; experience?: ExperienceLevel; remote?: boolean; search?: string; page?: number }) =>
    apiNestjs.get<JobListResponse>("/jobs", { params: params as Record<string, string> }),

  getById: (id: string) =>
    apiNestjs.get<JobListing>(`/jobs/${id}`),

  create: (data: Omit<JobListing, "id" | "applicants" | "postedAt">) =>
    apiNestjs.post<JobListing>("/jobs", data),

  update: (id: string, data: Partial<JobListing>) =>
    apiNestjs.patch<JobListing>(`/jobs/${id}`, data),

  delete: (id: string) =>
    apiNestjs.delete<void>(`/jobs/${id}`),

  apply: (jobId: string, data: { coverLetter: string; portfolio: string }) =>
    apiNestjs.post<JobApplication>(`/jobs/${jobId}/apply`, data),

  getApplications: (jobId: string) =>
    apiNestjs.get<ApplicationListResponse>(`/jobs/${jobId}/applications`),

  updateApplicationStatus: (applicationId: string, status: JobApplication["status"]) =>
    apiNestjs.patch<JobApplication>(`/applications/${applicationId}`, { status }),

  getDashboardStats: () =>
    apiNestjs.get<CompanyDashboardStats>("/company/dashboard"),

  getCompanyJobs: () =>
    apiNestjs.get<JobListing[]>("/company/jobs"),

  bookmark: (jobId: string) =>
    apiNestjs.post<void>(`/jobs/${jobId}/bookmark`),

  unbookmark: (jobId: string) =>
    apiNestjs.delete<void>(`/jobs/${jobId}/bookmark`),

  getBookmarks: () =>
    apiNestjs.get<JobListing[]>("/jobs/bookmarks"),
}
