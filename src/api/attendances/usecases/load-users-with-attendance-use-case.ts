import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'

@Injectable()
export class LoadUsersWithAttendanceUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
  ) {}

  async execute() {
    const attendancesToday = await this.attendancesRepository.loadActives()
    const users = attendancesToday.map((attendance) => attendance.user)

    return users
  }
}
