import { describe, it, expect } from "vitest"

describe("Utils", () => {
  it("formatCount formats thousands", async () => {
    const { formatCount } = await import("@/lib/utils")
    expect(formatCount(1200)).toBe("1.2k")
    expect(formatCount(1000000)).toBe("1M")
    expect(formatCount(500)).toBe("500")
  })

  it("timeAgo returns relative time", async () => {
    const { timeAgo } = await import("@/lib/utils")
    expect(timeAgo(new Date())).toBe("ahora")
  })

  it("truncate truncates with ellipsis", async () => {
    const { truncate } = await import("@/lib/utils")
    expect(truncate("Hello World", 5)).toBe("Hello…")
    expect(truncate("Hi", 10)).toBe("Hi")
  })

  it("getInitials extracts first two letters", async () => {
    const { getInitials } = await import("@/lib/utils")
    expect(getInitials("Alex Volkov")).toBe("AV")
    expect(getInitials("Single")).toBe("S")
  })

  it("capitalize capitalizes first letter", async () => {
    const { capitalize } = await import("@/lib/utils")
    expect(capitalize("hello")).toBe("Hello")
  })

  it("uid returns a string", async () => {
    const { uid } = await import("@/lib/utils")
    expect(typeof uid()).toBe("string")
    expect(uid().length).toBeGreaterThan(0)
  })
})

describe("Validation", () => {
  it("validateEmail accepts valid emails", async () => {
    const { validateEmail } = await import("@/lib/validation")
    expect(validateEmail("test@example.com")).toBeNull()
  })

  it("validateEmail rejects invalid emails", async () => {
    const { validateEmail } = await import("@/lib/validation")
    expect(validateEmail("")).toBeTruthy()
    expect(validateEmail("notanemail")).toBeTruthy()
  })

  it("validatePassword requires 8 chars", async () => {
    const { validatePassword } = await import("@/lib/validation")
    expect(validatePassword("short")).toBeTruthy()
    expect(validatePassword("longpassword")).toBeNull()
  })

  it("validateName requires 2 chars", async () => {
    const { validateName } = await import("@/lib/validation")
    expect(validateName("A")).toBeTruthy()
    expect(validateName("Alex")).toBeNull()
  })

  it("getPasswordStrength returns score", async () => {
    const { getPasswordStrength } = await import("@/lib/validation")
    const weak = getPasswordStrength("abc")
    const strong = getPasswordStrength("Str0ng!Pass")
    expect(strong.score).toBeGreaterThan(weak.score)
  })
})
