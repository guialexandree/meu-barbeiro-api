import { Inject, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { CreateAttendanceUseCase } from './usecases/create-attendances-use-case';

@Injectable()
export class AttendancesService {
  constructor(
    @Inject()
    private createAttendanceUseCase: CreateAttendanceUseCase
  ) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    return this.createAttendanceUseCase.execute(createAttendanceDto);
  }

}
