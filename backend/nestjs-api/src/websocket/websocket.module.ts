import { Module } from '@nestjs/common'
import { WsGateway } from './websocket.gateway'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  providers: [WsGateway],
  exports: [WsGateway],
})
export class WebSocketModule {}
