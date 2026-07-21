import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { User } from './entities/user.entity'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userRepo.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    })
    if (existing) throw new ConflictException('Email or username already exists')

    const hashed = await bcrypt.hash(dto.password, 10)
    const user = this.userRepo.create({
      email: dto.email,
      username: dto.username,
      displayName: dto.displayName,
      password: hashed,
      role: dto.role || 'developer',
      companyName: dto.companyName,
    })
    await this.userRepo.save(user)

    return {
      user: { id: user.id, email: user.email, username: user.username, display_name: user.displayName },
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      select: { id: true, email: true, username: true, displayName: true, password: true, role: true },
    })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const valid = await bcrypt.compare(dto.password, user.password)
    if (!valid) throw new UnauthorizedException('Invalid credentials')

    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role })

    return {
      user: { id: user.id, email: user.email, username: user.username, display_name: user.displayName },
      token,
    }
  }

  async getUser(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } })
    if (!user) throw new UnauthorizedException('User not found')
    return { user }
  }

  async updateUser(userId: string, data: Partial<User>) {
    await this.userRepo.update(userId, data)
    return this.getUser(userId)
  }
}
