import { User } from '../users/user.entity';
export declare class Community {
    id: string;
    name: string;
    description: string;
    icon: string;
    memberCount: number;
    isFeatured: boolean;
    createdAt: Date;
}
export declare class CommunityMember {
    id: string;
    communityId: string;
    userId: string;
    role: string;
    joinedAt: Date;
    community: Community;
    user: User;
}
