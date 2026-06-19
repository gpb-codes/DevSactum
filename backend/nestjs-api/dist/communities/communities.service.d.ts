import { Repository } from 'typeorm';
import { Community, CommunityMember } from './community.entity';
export declare class CommunitiesService {
    private communitiesRepository;
    private membersRepository;
    constructor(communitiesRepository: Repository<Community>, membersRepository: Repository<CommunityMember>);
    create(data: Partial<Community>, userId: string): Promise<Community>;
    findById(id: string): Promise<Community>;
    findAll(limit?: number, offset?: number): Promise<Community[]>;
    join(communityId: string, userId: string): Promise<void>;
    leave(communityId: string, userId: string): Promise<void>;
    isMember(communityId: string, userId: string): Promise<boolean>;
    delete(id: string): Promise<void>;
}
