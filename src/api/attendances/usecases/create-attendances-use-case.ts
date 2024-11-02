import { Inject, Injectable } from '@nestjs/common';
import { IAttendancesRepository } from '../attendances.repository';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { Attendance, AttendanceStatus } from '../entities/attendance.entity';
import { IAttendanceServiceRepository } from '../attendance-service.repository';
import { AttendanceService } from '../entities/attendance.service.entity';
import { IDateAdapter } from 'src/infra/adapters/protocols';

@Injectable()
export class CreateAttendanceUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
    @Inject('IAttendanceServiceRepository')
    private readonly attendanceServiceRepository: IAttendanceServiceRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter
  ) {}

  async execute (input: CreateAttendanceDto){
    const attendanceParams = {
      ...input,
      createdAt: this.dateAdapter.now(),
      status: AttendanceStatus.NaFila,
    };
    const newAttendance = new Attendance(attendanceParams)
    const attendance = await this.attendancesRepository.save(newAttendance)

    const attendanceServices = input.services.map(service => {
      const attendanceService = new AttendanceService({
        attendance,
        service,
        amount: service.price
      })
      this.attendanceServiceRepository.save(attendanceService);
    })

    return {
      attendance,
      attendanceServices
    }
  }
}
