import { describe, it, expect } from "vitest"

describe("Community Service", () => {
  it("communityService has required methods", async () => {
    const { communityService } = await import("@/services/communities")
    expect(typeof communityService.list).toBe("function")
    expect(typeof communityService.getById).toBe("function")
    expect(typeof communityService.create).toBe("function")
    expect(typeof communityService.join).toBe("function")
    expect(typeof communityService.leave).toBe("function")
  })
})

describe("Reputation Service", () => {
  it("reputationService has required methods", async () => {
    const { reputationService } = await import("@/services/reputation")
    expect(typeof reputationService.getLeaderboard).toBe("function")
    expect(typeof reputationService.getProfile).toBe("function")
    expect(typeof reputationService.getHistory).toBe("function")
  })
})

describe("Messages Service", () => {
  it("messageService has required methods", async () => {
    const { messageService } = await import("@/services/messages")
    expect(typeof messageService.send).toBe("function")
    expect(typeof messageService.getDirect).toBe("function")
    expect(typeof messageService.getCommunity).toBe("function")
    expect(typeof messageService.getUnreadCount).toBe("function")
    expect(typeof messageService.markAsRead).toBe("function")
  })
})
