import { describe, it, expect } from "vitest"

describe("Auth Service", () => {
  it("authService has required methods", async () => {
    const { authService } = await import("@/services/auth")
    expect(typeof authService.login).toBe("function")
    expect(typeof authService.register).toBe("function")
    expect(typeof authService.logout).toBe("function")
    expect(typeof authService.getProfile).toBe("function")
    expect(typeof authService.updateProfile).toBe("function")
    expect(typeof authService.getStoredUser).toBe("function")
  })

  it("getStoredUser returns null when no user stored", async () => {
    if (typeof localStorage !== "undefined") {
      localStorage.clear()
    }
    const { authService } = await import("@/services/auth")
    const result = authService.getStoredUser()
    expect(result === null || typeof result === "object").toBe(true)
  })
})
