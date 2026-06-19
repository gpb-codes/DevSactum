import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobsService } from './jobs.service';
import { CreateJobDto, UpdateJobDto, ApplyToJobDto, UpdateApplicationStatusDto } from './dto/job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async list(
    @Query('type') type?: string,
    @Query('experience') experience?: string,
    @Query('remote') remote?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.jobsService.findAll({
      type,
      experience,
      remote: remote === 'true' ? true : remote === 'false' ? false : undefined,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get('bookmarks')
  @UseGuards(AuthGuard('jwt'))
  async getBookmarks(@Request() req) {
    const jobs = await this.jobsService.getBookmarks(req.user.id);
    return { jobs };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const job = await this.jobsService.findById(id);
    return { job };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body(new ValidationPipe({ transform: true, whitelist: true })) data: CreateJobDto, @Request() req) {
    const job = await this.jobsService.create({ ...data, companyId: req.user.id });
    return { job };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body(new ValidationPipe({ transform: true, whitelist: true })) data: UpdateJobDto) {
    const job = await this.jobsService.update(id, data);
    return { job };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    await this.jobsService.delete(id);
    return { message: 'Job deleted' };
  }

  @Post(':id/apply')
  @UseGuards(AuthGuard('jwt'))
  async apply(@Param('id') id: string, @Body(new ValidationPipe({ transform: true, whitelist: true })) data: ApplyToJobDto, @Request() req) {
    const application = await this.jobsService.apply(id, req.user.id, data.coverLetter, data.portfolio);
    return { application };
  }

  @Get(':id/applications')
  @UseGuards(AuthGuard('jwt'))
  async getApplications(@Param('id') id: string) {
    const applications = await this.jobsService.getApplications(id);
    return { applications };
  }

  @Patch('applications/:applicationId')
  @UseGuards(AuthGuard('jwt'))
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) data: UpdateApplicationStatusDto,
  ) {
    const application = await this.jobsService.updateApplicationStatus(applicationId, data.status);
    return { application };
  }

  @Post(':id/bookmark')
  @UseGuards(AuthGuard('jwt'))
  async bookmark(@Param('id') id: string, @Request() req) {
    await this.jobsService.bookmark(id, req.user.id);
    return { message: 'Job bookmarked' };
  }

  @Delete(':id/bookmark')
  @UseGuards(AuthGuard('jwt'))
  async unbookmark(@Param('id') id: string, @Request() req) {
    await this.jobsService.unbookmark(id, req.user.id);
    return { message: 'Bookmark removed' };
  }
}

@Controller('company')
export class CompanyController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'))
  async getDashboard(@Request() req) {
    const stats = await this.jobsService.getDashboardStats(req.user.id);
    return stats;
  }

  @Get('jobs')
  @UseGuards(AuthGuard('jwt'))
  async getCompanyJobs(@Request() req) {
    const jobs = await this.jobsService.getCompanyJobs(req.user.id);
    return { jobs };
  }
}
