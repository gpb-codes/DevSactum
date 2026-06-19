import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(data: Partial<User> & {
        password?: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
            displayName: string;
            avatarUrl: string;
            bio: string;
            createdAt: Date;
            updatedAt: Date;
            profile: import("../reputation/profile.entity").Profile;
        };
    }>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
            displayName: string;
            avatarUrl: string;
            bio: string;
            createdAt: Date;
            updatedAt: Date;
            profile: import("../reputation/profile.entity").Profile;
        };
    }>;
    update(id: string, data: Partial<User>): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
            displayName: string;
            avatarUrl: string;
            bio: string;
            createdAt: Date;
            updatedAt: Date;
            profile: import("../reputation/profile.entity").Profile;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
