import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesOfficeHour } from './entities/companies-office-hour.entity';

export interface ICompaniesOfficeHoursRepository {
  save(input: CompaniesOfficeHour): Promise<CompaniesOfficeHour>;
}

@Injectable()
export class CompaniesOfficeHoursRepository implements ICompaniesOfficeHoursRepository {
  constructor(
    @InjectRepository(CompaniesOfficeHour)
    private repository: Repository<CompaniesOfficeHour>,
  ) {}

  save(input: CompaniesOfficeHour): Promise<CompaniesOfficeHour> {
    return this.repository.save(input);
  }
}
