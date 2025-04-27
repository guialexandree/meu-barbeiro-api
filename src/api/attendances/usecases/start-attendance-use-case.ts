import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { InvalidRuleException } from '../../../domain/errors'
import { AttendanceStatus } from '../entities/attendance.entity'
import { IDateAdapter } from '../../../infra/adapters/protocols'

@Injectable()
export class StartAttendanceUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
    @Inject('IDateProvider')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute(id: string) {
    const attendance = await this.attendancesRepository.findOne(id)
    if (!attendance) {
      throw new InvalidRuleException('O atendimento informado não existe')
    }

    attendance.status = AttendanceStatus.EmAtendimento
    attendance.startedAt = this.dateAdapter.now()
    await this.attendancesRepository.save(attendance)

    return attendance
  }
}
