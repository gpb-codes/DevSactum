import {
  Controller, Get, Post, Body, UseGuards, Req,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { PaymentsService } from './payments.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('paypal/create-order')
  createOrder(@Body() data: { planId: string; amount: number; currency: string; description: string }, @Req() req: any) {
    return this.paymentsService.createOrder({ ...data, userId: req.user.id })
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('paypal/capture')
  captureOrder(@Body() data: { orderId: string; payerId: string }) {
    return this.paymentsService.captureOrder(data.orderId, data.payerId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('orders')
  getOrders(@Req() req: any) {
    return this.paymentsService.getOrders(req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('subscription')
  getSubscription(@Req() req: any) {
    return this.paymentsService.getSubscription(req.user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('subscription/cancel')
  cancelSubscription(@Req() req: any) {
    return this.paymentsService.cancelSubscription(req.user.id)
  }
}
