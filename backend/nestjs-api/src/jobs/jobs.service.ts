import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { JobApplication } from './job-application.entity';
import { JobBookmark } from './job-bookmark.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(JobApplication)
    private applicationsRepository: Repository<JobApplication>,
    @InjectRepository(JobBookmark)
    private bookmarksRepository: Repository<JobBookmark>,
  ) {}

  async findAll(params?: {
    type?: string;
    experience?: string;
    remote?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ jobs: Job[]; total: number; page: number; pages: number }> {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    const qb = this.jobsRepository.createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .where('job.isActive = :active', { active: true });

    if (params?.type) {
      qb.andWhere('job.jobType = :type', { type: params.type });
    }
    if (params?.experience) {
      qb.andWhere('job.experienceLevel = :experience', { experience: params.experience });
    }
    if (params?.remote !== undefined) {
      qb.andWhere('job.remote = :remote', { remote: params.remote });
    }
    if (params?.search) {
      qb.andWhere('(job.title LIKE :search OR job.description LIKE :search)', { search: `%${params.search}%` });
    }

    const total = await qb.getCount();
    const jobs = await qb
      .orderBy('job.isFeatured', 'DESC')
      .addOrderBy('job.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();

    return { jobs, total, page, pages: Math.ceil(total / limit) };
  }

  async findById(id: string): Promise<Job> {
    const job = await this.jobsRepository.findOne({ where: { id }, relations: ['company'] });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async create(data: Partial<Job> & { companyId: string }): Promise<Job> {
    const job = this.jobsRepository.create(data);
    return this.jobsRepository.save(job);
  }

  async update(id: string, data: Partial<Job>): Promise<Job> {
    const job = await this.findById(id);
    Object.assign(job, data);
    return this.jobsRepository.save(job);
  }

  async delete(id: string): Promise<void> {
    const job = await this.findById(id);
    await this.jobsRepository.remove(job);
  }

  async apply(jobId: string, developerId: string, coverLetter: string, portfolio?: string): Promise<JobApplication> {
    const job = await this.findById(jobId);
    const existing = await this.applicationsRepository.findOne({ where: { jobId, developerId } });
    if (existing) throw new ConflictException('Already applied to this job');

    const application = this.applicationsRepository.create({
      jobId,
      developerId,
      coverLetter,
      portfolioUrl: portfolio,
    });
    const saved = await this.applicationsRepository.save(application);

    job.applicantsCount += 1;
    await this.jobsRepository.save(job);

    return saved;
  }

  async getApplications(jobId: string): Promise<JobApplication[]> {
    return this.applicationsRepository.find({
      where: { jobId },
      relations: ['developer'],
      order: { appliedAt: 'DESC' },
    });
  }

  async updateApplicationStatus(applicationId: string, status: string): Promise<JobApplication> {
    const app = await this.applicationsRepository.findOne({ where: { id: applicationId } });
    if (!app) throw new NotFoundException('Application not found');
    app.status = status;
    return this.applicationsRepository.save(app);
  }

  async getDashboardStats(companyId: string) {
    const totalJobs = await this.jobsRepository.count({ where: { companyId } });
    const activeJobs = await this.jobsRepository.count({ where: { companyId, isActive: true } });

    const jobIds = (await this.jobsRepository.find({ where: { companyId } })).map(j => j.id);
    let totalApplicants = 0;
    let shortlisted = 0;
    let interviews = 0;
    let hired = 0;

    if (jobIds.length > 0) {
      totalApplicants = await this.applicationsRepository
        .createQueryBuilder('app')
        .where('app.job_id IN (:...jobIds)', { jobIds })
        .getCount();
      shortlisted = await this.applicationsRepository
        .createQueryBuilder('app')
        .where('app.job_id IN (:...jobIds) AND app.status = :status', { jobIds, status: 'shortlisted' })
        .getCount();
      interviews = await this.applicationsRepository
        .createQueryBuilder('app')
        .where('app.job_id IN (:...jobIds) AND app.status = :status', { jobIds, status: 'interview' })
        .getCount();
      hired = await this.applicationsRepository
        .createQueryBuilder('app')
        .where('app.job_id IN (:...jobIds) AND app.status = :status', { jobIds, status: 'offered' })
        .getCount();
    }

    return { totalJobs, activeJobs, totalApplicants, shortlisted, interviews, hired };
  }

  async getCompanyJobs(companyId: string): Promise<Job[]> {
    return this.jobsRepository.find({
      where: { companyId },
      order: { createdAt: 'DESC' },
    });
  }

  async bookmark(jobId: string, userId: string): Promise<void> {
    const existing = await this.bookmarksRepository.findOne({ where: { jobId, userId } });
    if (existing) return;
    const bookmark = this.bookmarksRepository.create({ jobId, userId });
    await this.bookmarksRepository.save(bookmark);
  }

  async unbookmark(jobId: string, userId: string): Promise<void> {
    await this.bookmarksRepository.delete({ jobId, userId });
  }

  async getBookmarks(userId: string): Promise<Job[]> {
    const bookmarks = await this.bookmarksRepository.find({
      where: { userId },
      relations: ['job', 'job.company'],
      order: { createdAt: 'DESC' },
    });
    return bookmarks.map(b => b.job);
  }
}
