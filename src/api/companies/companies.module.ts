import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './companies.repository';
import { GetCompanyUseCase } from './usecases/get-company-use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { SeedCompanyUseCase } from './usecases/seed-company-use-case';
import { CreateCompanyUseCase } from './usecases/create-company-use-case';
import { GetCompanyIdUseCase } from './usecases/get-company-id-use-case';
import { DateAdapterModule } from '../../infra/adapters/date-adapter/dayjs-adapter/date-adapter.module';

@Module({
  imports: [
    DateAdapterModule,
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    GetCompanyUseCase,
    GetCompanyIdUseCase,
    SeedCompanyUseCase,
    CreateCompanyUseCase,
    CompaniesRepository,
    {
      provide: 'ICompaniesRepository',
      useExisting: CompaniesRepository,
    },
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
