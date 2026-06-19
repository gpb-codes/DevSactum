import { User } from '../users/user.entity';
import { Community } from '../communities/community.entity';
export declare class Message {
    id: string;
    senderId: string;
    receiverId: string;
    communityId: string;
    content: string;
    isRead: boolean;
    createdAt: Date;
    sender: User;
    receiver: User;
    community: Community;
}
