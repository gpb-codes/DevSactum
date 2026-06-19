import { describe, it, expect } from "vitest"
import { ApiError } from "@/lib/api"

describe("API Client", () => {
  it("apiGo is defined", async () => {
    const { apiGo } = await import("@/lib/api")
    expect(apiGo).toBeDefined()
    expect(typeof apiGo.get).toBe("function")
    expect(typeof apiGo.post).toBe("function")
    expect(typeof apiGo.put).toBe("function")
    expect(typeof apiGo.patch).toBe("function")
    expect(typeof apiGo.delete).toBe("function")
  })

  it("apiNestjs is defined", async () => {
    const { apiNestjs } = await import("@/lib/api")
    expect(apiNestjs).toBeDefined()
    expect(typeof apiNestjs.get).toBe("function")
    expect(typeof apiNestjs.post).toBe("function")
  })

  it("api alias points to apiGo", async () => {
    const { api, apiGo } = await import("@/lib/api")
    expect(api).toBe(apiGo)
  })

  it("ApiError has correct properties", () => {
    const err = new ApiError("test error", 404, { detail: "not found" })
    expect(err.message).toBe("test error")
    expect(err.status).toBe(404)
    expect(err.data).toEqual({ detail: "not found" })
    expect(err.name).toBe("ApiError")
  })

  it("ApiError extends Error", () => {
    const err = new ApiError("test", 500, null)
    expect(err instanceof Error).toBe(true)
  })
})
