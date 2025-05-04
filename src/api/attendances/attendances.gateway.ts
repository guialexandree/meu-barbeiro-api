import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Attendance, AttendanceStatus } from './entities/attendance.entity'

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'attendances',
  transports: ['websocket'],
})
export class AttendancesGateway
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

  notifyAdd(attendance: Attendance) {
    this.server.emit('add', attendance)
  }

  notifyFinish(attendanceId: string) {
    this.server.emit('finish', attendanceId)
  }

  notifyCancel(serviceId: string, motivo: AttendanceStatus) {
    this.server.emit('cancel', { serviceId, motivo })
  }
}
