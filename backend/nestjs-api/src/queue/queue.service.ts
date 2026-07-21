import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as amqp from 'amqp-connection-manager'
import { Channel } from 'amqplib'

export interface QueueMessage {
  pattern: string
  data: unknown
}

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.AmqpConnectionManager
  private channel: amqp.ChannelWrapper

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const host = this.config.get('RABBITMQ_HOST', 'localhost')
    const port = this.config.get('RABBITMQ_PORT', '5672')
    const user = this.config.get('RABBITMQ_DEFAULT_USER', 'devsactum')
    const pass = this.config.get('RABBITMQ_DEFAULT_PASS', 'devsactum')

    this.connection = amqp.connect([`amqp://${user}:${pass}@${host}:${port}`])
    this.channel = this.connection.createChannel({
      setup: (channel: Channel) => {
        return Promise.all([
          channel.assertExchange('devsactum.events', 'topic', { durable: true }),
          channel.assertQueue('devsactum.notifications', { durable: true }),
          channel.assertQueue('devsactum.ai', { durable: true }),
          channel.assertQueue('devsactum.mail', { durable: true }),
        ])
      },
    })
  }

  async publish(pattern: string, data: unknown) {
    await this.channel.publish('devsactum.events', pattern, Buffer.from(JSON.stringify(data)))
  }

  async sendToQueue(queue: string, data: unknown) {
    await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))
  }

  async onModuleDestroy() {
    await this.connection?.close()
  }
}
