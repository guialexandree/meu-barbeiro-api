import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { AttendanceService } from './attendance.service.entity';
import { Service } from 'src/api/services/entities/service.entity';
import { User } from 'src/api/users/entities/user.entity';

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
    { eager: true }
  )
  services: AttendanceService[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
      createdAt: Date;
      status: AttendanceStatus;
      user: User;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }
}
