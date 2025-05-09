import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { IDateAdapter } from '../../../infra/adapters/protocols'

@Injectable()
export class LoadAttendancesUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute() {
    const attendancesToday = await this.attendancesRepository.loadByStatus([
      'in_queue',
      'attending',
    ])

    const firstInQueue = attendancesToday.find(
      (attendance) => attendance.status === 'in_queue',
    )
    if (firstInQueue) {
      firstInQueue.status = 'current'
    }

    let accumulatedTime = 0
    attendancesToday.map((attendance) => {
      const totalTimeExecution = attendance.services.reduce(
        (sum, serviceAttendance) =>
          sum + serviceAttendance.service.timeExecution,
        0,
      )

      attendance.startPrevision = this.dateAdapter.addMinutes(
        accumulatedTime,
        this.dateAdapter.now(),
      )
      accumulatedTime += totalTimeExecution

      return attendance
    })

    return attendancesToday
  }
}
