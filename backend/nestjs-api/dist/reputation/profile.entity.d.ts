import { User } from '../users/user.entity';
export declare class Profile {
    id: string;
    userId: string;
    stack: string[];
    level: string;
    githubUsername: string;
    website: string;
    reputationScore: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
export declare class ReputationEvent {
    id: string;
    userId: string;
    points: number;
    reason: string;
    createdAt: Date;
    user: User;
}
