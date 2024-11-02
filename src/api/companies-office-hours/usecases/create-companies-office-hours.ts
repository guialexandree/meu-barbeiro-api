import { Inject, Injectable } from '@nestjs/common';
import { CreateCompaniesOfficeHoursDto } from '../dto/create-companies-office-hour.dto';
import { ICompaniesOfficeHoursRepository } from '../companies-office-hours.repository';
import { CompaniesOfficeHour } from '../entities/companies-office-hour.entity';

@Injectable()
export class CreateCompaniesOfficeHoursUseCase {
  constructor(
    @Inject('ICompaniesOfficeHoursRepository')
    private readonly companiesOfficeHoursRepository: ICompaniesOfficeHoursRepository,
  ) {}

  async execute (input: CreateCompaniesOfficeHoursDto){
    const companiesOfficeHours = new CompaniesOfficeHour(input)
    return this.companiesOfficeHoursRepository.save(companiesOfficeHours)
  }
}
