import { Module } from '@nestjs/common'
import { AttendancesService } from './attendances.service'
import { AttendancesController } from './attendances.controller'
import { AttendancesRepository } from './attendances.repository'
import { AttendanceServiceRepository } from './attendance-service.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AttendanceService } from './entities/attendance.service.entity'
import { Attendance } from './entities/attendance.entity'
import { UsersModule } from '../users/users.module'
import { ServicesModule } from '../services/services.module'
import { DateAdapterModule } from '../../infra/adapters/date-adapter'
import { CreateAttendanceUseCase, EndAttendanceUseCase, GetActivedAttendanceUseCase, GetAttendanceInfoUseCase, LoadAttendancesByUserUseCase, LoadAttendancesUseCase, StartAttendanceUseCase } from './usecases'
@Module({
  imports: [
    UsersModule,
    ServicesModule,
    DateAdapterModule,
    TypeOrmModule.forFeature([Attendance, AttendanceService]),
  ],
  controllers: [AttendancesController],
  providers: [
    AttendancesService,
    CreateAttendanceUseCase,
    GetActivedAttendanceUseCase,
    GetAttendanceInfoUseCase,
    StartAttendanceUseCase,
    EndAttendanceUseCase,
    LoadAttendancesByUserUseCase,
    LoadAttendancesUseCase,
    AttendancesRepository,
    AttendanceServiceRepository,
    {
      provide: 'IAttendancesRepository',
      useExisting: AttendancesRepository,
    },
    {
      provide: 'IAttendanceServiceRepository',
      useExisting: AttendanceServiceRepository,
    },
  ],
  exports: [AttendancesService],
})
export class AttendancesModule {}
