import { describe, it, expect } from "vitest"

describe("Post Service", () => {
  it("postService has required methods", async () => {
    const { postService } = await import("@/services/posts")
    expect(typeof postService.getFeed).toBe("function")
    expect(typeof postService.getById).toBe("function")
    expect(typeof postService.create).toBe("function")
    expect(typeof postService.like).toBe("function")
    expect(typeof postService.delete).toBe("function")
    expect(typeof postService.getByUser).toBe("function")
    expect(typeof postService.getByTag).toBe("function")
  })
})
