import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'

@Injectable()
export class LoadAttendancesUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
  ) {}

  async execute() {
    const attendancesToday = await this.attendancesRepository.loadActives()

    return attendancesToday
  }
}
