import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaymentOrder, Subscription } from './entities/payment.entity'

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentOrder)
    private readonly orderRepo: Repository<PaymentOrder>,
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
  ) {}

  async createOrder(data: {
    planId: string; amount: number; currency: string; description: string; userId: string
  }) {
    const order = this.orderRepo.create({
      userId: data.userId,
      planId: data.planId,
      planName: data.description,
      amount: data.amount,
      currency: data.currency,
      paypalOrderId: `paypal_${Date.now()}`,
    })
    await this.orderRepo.save(order)
    return {
      orderId: order.id,
      approvalUrl: `https://paypal.com/checkout/${order.paypalOrderId}`,
    }
  }

  async captureOrder(orderId: string, payerId: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } })
    if (!order) throw new NotFoundException('Order not found')

    order.status = 'completed'
    order.paypalPayerId = payerId
    await this.orderRepo.save(order)

    const existingSub = await this.subRepo.findOne({ where: { userId: order.userId } })
    if (existingSub) {
      existingSub.status = 'active'
      existingSub.currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      await this.subRepo.save(existingSub)
    } else {
      const sub = this.subRepo.create({
        userId: order.userId,
        planId: order.planId,
        planName: order.planName,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
      await this.subRepo.save(sub)
    }

    return { orderId: order.id, payerId, status: 'completed' }
  }

  async getOrders(userId: string) {
    return this.orderRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    })
  }

  async getSubscription(userId: string) {
    const sub = await this.subRepo.findOne({ where: { userId } })
    if (!sub) throw new NotFoundException('No subscription found')
    return sub
  }

  async cancelSubscription(userId: string) {
    const sub = await this.subRepo.findOne({ where: { userId } })
    if (!sub) throw new NotFoundException('No subscription found')
    sub.status = 'cancelled'
    sub.cancelAt = new Date()
    await this.subRepo.save(sub)
  }
}
