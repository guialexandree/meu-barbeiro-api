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
import * as UC from './usecases'

@Module({
  imports: [
    UsersModule,
    ServicesModule,
    TypeOrmModule.forFeature([Attendance, AttendanceService]),
  ],
  controllers: [AttendancesController],
  providers: [
    AttendancesService,
    UC.LoadUsersWithAttendanceUseCase,
    UC.CancelAttendanceUseCase,
    UC.LoadAvailablesUsersUseCase,
    UC.LoadAttendancesInfoTodayUseCase,
    UC.LoadAttendancesDoneUseCase,
    UC.CreateAttendanceUseCase,
    UC.GetActivedAttendanceUseCase,
    UC.GetAttendanceInfoUseCase,
    UC.StartAttendanceUseCase,
    UC.EndAttendanceUseCase,
    UC.LoadAttendancesByUserUseCase,
    UC.LoadAttendancesUseCase,
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
