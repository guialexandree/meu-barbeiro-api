import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'

@Injectable()
export class LoadAttendancesInfoTodayUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
  ) {}

  async execute() {
    const finished = await this.attendancesRepository.countTodayByStatus('finished')
    const inQueue = await this.attendancesRepository.countTodayByStatus('in_queue')
    const amount = await this.attendancesRepository.amountToday()

    return {
      amount,
      inQueue,
      finished,
    }
  }
}
