import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    send(data: CreateMessageDto, req: any): Promise<{
        message: import("./message.entity").Message;
    }>;
    getDirectMessages(userId1: string, userId2: string, limit?: string, offset?: string): Promise<{
        messages: import("./message.entity").Message[];
    }>;
    getCommunityMessages(communityId: string, limit?: string, offset?: string): Promise<{
        messages: import("./message.entity").Message[];
    }>;
    getUnreadCount(userId: string): Promise<{
        unread_count: number;
    }>;
    markAsRead(id: string): Promise<{
        message: string;
    }>;
}
