import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from './entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async findAll(limit = 20, offset = 0) {
    const [posts, total] = await this.postRepo.findAndCount({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    })
    return { posts, total }
  }

  async findOne(id: string) {
    const post = await this.postRepo.findOne({ where: { id } })
    if (!post) throw new NotFoundException('Post not found')
    return { post }
  }

  async create(dto: CreatePostDto, userId: string) {
    const post = this.postRepo.create({
      ...dto,
      userId,
    })
    await this.postRepo.save(post)
    return { post }
  }

  async findByUser(userId: string, limit = 20, offset = 0) {
    const [posts, total] = await this.postRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    })
    return { posts, total }
  }

  async findByTag(tag: string, limit = 20, offset = 0) {
    const [posts, total] = await this.postRepo.findAndCount({
      where: { tags: tag },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    })
    return { posts, total }
  }

  async like(id: string) {
    const post = await this.postRepo.findOne({ where: { id } })
    if (!post) throw new NotFoundException('Post not found')
    post.likesCount += 1
    await this.postRepo.save(post)
    return { post }
  }

  async delete(id: string) {
    const result = await this.postRepo.delete(id)
    if (result.affected === 0) throw new NotFoundException('Post not found')
  }
}
