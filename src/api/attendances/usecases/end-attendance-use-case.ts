import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { InvalidRuleException } from '../../../domain/errors'
import { AttendanceStatus } from '../entities/attendance.entity'

@Injectable()
export class EndAttendanceUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
  ) {}

  async execute(id: string) {
    const attendance = await this.attendancesRepository.findOne(id)
    if (!attendance) {
      throw new InvalidRuleException('O atendimento informado não existe')
    }

    attendance.status = AttendanceStatus.Atendido
    await this.attendancesRepository.save(attendance)

    return attendance
  }
}
