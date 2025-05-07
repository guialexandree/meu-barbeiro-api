import { Module, Scope } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { CompaniesRepository } from './companies.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { AttendancesModule } from '../attendances/attendances.module'
import { CreateCompanyUseCase, EndAttendanceCompanyUseCase, GetCompanyIdUseCase, GetCompanyUseCase, SeedCompanyUseCase, StartAttendanceCompanyUseCase } from './usecases/'

@Module({
  imports: [AttendancesModule, TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    GetCompanyUseCase,
    GetCompanyIdUseCase,
    SeedCompanyUseCase,
    CreateCompanyUseCase,
    EndAttendanceCompanyUseCase,
    StartAttendanceCompanyUseCase,
    CompaniesRepository,
    {
      provide: 'ICompaniesRepository',
      useExisting: CompaniesRepository,
    },
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
