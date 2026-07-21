import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { Job, JobApplication, JobBookmark } from './entities/job.entity'
import { CreateJobDto } from './dto/create-job.dto'

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(JobApplication)
    private readonly applicationRepo: Repository<JobApplication>,
    @InjectRepository(JobBookmark)
    private readonly bookmarkRepo: Repository<JobBookmark>,
  ) {}

  async findAll(params: {
    type?: string; experience?: string; remote?: boolean; search?: string; page?: number
  }) {
    const where: any = {}
    if (params.type) where.type = params.type
    if (params.experience) where.experienceLevel = params.experience
    if (params.remote !== undefined) where.remote = params.remote
    if (params.search) where.title = Like(`%${params.search}%`)

    const page = params.page || 1
    const limit = 20
    const [jobs, total] = await this.jobRepo.findAndCount({
      where,
      order: { postedAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    })
    return { jobs, total, page, pages: Math.ceil(total / limit) }
  }

  async findOne(id: string) {
    const job = await this.jobRepo.findOne({ where: { id } })
    if (!job) throw new NotFoundException('Job not found')
    return job
  }

  async create(dto: CreateJobDto, userId: string) {
    const job = this.jobRepo.create({ ...dto, createdBy: userId })
    await this.jobRepo.save(job)
    return job
  }

  async update(id: string, data: Partial<Job>, userId: string) {
    const job = await this.findOne(id)
    if (job.createdBy !== userId) throw new ForbiddenException('Not your job')
    await this.jobRepo.update(id, data)
    return this.findOne(id)
  }

  async delete(id: string, userId: string) {
    const job = await this.findOne(id)
    if (job.createdBy !== userId) throw new ForbiddenException('Not your job')
    await this.jobRepo.delete(id)
  }

  async apply(jobId: string, userId: string, data: { coverLetter: string; portfolio: string }) {
    const application = this.applicationRepo.create({
      jobId, userId, ...data,
    })
    await this.applicationRepo.save(application)
    await this.jobRepo.increment({ id: jobId }, 'applicants', 1)
    return application
  }

  async getApplications(jobId: string) {
    const applications = await this.applicationRepo.find({
      where: { jobId },
      order: { createdAt: 'DESC' },
    })
    return { applications, total: applications.length }
  }

  async updateApplicationStatus(applicationId: string, status: string) {
    await this.applicationRepo.update(applicationId, { status })
    return this.applicationRepo.findOne({ where: { id: applicationId } })
  }

  async getDashboardStats(userId: string) {
    const total = await this.jobRepo.count({ where: { createdBy: userId } })
    const active = await this.jobRepo.count({ where: { createdBy: userId } })
    const totalApplications = await this.applicationRepo
      .createQueryBuilder('a')
      .innerJoin(Job, 'j', 'j.id = a.jobId')
      .where('j.createdBy = :userId', { userId })
      .getCount()
    return { totalJobs: total, activeJobs: active, totalApplications }
  }

  async getCompanyJobs(userId: string) {
    return this.jobRepo.find({ where: { createdBy: userId }, order: { postedAt: 'DESC' } })
  }

  async bookmark(jobId: string, userId: string) {
    const existing = await this.bookmarkRepo.findOne({ where: { jobId, userId } })
    if (existing) return
    await this.bookmarkRepo.save({ jobId, userId })
  }

  async unbookmark(jobId: string, userId: string) {
    await this.bookmarkRepo.delete({ jobId, userId })
  }

  async getBookmarks(userId: string) {
    const bookmarks = await this.bookmarkRepo.find({
      where: { userId },
      relations: { job: true },
    })
    return []
  }
}
