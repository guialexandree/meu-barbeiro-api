import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'

@Injectable()
export class LoadAttendancesByUserUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
  ) {}

  async execute(userId: string) {
    const attendances = await this.attendancesRepository.loadByUser(userId)

    return attendances
  }
}
