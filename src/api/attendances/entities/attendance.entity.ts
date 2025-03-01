import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import { AttendanceService } from './attendance.service.entity'
import { User } from '../../users/entities/user.entity'
import { Service } from '../../services/entities/service.entity'

export enum AttendanceStatus {
  NaFila = 'nafila',
  EmAtendimento = 'ematendimento',
  Cancelado = 'cancelado',
}

@Entity('attendances')
export class Attendance {
  @PrimaryColumn()
  id: string

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @OneToMany(
    () => AttendanceService,
    (attendanceService) => attendanceService.attendance,
    { eager: true },
  )
  services: AttendanceService[]

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'timestamp', nullable: true, name: 'start_date' })
  startDate: Date | null

  @Column({ type: 'timestamp', nullable: true, name: 'cancellation_date' })
  cancellationDate: Date | null

  @Column({ nullable: true, name: 'cancellation_reason' })
  cancellationReason: string

  @Column({ type: 'simple-enum' })
  status: AttendanceStatus

  constructor(
    props: {
      services: Service[]
      createdAt: Date
      status: AttendanceStatus
      user: User
    },
    id?: string,
  ) {
    Object.assign(this, props)
    this.id = id ?? crypto.randomUUID()
  }
}
