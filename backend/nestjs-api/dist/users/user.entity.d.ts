import { Profile } from '../reputation/profile.entity';
export declare class User {
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
    profile: Profile;
}
