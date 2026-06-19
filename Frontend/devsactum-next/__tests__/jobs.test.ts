import { describe, it, expect } from "vitest"

describe("Job Service", () => {
  it("jobService has required methods", async () => {
    const { jobService } = await import("@/services/jobs")
    expect(typeof jobService.list).toBe("function")
    expect(typeof jobService.getById).toBe("function")
    expect(typeof jobService.create).toBe("function")
    expect(typeof jobService.update).toBe("function")
    expect(typeof jobService.delete).toBe("function")
    expect(typeof jobService.apply).toBe("function")
    expect(typeof jobService.getApplications).toBe("function")
    expect(typeof jobService.updateApplicationStatus).toBe("function")
    expect(typeof jobService.getDashboardStats).toBe("function")
    expect(typeof jobService.getCompanyJobs).toBe("function")
    expect(typeof jobService.bookmark).toBe("function")
    expect(typeof jobService.unbookmark).toBe("function")
    expect(typeof jobService.getBookmarks).toBe("function")
  })
})
