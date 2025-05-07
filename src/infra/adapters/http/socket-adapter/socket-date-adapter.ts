import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ISocketAdapter } from '../../protocols'
import { Logger } from '@nestjs/common'

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class SocketAdapter
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ISocketAdapter
{
  private readonly logger = new Logger(SocketAdapter.name)

  @WebSocketServer()
  server: Server

  afterInit() {
    this.logger.log('WebSocket Gateway Initialized')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  notify(event: string, data: any) {
    this.logger.log(`Notify event: ${event}`)
    this.server.emit(event, data)
  }
}
