import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { JobsService } from './jobs.service'
import { CreateJobDto } from './dto/create-job.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('jobs')
@Controller()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('jobs')
  findAll(@Query() params: any) {
    return this.jobsService.findAll(params)
  }

  @Get('jobs/:id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('jobs')
  create(@Body() dto: CreateJobDto, @Req() req: any) {
    return this.jobsService.create(dto, req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('jobs/:id')
  update(@Param('id') id: string, @Body() data: any, @Req() req: any) {
    return this.jobsService.update(id, data, req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('jobs/:id')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.jobsService.delete(id, req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('jobs/:id/apply')
  apply(@Param('id') id: string, @Body() data: { coverLetter: string; portfolio: string }, @Req() req: any) {
    return this.jobsService.apply(id, req.user.id, data)
  }

  @Get('jobs/:id/applications')
  getApplications(@Param('id') id: string) {
    return this.jobsService.getApplications(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('applications/:id')
  updateApplicationStatus(@Param('id') id: string, @Body() data: { status: string }) {
    return this.jobsService.updateApplicationStatus(id, data.status)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('company/dashboard')
  getDashboard(@Req() req: any) {
    return this.jobsService.getDashboardStats(req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('company/jobs')
  getCompanyJobs(@Req() req: any) {
    return this.jobsService.getCompanyJobs(req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('jobs/:id/bookmark')
  bookmark(@Param('id') id: string, @Req() req: any) {
    return this.jobsService.bookmark(id, req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('jobs/:id/bookmark')
  unbookmark(@Param('id') id: string, @Req() req: any) {
    return this.jobsService.unbookmark(id, req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('jobs/bookmarks')
  getBookmarks(@Req() req: any) {
    return this.jobsService.getBookmarks(req.user.id)
  }
}
