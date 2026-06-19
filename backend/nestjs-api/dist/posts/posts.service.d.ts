import { Repository } from 'typeorm';
import { Post } from './post.entity';
export declare class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Post>);
    create(data: Partial<Post>): Promise<Post>;
    findById(id: string): Promise<Post>;
    feed(limit?: number, offset?: number): Promise<Post[]>;
    findByUser(userId: string, limit?: number, offset?: number): Promise<Post[]>;
    findByTag(tag: string, limit?: number, offset?: number): Promise<Post[]>;
    like(id: string): Promise<Post>;
    unlike(id: string): Promise<Post>;
    delete(id: string): Promise<void>;
}
