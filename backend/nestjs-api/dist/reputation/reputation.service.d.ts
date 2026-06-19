import { Repository } from 'typeorm';
import { Profile, ReputationEvent } from './profile.entity';
export declare class ReputationService {
    private profilesRepository;
    private eventsRepository;
    constructor(profilesRepository: Repository<Profile>, eventsRepository: Repository<ReputationEvent>);
    getUserReputation(userId: string): Promise<number>;
    getHistory(userId: string, limit?: number): Promise<ReputationEvent[]>;
    getLeaderboard(limit?: number): Promise<Profile[]>;
    addEvent(userId: string, points: number, reason: string): Promise<ReputationEvent>;
}
