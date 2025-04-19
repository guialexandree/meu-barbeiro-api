import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Attendance } from './attendance.entity'
import { Service } from '../../services/entities/service.entity'

@Entity('attendances_services')
export class AttendanceService {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Attendance, (attendance) => attendance.services)
  @JoinColumn({ name: 'attendance_id' })
  attendance: Attendance

  @ManyToOne(() => Service, (service) => service, { eager: true })
  @JoinColumn({ name: 'service_id' })
  service: Service

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  constructor(
    props: {
      attendance: Attendance
      service: Service
      price: number
    },
    id?: string,
  ) {
    Object.assign(this, props)
    this.id = id ?? crypto.randomUUID()
  }
}
