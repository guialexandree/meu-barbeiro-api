import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { AttendanceStatus } from '../entities/attendance.entity'
import { IDateAdapter } from '../../../infra/adapters/protocols'
import { InvalidRuleException } from '../../../domain/errors'
import { SendToAttendanceDto } from '../dto'
import { CreateAttendanceUseCase } from './create-attendances-use-case'

@Injectable()
export class SendoToAttendanceUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
    private readonly createAttendanceUseCase: CreateAttendanceUseCase,
  ) {}

  async execute(input: SendToAttendanceDto) {
    const attendance = await this.attendancesRepository.findOne(input.id)
    if (!attendance) {
      throw new InvalidRuleException('Atendimento não encontrado')
    }

    attendance.status = 'canceled'
    attendance.cancellationReason = 'PERDEU A VEZ'
    attendance.canceledAt = this.dateAdapter.now()
    await this.attendancesRepository.save(attendance)

    const attendanceParams = {
      userId: attendance.user.id,
      services: attendance.services.map((service) => service.service.id),
      position: input.position
    }

    return await this.createAttendanceUseCase.execute(attendanceParams, attendance.user.id)
  }
}
