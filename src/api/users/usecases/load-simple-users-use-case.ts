import { Inject, Injectable } from '@nestjs/common'
import { IUsersRepository } from '../users.repository'
import { User } from '../entities/user.entity'
import { AttendancesService } from '../../attendances/attendances.service'

@Injectable()
export class LoadUsersSimpleUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    @Inject()
    private readonly attendancesService: AttendancesService,
  ) {}

  async execute(): Promise<User[]> {
    const simpleUsers = await this.usersRepository.loadSimples()
    const usersWithAttendance = await this.attendancesService.loadUsersWithAttendance()
    const usersWithAttendanceIds = usersWithAttendance.map((user) => user.id)

    return simpleUsers.filter((user) => !usersWithAttendanceIds.includes(user.id))
  }
}
