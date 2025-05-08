import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { InvalidRuleException } from '../../../domain/errors'
import { IDateAdapter } from '../../../infra/adapters/protocols'

@Injectable()
export class CancelAttendanceUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute(id: string, reason: string) {
    const attendance = await this.attendancesRepository.findOne(id)
    if (!attendance) {
      throw new InvalidRuleException('O atendimento informado não existe')
    }

    if (attendance.status !== 'attending') {
      throw new InvalidRuleException('O atendimento já foi finalizado')
    }

    attendance.status = 'canceled'
    attendance.cancellationReason = reason
    attendance.canceledAt = this.dateAdapter.now()
    await this.attendancesRepository.save(attendance)

    return attendance
  }
}
