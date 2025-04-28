import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { AttendanceStatus } from '../entities/attendance.entity'

@Injectable()
export class LoadAttendancesUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
  ) {}

  async execute() {
    const attendancesToday = await this.attendancesRepository.loadActives()

    const firstInQueue = attendancesToday.find(
      (attendance) => attendance.status === 'in_queue',
    )
    if (firstInQueue) {
      firstInQueue.status = AttendanceStatus.NaVez
    }

    return attendancesToday
  }
}
