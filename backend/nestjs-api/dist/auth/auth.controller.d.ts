import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(data: LoginDto): Promise<{
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
    register(data: RegisterDto): Promise<{
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
