import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { AttendancesRepository } from './attendances.repository';
import { CreateAttendanceUseCase } from './usecases/create-attendances-use-case';
import { AttendanceServiceRepository } from './attendance-service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './entities/attendance.service.entity';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attendance,
      AttendanceService,
    ])
  ],
  controllers: [AttendancesController],
  providers: [
    AttendancesService,
    CreateAttendanceUseCase,
    AttendancesRepository,
    AttendanceServiceRepository,
    {
      provide: 'IAttendancesRepository',
      useExisting: AttendancesRepository
    },
    {
      provide: 'IAttendanceServiceRepository',
      useExisting: AttendanceServiceRepository
    }
  ],
})
export class AttendancesModule {}
