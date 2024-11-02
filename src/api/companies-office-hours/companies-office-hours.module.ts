import { Module } from '@nestjs/common';
import { CompaniesOfficeHoursService } from './companies-office-hours.service';
import { CompaniesOfficeHoursController } from './companies-office-hours.controller';
import { CreateCompaniesOfficeHoursUseCase } from './usecases/create-companies-office-hours';
import { CompaniesOfficeHoursRepository } from './companies-office-hours.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesOfficeHour } from './entities/companies-office-hour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesOfficeHour])],
  controllers: [CompaniesOfficeHoursController],
  providers: [
    CompaniesOfficeHoursService,
    CreateCompaniesOfficeHoursUseCase,
    CompaniesOfficeHoursRepository,
    {
      provide: 'ICompaniesOfficeHoursRepository',
      useExisting: CompaniesOfficeHoursRepository
    }
  ],
  exports: [CompaniesOfficeHoursService]
})
export class CompaniesOfficeHoursModule {}
