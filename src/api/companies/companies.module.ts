import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { CompaniesRepository } from './companies.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { DateAdapterModule } from '../../infra/adapters/date-adapter/dayjs-adapter/date-adapter.module'
import { CreateCompanyUseCase, EndAttendanceCompanyUseCase, GetCompanyIdUseCase, GetCompanyUseCase, SeedCompanyUseCase, StartAttendanceCompanyUseCase } from './usecases/'

@Module({
  imports: [DateAdapterModule, TypeOrmModule.forFeature([Company])],
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
