import 'reflect-metadata'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { NotFoundException } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Post } from './entities/post.entity'

vi.mock('./entities/post.entity', () => ({
  Post: class PostMock {},
}))

describe('PostsService', () => {
  let service: PostsService

  const mockPostRepo = {
    findAndCount: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getRepositoryToken(Post), useValue: mockPostRepo },
      ],
    }).compile()

    service = module.get<PostsService>(PostsService)
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return posts', async () => {
      mockPostRepo.findAndCount.mockResolvedValue([[{ id: '1' }], 1])
      const result = await service.findAll(10, 0)
      expect(result.posts).toHaveLength(1)
      expect(result.total).toBe(1)
    })
  })

  describe('findOne', () => {
    it('should throw if not found', async () => {
      mockPostRepo.findOne.mockResolvedValue(null)
      await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException)
    })
  })
})
