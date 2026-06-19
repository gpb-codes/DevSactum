import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get('plans')
  async getPlans() {
    const plans = await this.service.getPlans();
    return { plans };
  }

  @Get('subscription')
  @UseGuards(AuthGuard('jwt'))
  async getActiveSubscription(@Request() req) {
    const sub = await this.service.findActive(req.user.id);
    return { subscription: sub };
  }

  @Post('subscription')
  @UseGuards(AuthGuard('jwt'))
  async createSubscription(
    @Body() data: { plan: string; paypalSubscriptionId?: string; amount: number; billingCycle?: string },
    @Request() req,
  ) {
    const sub = await this.service.create({
      ...data,
      userId: req.user.id,
      billingCycle: data.billingCycle || 'monthly',
    });
    return { subscription: sub };
  }

  @Delete('subscription/:id')
  @UseGuards(AuthGuard('jwt'))
  async cancelSubscription(@Param('id') id: string) {
    const sub = await this.service.cancel(id);
    return { subscription: sub };
  }
}
