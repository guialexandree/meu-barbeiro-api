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
  createdAt: Date;

  @OneToMany(
    () => AttendanceService,
    (attendanceService) => attendanceService.attendance,
    {
      cascade: true,
    },
  )
  services: AttendanceService[];

  @Column({ type: 'datetime', nullable: true })
  startDate: Date | null;

  @Column({ type: 'datetime', nullable: true })
  cancellationDate: Date | null;

  @Column({ nullable: true })
  cancellationReason: string;

  @Column({ type: 'simple-enum' })
  status: AttendanceStatus;

  constructor(
    props: {
      services: Service[];
      createdAt: Date
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
