import { Inject, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CreateAttendanceUseCase } from './usecases/create-attendances-use-case';
import { GetActivedAttendanceUseCase } from './usecases/get-actived-attendance-use-case';
import { GetAttendanceInfoUseCase } from './usecases/get-attendance-info-use-case';

@Injectable()
export class AttendancesService {
  constructor(
    private readonly createAttendanceUseCase: CreateAttendanceUseCase,
    private readonly getAttendanceUseCase: GetActivedAttendanceUseCase,
    private readonly getAttendanceInfoUseCase: GetAttendanceInfoUseCase,
  ) {}

  create(createAttendanceDto: CreateAttendanceDto, userId: string) {
    return this.createAttendanceUseCase.execute(createAttendanceDto, userId);
  }

  findActivedByUser(userId: string) {
    return this.getAttendanceUseCase.execute(userId);
  }

  findAttendancesInfo() {
    return this.getAttendanceInfoUseCase.execute();
  }
}
