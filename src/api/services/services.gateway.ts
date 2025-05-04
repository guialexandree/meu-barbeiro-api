import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Service } from './entities/service.entity'

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'services',
  transports: ['websocket'],
})
export class ServicesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  afterInit(server: Server) {
    console.log('WebSocket Gateway Initialized')
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  notifyUpdate(serviceUpdated: Service) {
    this.server.emit('update', serviceUpdated)
  }

  notifyRemove(serviceId: string) {
    this.server.emit('remove', serviceId)
  }
}
