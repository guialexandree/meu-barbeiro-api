import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { User } from './entities/user.entity'

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'users',
  transports: ['websocket'],
})
export class UsersGateway
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

  notifyUpdate(userUpdated: User) {
    this.server.emit('update', userUpdated)
  }

  notifyAdd(user: User) {
    this.server.emit('add', user)
  }

  notifyRemove(userId: string) {
    this.server.emit('remove', userId)
  }
}
