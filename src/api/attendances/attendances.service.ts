import { Injectable } from '@nestjs/common'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { CreateAttendanceUseCase } from './usecases/create-attendances-use-case'
import { GetActivedAttendanceUseCase } from './usecases/get-actived-attendance-use-case'
import { GetAttendanceInfoUseCase } from './usecases/get-attendance-info-use-case'
import { LoadAttendancesUseCase } from './usecases/load-attendances-user-use-case'
import { LoadAttendancesByUserUseCase } from './usecases/load-attendances-by-user-use-case'
import { StartAttendanceUseCase } from './usecases/start-attendance-use-case'
import { EndAttendanceUseCase } from './usecases/end-attendance-use-case'

@Injectable()
export class AttendancesService {
  constructor(
    private readonly createAttendanceUseCase: CreateAttendanceUseCase,
    private readonly getAttendanceUseCase: GetActivedAttendanceUseCase,
    private readonly getAttendanceInfoUseCase: GetAttendanceInfoUseCase,
    private readonly loadAttendancesByUserUseCase: LoadAttendancesByUserUseCase,
    private readonly startAttendanceUseCase: StartAttendanceUseCase,
    private readonly endAttendanceUseCase: EndAttendanceUseCase,
    private readonly loadAttendancesUseCase: LoadAttendancesUseCase,
  ) {}

  add(createAttendanceDto: CreateAttendanceDto) {
    return this.createAttendanceUseCase.execute(createAttendanceDto, createAttendanceDto.userId)
  }

  addIn(createAttendanceDto: CreateAttendanceDto, userId: string) {
    return this.createAttendanceUseCase.execute(createAttendanceDto, userId)
  }

  findActivedByUser(userId: string) {
    return this.getAttendanceUseCase.execute(userId)
  }

  loadByUser(userId: string) {
    return this.loadAttendancesByUserUseCase.execute(userId)
  }

  loadToday() {
    return this.loadAttendancesUseCase.execute()
  }

  startAttendance(id: string) {
    return this.startAttendanceUseCase.execute(id)
  }

  endAttendance(id: string) {
    return this.endAttendanceUseCase.execute(id)
  }

  findAttendancesInfo() {
    return this.getAttendanceInfoUseCase.execute()
  }
}
