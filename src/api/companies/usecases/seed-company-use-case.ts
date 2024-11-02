import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICompaniesRepository } from '../companies.repository';
import { Company } from '../entities/company.entity';
import { CompaniesOfficeHour } from 'src/api/companies-office-hours/entities/companies-office-hour.entity';
import { CompaniesOfficeHoursService } from 'src/api/companies-office-hours/companies-office-hours.service';
import { IDateAdapter } from 'src/infra/adapters/protocols';

@Injectable()
export class SeedCompanyUseCase {
  private readonly logger = new Logger(SeedCompanyUseCase.name);

  constructor(
    @Inject('ICompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository,
    @Inject()
    private readonly companiesOfficeHoursService: CompaniesOfficeHoursService,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter
  ) {}

  async execute() {
    const companiesCount = await this.companiesRepository.count();

    if (companiesCount === 0) {
      this.logger.verbose('Seeding Companies ###');
      const newCompany = new Company({
        name: 'Barbearia',
        pix: 'afg389f298fbujh9uh32901hbf6acb0',
      });

      const company = await this.companiesRepository.save(newCompany);
      this.logger.verbose(JSON.stringify(company));

      const startTime = this.dateAdapter.now();
      const endTime = this.dateAdapter.now();
      startTime.setHours(8, 30);
      endTime.setHours(22);

      const hoursWeekDays = [
        {
          weekDay: 1,
          start: startTime,
          end: endTime,
          company,
        },
        {
          weekDay: 2,
          start: startTime,
          end: endTime,
          company,
        },
        {
          weekDay: 3,
          start: startTime,
          end: endTime,
          company,
        },
        {
          weekDay: 4,
          start: startTime,
          end: endTime,
          company,
        },
        {
          weekDay: 5,
          start: startTime,
          end: endTime,
          company,
        },
        {
          weekDay: 6,
          start: startTime,
          end: endTime,
          company,
        },
        {
          weekDay: 7,
          start: startTime,
          end: endTime,
          company,
        },
      ];

      const jobs: Promise<CompaniesOfficeHour>[] = [];
      for (const hoursWeekDay of hoursWeekDays) {
        jobs.push(this.companiesOfficeHoursService.create(hoursWeekDay));
      }

      return await Promise.all(jobs);
    }
  }
}
