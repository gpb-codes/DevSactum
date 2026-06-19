import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/community.dto';
export declare class CommunitiesController {
    private readonly communitiesService;
    constructor(communitiesService: CommunitiesService);
    create(data: CreateCommunityDto, req: any): Promise<{
        community: import("./community.entity").Community;
    }>;
    findAll(limit?: string, offset?: string): Promise<{
        communities: import("./community.entity").Community[];
    }>;
    findOne(id: string): Promise<{
        community: import("./community.entity").Community;
    }>;
    join(id: string, req: any): Promise<{
        message: string;
    }>;
    leave(id: string, req: any): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
