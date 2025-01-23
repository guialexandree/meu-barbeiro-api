import { Inject, Injectable } from '@nestjs/common';
import { IAttendancesRepository } from '../attendances.repository';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { Attendance, AttendanceStatus } from '../entities/attendance.entity';
import { IAttendanceServiceRepository } from '../attendance-service.repository';
import { AttendanceService } from '../entities/attendance.service.entity';
import { IDateAdapter } from 'src/infra/adapters/protocols';
import { UsersService } from 'src/api/users/users.service';
import { ServicesService } from 'src/api/services/services.service';

@Injectable()
export class CreateAttendanceUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
    @Inject('IAttendanceServiceRepository')
    private readonly attendanceServiceRepository: IAttendanceServiceRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
    @Inject()
    private readonly userService: UsersService,
    @Inject()
    private readonly servicesService: ServicesService,
  ) {}

  async execute(input: CreateAttendanceDto, userId: string) {
    const user = await this.userService.findById(userId);
    const services = await this.servicesService.findAll();
    const selectedServices = services.filter(service => input.services.includes(service.id));

    const newAttendance = new Attendance({
      services: selectedServices,
      createdAt: this.dateAdapter.now(),
      status: AttendanceStatus.NaFila,
      user,
    });

    const attendance = await this.attendancesRepository.save(newAttendance);

    const jobs: Promise<AttendanceService>[] = [];
    for(const service of selectedServices) {
      const attendanceService = new AttendanceService({
        attendance,
        service,
        price: service.price,
      });
      jobs.push(this.attendanceServiceRepository.save(attendanceService));
    }
    const rest = await Promise.all(jobs);
    console.log(rest);

    return await this.attendancesRepository.findOne(attendance.id);
  }
}
