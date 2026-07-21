import 'reflect-metadata'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { ConflictException, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from './entities/user.entity'

vi.mock('./entities/user.entity', () => ({
  User: class UserMock {},
}))

describe('AuthService', () => {
  let service: AuthService

  const mockUserRepo = {
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
  }

  const mockJwtService = {
    sign: vi.fn().mockReturnValue('test-token'),
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('register', () => {
    const dto = {
      email: 'test@test.com',
      username: 'testuser',
      password: '123456',
      displayName: 'Test User',
    }

    it('should create a user', async () => {
      mockUserRepo.findOne.mockResolvedValue(null)
      mockUserRepo.create.mockReturnValue({ id: '1', ...dto })
      mockUserRepo.save.mockResolvedValue({ id: '1', ...dto })

      const result = await service.register(dto)
      expect(result.user).toBeDefined()
      expect(result.user.email).toBe('test@test.com')
    })

    it('should throw if email exists', async () => {
      mockUserRepo.findOne.mockResolvedValue({ id: '1' })
      await expect(service.register(dto)).rejects.toThrow(ConflictException)
    })
  })

  describe('login', () => {
    it('should throw on invalid credentials', async () => {
      mockUserRepo.findOne.mockResolvedValue(null)
      await expect(service.login({ email: 'test@test.com', password: 'wrong' }))
        .rejects.toThrow(UnauthorizedException)
    })
  })
})
