import { Inject, Injectable } from '@nestjs/common'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { CancelAttendanceDto } from './dto'
import { ISocketAdapter } from '../../infra/adapters/protocols'
import * as UC from './usecases'

@Injectable()
export class AttendancesService {
  constructor(
    private readonly createAttendanceUseCase: UC.CreateAttendanceUseCase,
    private readonly getAttendanceUseCase: UC.GetActivedAttendanceUseCase,
    private readonly getAttendanceInfoUseCase: UC.GetAttendanceInfoUseCase,
    private readonly loadAttendancesByUserUseCase: UC.LoadAttendancesByUserUseCase,
    private readonly startAttendanceUseCase: UC.StartAttendanceUseCase,
    private readonly endAttendanceUseCase: UC.EndAttendanceUseCase,
    private readonly cancelAttendanceUseCase: UC.CancelAttendanceUseCase,
    private readonly loadAttendancesUseCase: UC.LoadAttendancesUseCase,
    private readonly loadAttendancesDoneUseCase: UC.LoadAttendancesDoneUseCase,
    private readonly loadUsersWithAttendanceUseCase: UC.LoadUsersWithAttendanceUseCase,
    private readonly loadAvailablesUsersUseCase: UC.LoadAvailablesUsersUseCase,
    private readonly loadAttendancesInfoTodayUseCase: UC.LoadAttendancesInfoTodayUseCase,
    @Inject('ISocketAdapter')
    private readonly socketAdapter: ISocketAdapter
  ) {}

  findActivedByUser(userId: string) {
    return this.getAttendanceUseCase.execute(userId)
  }

  loadByUser(userId: string) {
    return this.loadAttendancesByUserUseCase.execute(userId)
  }

  loadAvailablesUsers() {
    return this.loadAvailablesUsersUseCase.execute()
  }

  loadUsersWithAttendance() {
    return this.loadUsersWithAttendanceUseCase.execute()
  }

  loadDoneToday() {
    return this.loadAttendancesDoneUseCase.execute()
  }

  loadActivesToday() {
    return this.loadAttendancesUseCase.execute()
  }

  loadInfoToday() {
    return this.loadAttendancesInfoTodayUseCase.execute()
  }

  async startAttendance(id: string) {
    const attendance = await this.startAttendanceUseCase.execute(id)
    this.socketAdapter.notify('queue_info/start_attendance', attendance)
    this.socketAdapter.notify('queue/start_attendance', attendance)
    return attendance
  }

  async add(createAttendanceDto: CreateAttendanceDto) {
    const attendance = await this.createAttendanceUseCase.execute(createAttendanceDto, createAttendanceDto.userId)
    this.socketAdapter.notify('queue_info/entry_in_queue')
    this.socketAdapter.notify('queue/entry_in_queue', attendance)
    return attendance
  }

  async addIn(createAttendanceDto: CreateAttendanceDto, userId: string) {
    const attendance = await this.createAttendanceUseCase.execute(createAttendanceDto, userId)
    this.socketAdapter.notify('queue_info/entry_in_queue')
    this.socketAdapter.notify('queue/entry_in_queue', attendance)
    return attendance
  }

  async endAttendance(id: string) {
    const attendance = await this.endAttendanceUseCase.execute(id)
    this.socketAdapter.notify('queue_info/finish_attendance', attendance)
    this.socketAdapter.notify('queue/finish_attendance', attendance)
    return attendance
  }

  async cancelAttendance(cancelAttendanceDto: CancelAttendanceDto) {
    const attendance = await this.cancelAttendanceUseCase.execute(cancelAttendanceDto.id, cancelAttendanceDto.reason)
    this.socketAdapter.notify('queue_info/cancel_attendance')
    this.socketAdapter.notify('queue/cancel_attendance', attendance)
    return attendance
  }

  findAttendancesInfo() {
    return this.getAttendanceInfoUseCase.execute()
  }
}
