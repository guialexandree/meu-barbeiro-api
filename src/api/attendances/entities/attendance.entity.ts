import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AttendanceService } from './attendance.service.entity';
import { Service } from 'src/api/services/entities/service.entity';

export enum AttendanceStatus {
  NaFila = 'nafila',
  EmAtendimento = 'ematendimento',
  Cancelado = 'cancelado',
}

@Entity()
export class Attendance {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @OneToMany(
    () => AttendanceService,
    (attendanceService) => attendanceService.attendance,
    {
      cascade: true,
    },
  )
  services: AttendanceService[];

  @Column({ type: 'datetime', nullable: true })
  start_date: Date | null;

  @Column({ type: 'datetime', nullable: true })
  cancellation_date: Date | null;

  @Column({ nullable: true })
  cancellation_reason: string;

  @Column({ type: 'simple-enum' })
  status: AttendanceStatus;

  constructor(
    props: {
      services: Service[];
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
