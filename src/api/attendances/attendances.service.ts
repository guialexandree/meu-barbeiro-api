import { Injectable } from '@nestjs/common'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import * as UC from './usecases'
import { AttendancesGateway } from './attendances.gateway'
import { CancelAttendanceDto } from './dto'

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
    private readonly loadAttendancesInfoTodayUseCase: UC.LoadAttendancesInfoTodayUseCase,
    private readonly attendancesGateway: AttendancesGateway
  ) {}

  findActivedByUser(userId: string) {
    return this.getAttendanceUseCase.execute(userId)
  }

  loadByUser(userId: string) {
    return this.loadAttendancesByUserUseCase.execute(userId)
  }

  loadToday() {
    return this.loadAttendancesUseCase.execute()
  }

  loadInfoToday() {
    return this.loadAttendancesInfoTodayUseCase.execute()
  }

  startAttendance(id: string) {
    return this.startAttendanceUseCase.execute(id)
  }

  async add(createAttendanceDto: CreateAttendanceDto) {
    const attendance = await this.createAttendanceUseCase.execute(createAttendanceDto, createAttendanceDto.userId)
    this.attendancesGateway.notifyAdd(attendance)
    return attendance
  }

  async addIn(createAttendanceDto: CreateAttendanceDto, userId: string) {
    const attendance = await this.createAttendanceUseCase.execute(createAttendanceDto, userId)
    this.attendancesGateway.notifyAdd(attendance)
    return attendance
  }

  async endAttendance(id: string) {
    const attendance = await this.endAttendanceUseCase.execute(id)
    this.attendancesGateway.notifyFinish(attendance.id)
    return attendance
  }

  async cancelAttendance(cancelAttendanceDto: CancelAttendanceDto) {
    const attendance = await this.cancelAttendanceUseCase.execute(cancelAttendanceDto.id, cancelAttendanceDto.motivo)
    this.attendancesGateway.notifyCancel(attendance.id, cancelAttendanceDto.motivo)
    return attendance
  }

  findAttendancesInfo() {
    return this.getAttendanceInfoUseCase.execute()
  }
}
