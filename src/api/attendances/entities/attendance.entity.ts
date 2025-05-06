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

export type AttendanceStatus = 'attending' | 'current' | 'in_queue' | 'canceled' | 'finished'

@Entity('attendances')
export class Attendance {
  @PrimaryColumn()
  id: string

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true, name: 'started_at' })
  startedAt: Date | null

  @Column({ type: 'timestamp', nullable: true, name: 'finished_at' })
  finishedAt: Date | null

  @OneToMany(
    () => AttendanceService,
    (attendanceService) => attendanceService.attendance,
    { eager: true },
  )
  services: AttendanceService[]

  @ManyToOne(() => User, (user) => user, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'timestamp', nullable: true, name: 'cancellation_date' })
  cancellationDate: Date | null

  @Column({ nullable: true, name: 'cancellation_reason' })
  cancellationReason: string

  @Column({ type: 'simple-enum' })
  status: AttendanceStatus

  constructor(
    props: {
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
