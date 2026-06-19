import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    const items = await this.service.findByUser(userId);
    return { items };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.service.findById(id);
    return { item };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: any, @Request() req) {
    const item = await this.service.create({ ...data, userId: req.user.id });
    return { item };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() data: any) {
    const item = await this.service.update(id, data);
    return { item };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Portfolio item deleted' };
  }
}
