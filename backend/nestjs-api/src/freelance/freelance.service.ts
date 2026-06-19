import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FreelanceProject } from './freelance-project.entity';
import { FreelanceBid } from './freelance-bid.entity';

@Injectable()
export class FreelanceService {
  constructor(
    @InjectRepository(FreelanceProject)
    private projectsRepo: Repository<FreelanceProject>,
    @InjectRepository(FreelanceBid)
    private bidsRepo: Repository<FreelanceBid>,
  ) {}

  async findAll(status?: string): Promise<FreelanceProject[]> {
    const where = status ? { status } : {};
    return this.projectsRepo.find({ where, order: { createdAt: 'DESC' }, relations: ['client'] });
  }

  async findById(id: string): Promise<FreelanceProject> {
    const project = await this.projectsRepo.findOne({ where: { id }, relations: ['client'] });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(data: Partial<FreelanceProject>): Promise<FreelanceProject> {
    const project = this.projectsRepo.create(data);
    return this.projectsRepo.save(project);
  }

  async update(id: string, data: Partial<FreelanceProject>): Promise<FreelanceProject> {
    const project = await this.findById(id);
    Object.assign(project, data);
    return this.projectsRepo.save(project);
  }

  async delete(id: string): Promise<void> {
    const project = await this.findById(id);
    await this.projectsRepo.remove(project);
  }

  async bid(projectId: string, developerId: string, amount: number, proposal?: string, estimatedDays?: number): Promise<FreelanceBid> {
    const existing = await this.bidsRepo.findOne({ where: { projectId, developerId } });
    if (existing) throw new ConflictException('Already bid on this project');
    const bid = this.bidsRepo.create({ projectId, developerId, amount, proposal, estimatedDays });
    return this.bidsRepo.save(bid);
  }

  async getBids(projectId: string): Promise<FreelanceBid[]> {
    return this.bidsRepo.find({ where: { projectId }, relations: ['developer'], order: { createdAt: 'DESC' } });
  }

  async updateBidStatus(bidId: string, status: string): Promise<FreelanceBid> {
    const bid = await this.bidsRepo.findOne({ where: { id: bidId } });
    if (!bid) throw new NotFoundException('Bid not found');
    bid.status = status;
    return this.bidsRepo.save(bid);
  }
}
