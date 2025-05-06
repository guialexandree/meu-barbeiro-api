import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { CreateAttendanceDto } from '../dto/create-attendance.dto'
import { Attendance, AttendanceStatus } from '../entities/attendance.entity'
import { IAttendanceServiceRepository } from '../attendance-service.repository'
import { AttendanceService } from '../entities/attendance.service.entity'
import { ServicesService } from '../../services/services.service'
import { UsersService } from '../../users/users.service'
import { IDateAdapter } from '../../../infra/adapters/protocols'

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
    const user = await this.userService.findById(userId)
    const services = await this.servicesService.findAll({
      search: '',
      status: null,
    })
    const selectedServices = services.filter((service) =>
      input.services.includes(service.id),
    )

    const newAttendance = new Attendance({
      services: selectedServices,
      createdAt: this.dateAdapter.now(),
      status: 'in_queue',
      user,
    })

    const attendance = await this.attendancesRepository.save(newAttendance)

    const jobs: Promise<AttendanceService>[] = []
    for (const service of selectedServices) {
      const attendanceService = new AttendanceService({
        attendance,
        service,
        price: service.price,
      })
      jobs.push(this.attendanceServiceRepository.save(attendanceService))
    }

    const servicesAttendance = await Promise.all(jobs)
    newAttendance.services = servicesAttendance

    return newAttendance
  }
}
