import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { IDateAdapter } from '../../../infra/adapters/protocols'

@Injectable()
export class LoadAttendancesDoneUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute() {
    const attendancesDoneToday = await this.attendancesRepository.loadByStatus([
      'finished',
    ])

    return attendancesDoneToday.map((attendance) => ({
      id: attendance.id,
      status: attendance.status,
      timeService: this.dateAdapter.differenceInMinutes(attendance.startedAt, attendance.finishedAt),
      amount: attendance.services.reduce((acc, service) => acc + service.price, 0),
      startedAt: attendance.startedAt,
      finishedAt: attendance.finishedAt,
      canceledAt: attendance.cancellationDate,
      user: {
        id: attendance.user.id,
        name: attendance.user.name,
        contactNumber: attendance.user.contactNumber,
      },
    }))
  }
}
