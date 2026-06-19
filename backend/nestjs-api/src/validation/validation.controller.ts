import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationService } from './validation.service';

@Controller('validations')
export class ValidationController {
  constructor(private readonly service: ValidationService) {}

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    const validations = await this.service.findByUser(userId);
    return { validations };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const validation = await this.service.findById(id);
    return { validation };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: { skill: string; maxScore?: number }, @Request() req) {
    const validation = await this.service.create({ ...data, userId: req.user.id });
    return { validation };
  }

  @Patch(':id/complete')
  @UseGuards(AuthGuard('jwt'))
  async complete(@Param('id') id: string, @Body('score') score: number) {
    const validation = await this.service.complete(id, score);
    return { validation };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Validation deleted' };
  }
}
