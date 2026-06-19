import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
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
        token: string;
    }>;
    register(data: any): Promise<{
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
        token: string;
    }>;
}
