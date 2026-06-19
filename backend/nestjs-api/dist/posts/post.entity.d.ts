import { User } from '../users/user.entity';
export declare class Post {
    id: string;
    userId: string;
    content: string;
    code: string;
    tags: string[];
    likesCount: number;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
