import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { AttendancesRepository } from './attendances.repository';
import { CreateAttendanceUseCase } from './usecases/create-attendances-use-case';
import { AttendanceServiceRepository } from './attendance-service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './entities/attendance.service.entity';
import { Attendance } from './entities/attendance.entity';
import { DateAdapterModule } from 'src/infra/adapters/date-adapter';
import { GetActivedAttendanceUseCase } from './usecases/get-actived-attendance-use-case';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../services/services.module';
import { GetAttendanceInfoUseCase } from './usecases/get-attendance-info-use-case';

@Module({
  imports: [
    UsersModule,
    ServicesModule,
    DateAdapterModule,
    TypeOrmModule.forFeature([
      Attendance,
      AttendanceService,
    ])
  ],
  controllers: [AttendancesController],
  providers: [
    AttendancesService,
    CreateAttendanceUseCase,
    GetActivedAttendanceUseCase,
    GetAttendanceInfoUseCase,
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
  exports: [AttendancesService]
})
export class AttendancesModule {}
