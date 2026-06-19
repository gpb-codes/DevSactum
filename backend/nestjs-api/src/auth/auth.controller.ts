import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(new ValidationPipe({ transform: true, whitelist: true })) data: LoginDto) {
    return this.authService.login(data.email, data.password);
  }

  @Post('register')
  async register(@Body(new ValidationPipe({ transform: true, whitelist: true })) data: RegisterDto) {
    return this.authService.register(data);
  }
}
