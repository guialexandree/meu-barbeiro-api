import { Inject, Injectable } from '@nestjs/common'
import { IAttendancesRepository } from '../attendances.repository'
import { UsersService } from '../../users/users.service'

@Injectable()
export class LoadAvailablesUsersUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
    @Inject()
    private readonly userService: UsersService,
  ) {}

  async execute() {
    const simpleUsers = await this.userService.loadSimples()
    const usersWithAttendance = await this.attendancesRepository.loadByStatus([
      'attending',
      'in_queue',
    ])

    const usersWithAttendanceIds = usersWithAttendance.map((attendance) => attendance.user.id)

    return simpleUsers.filter(
      (user) => !usersWithAttendanceIds.includes(user.id),
    )
  }
}
