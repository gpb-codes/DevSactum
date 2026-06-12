import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: Partial<User> & { password?: string }) {
    const user = await this.usersService.create(data);
    const { passwordHash, ...result } = user;
    return { user: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    const { passwordHash, ...result } = user;
    return { user: result };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<User>) {
    const user = await this.usersService.update(id, data);
    const { passwordHash, ...result } = user;
    return { user: result };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { message: 'User deleted' };
  }
}
