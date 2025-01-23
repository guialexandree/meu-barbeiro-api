import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { GetHomeInfoUseCase } from './usecases/get-home-info-use-case';
import { CompaniesModule } from '../companies/companies.module';
import { AlertsModule } from '../alerts/alerts.module';
import { AttendancesModule } from '../attendances/attendances.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../companies/entities/company.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { Attendance } from '../attendances/entities/attendance.entity';
import { AttendanceService } from '../attendances/entities/attendance.service.entity';
import { DateAdapterModule } from '@/infra/adapters/date-adapter';

@Module({
  imports: [
    CompaniesModule,
    AlertsModule,
    AttendancesModule,
    DateAdapterModule,
    TypeOrmModule.forFeature([
      Company,
      Alert,
      Attendance,
      AttendanceService
    ])
  ],
  controllers: [HomeController],
  providers: [
    HomeService,
    GetHomeInfoUseCase
  ],
})
export class HomeModule {}
