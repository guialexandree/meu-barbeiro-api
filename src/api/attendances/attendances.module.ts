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
import { AttendancesGateway } from './attendances.gateway'
import * as UC from './usecases'

@Module({
  imports: [
    UsersModule,
    ServicesModule,
    DateAdapterModule,
    TypeOrmModule.forFeature([Attendance, AttendanceService]),
  ],
  controllers: [AttendancesController],
  providers: [
    AttendancesGateway,
    AttendancesService,
    UC.LoadUsersWithAttendanceUseCase,
    UC.CancelAttendanceUseCase,
    UC.LoadAttendancesInfoTodayUseCase,
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
