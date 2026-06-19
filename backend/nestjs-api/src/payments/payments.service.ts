import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Subscription)
    private repo: Repository<Subscription>,
  ) {}

  async findByUser(userId: string): Promise<Subscription[]> {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findActive(userId: string): Promise<Subscription | null> {
    return this.repo.findOne({ where: { userId, status: 'active' } });
  }

  async create(data: Partial<Subscription>): Promise<Subscription> {
    const sub = this.repo.create(data);
    return this.repo.save(sub);
  }

  async cancel(id: string): Promise<Subscription> {
    const sub = await this.repo.findOne({ where: { id } });
    if (!sub) throw new NotFoundException('Subscription not found');
    sub.status = 'cancelled';
    return this.repo.save(sub);
  }

  async getPlans() {
    return [
      { id: 'pro-monthly', name: 'Pro', price: 49, currency: 'USD', cycle: 'monthly', features: ['Perfil destacado', 'Acceso a IA', 'Soporte prioritario'] },
      { id: 'pro-yearly', name: 'Pro', price: 470, currency: 'USD', cycle: 'yearly', features: ['Perfil destacado', 'Acceso a IA', 'Soporte prioritario', '2 meses gratis'] },
      { id: 'enterprise-monthly', name: 'Enterprise', price: 199, currency: 'USD', cycle: 'monthly', features: ['Todo lo de Pro', 'API access', 'Branding personalizado', 'Manager dedicado'] },
      { id: 'enterprise-yearly', name: 'Enterprise', price: 1990, currency: 'USD', cycle: 'yearly', features: ['Todo lo de Pro', 'API access', 'Branding personalizado', 'Manager dedicado', '2 meses gratis'] },
    ];
  }
}
