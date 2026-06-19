import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(data: CreatePostDto, req: any): Promise<{
        post: import("./post.entity").Post;
    }>;
    feed(limit?: string, offset?: string): Promise<{
        posts: import("./post.entity").Post[];
    }>;
    findByUser(userId: string, limit?: string, offset?: string): Promise<{
        posts: import("./post.entity").Post[];
    }>;
    findByTag(tag: string, limit?: string, offset?: string): Promise<{
        posts: import("./post.entity").Post[];
    }>;
    findOne(id: string): Promise<{
        post: import("./post.entity").Post;
    }>;
    like(id: string): Promise<{
        post: import("./post.entity").Post;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
