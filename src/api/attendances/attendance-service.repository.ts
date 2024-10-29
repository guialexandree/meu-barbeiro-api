import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceService } from './entities/attendance.service.entity';

export interface IAttendanceServiceRepository {
  findOne(attendanceId: string, serviceId: string): Promise<AttendanceService>;
  save(attendanceService: AttendanceService): Promise<AttendanceService>;
}

@Injectable()
export class AttendanceServiceRepository implements IAttendanceServiceRepository {
  constructor(
    @InjectRepository(AttendanceService)
    private repository: Repository<AttendanceService>,
  ) {}

  findOne(attendanceId: string, serviceId: string): Promise<AttendanceService> {
    return this.repository.findOneByOrFail({
      attendance: { id: attendanceId },
      service: { id: serviceId }
    });
  }

  async save(attendanceService: AttendanceService): Promise<AttendanceService> {
    return this.repository.save(attendanceService);
  }
}
