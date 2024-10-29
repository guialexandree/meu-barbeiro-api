import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';

export interface IAttendancesRepository {
  findOne(id: string): Promise<Attendance>;
  remove(id: string): Promise<Attendance>;
  findAll(): Promise<Attendance[]>;
  save(attendance: Attendance): Promise<Attendance>;
}

@Injectable()
export class AttendancesRepository implements IAttendancesRepository {
  constructor(
    @InjectRepository(Attendance)
    private repository: Repository<Attendance>,
  ) {}

  findOne(id: string): Promise<Attendance> {
    return this.repository.findOneByOrFail({ id });
  }

  findAll(): Promise<Attendance[]> {
    return this.repository.find();
  }

  async save(attendance: Attendance): Promise<Attendance> {
    return this.repository.save(attendance);
  }

  async remove(id: string): Promise<Attendance> {
    const attendance = await this.findOne(id)
    return this.repository.remove(attendance)
  }
}
