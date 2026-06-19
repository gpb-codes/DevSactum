import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FreelanceService } from './freelance.service';

@Controller('freelance')
export class FreelanceController {
  constructor(private readonly service: FreelanceService) {}

  @Get()
  async findAll(@Query('status') status?: string) {
    const projects = await this.service.findAll(status);
    return { projects };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.service.findById(id);
    return { project };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: any, @Request() req) {
    const project = await this.service.create({ ...data, clientId: req.user.id });
    return { project };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() data: any) {
    const project = await this.service.update(id, data);
    return { project };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Project deleted' };
  }

  @Post(':id/bid')
  @UseGuards(AuthGuard('jwt'))
  async bid(@Param('id') id: string, @Body() data: { amount: number; proposal?: string; estimatedDays?: number }, @Request() req) {
    const bid = await this.service.bid(id, req.user.id, data.amount, data.proposal, data.estimatedDays);
    return { bid };
  }

  @Get(':id/bids')
  async getBids(@Param('id') id: string) {
    const bids = await this.service.getBids(id);
    return { bids };
  }

  @Patch('bids/:bidId')
  @UseGuards(AuthGuard('jwt'))
  async updateBidStatus(@Param('bidId') bidId: string, @Body('status') status: string) {
    const bid = await this.service.updateBidStatus(bidId, status);
    return { bid };
  }
}
