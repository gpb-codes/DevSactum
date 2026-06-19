import { ReputationService } from './reputation.service';
export declare class ReputationController {
    private readonly reputationService;
    constructor(reputationService: ReputationService);
    getUserReputation(userId: string): Promise<{
        reputation: number;
    }>;
    getHistory(userId: string, limit?: string): Promise<{
        events: import("./profile.entity").ReputationEvent[];
    }>;
    getLeaderboard(limit?: string): Promise<{
        leaderboard: import("./profile.entity").Profile[];
    }>;
    addEvent(data: {
        userId: string;
        points: number;
        reason: string;
    }): Promise<{
        event: import("./profile.entity").ReputationEvent;
    }>;
}
