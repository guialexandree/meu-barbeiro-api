import { Injectable } from '@nestjs/common';
import { CreateCompaniesOfficeHoursDto } from './dto/create-companies-office-hour.dto';
import { CreateCompaniesOfficeHoursUseCase } from './usecases/create-companies-office-hours';

@Injectable()
export class CompaniesOfficeHoursService {
  constructor (
    private readonly createCompaniesOfficeHours: CreateCompaniesOfficeHoursUseCase
  ){}

  create(createCompaniesOfficeHourDto: CreateCompaniesOfficeHoursDto) {
    return this.createCompaniesOfficeHours.execute(createCompaniesOfficeHourDto);
  }
}
