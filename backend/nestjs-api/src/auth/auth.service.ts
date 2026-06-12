import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.validatePassword(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const { passwordHash, ...result } = user;

    return {
      user: result,
      token: this.jwtService.sign(payload),
    };
  }

  async register(data: any) {
    const user = await this.usersService.create(data);
    const { passwordHash, ...result } = user;

    const payload = { sub: user.id, email: user.email };

    return {
      user: result,
      token: this.jwtService.sign(payload),
    };
  }
}
