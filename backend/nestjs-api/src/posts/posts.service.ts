import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(data: Partial<Post>): Promise<Post> {
    const post = this.postsRepository.create(data);
    return this.postsRepository.save(post);
  }

  async findById(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async feed(limit = 20, offset = 0): Promise<Post[]> {
    return this.postsRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['user'],
    });
  }

  async findByUser(userId: string, limit = 20, offset = 0): Promise<Post[]> {
    return this.postsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['user'],
    });
  }

  async findByTag(tag: string, limit = 20, offset = 0): Promise<Post[]> {
    const query = this.postsRepository.createQueryBuilder('post');
    query.where("post.tags LIKE :tag", { tag: `%${tag}%` });
    query.orderBy('post.created_at', 'DESC');
    query.take(limit);
    query.skip(offset);
    query.leftJoinAndSelect('post.user', 'user');
    return query.getMany();
  }

  async like(id: string): Promise<Post> {
    const post = await this.findById(id);
    post.likesCount += 1;
    return this.postsRepository.save(post);
  }

  async unlike(id: string): Promise<Post> {
    const post = await this.findById(id);
    post.likesCount = Math.max(0, post.likesCount - 1);
    return this.postsRepository.save(post);
  }

  async delete(id: string): Promise<void> {
    const post = await this.findById(id);
    await this.postsRepository.remove(post);
  }
}
