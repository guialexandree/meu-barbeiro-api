import { Controller, Post, Body } from '@nestjs/common';
import { CompaniesOfficeHoursService } from './companies-office-hours.service';
import { CreateCompaniesOfficeHoursDto } from './dto/create-companies-office-hour.dto';

@Controller('companies-office-hours')
export class CompaniesOfficeHoursController {
  constructor(private readonly companiesOfficeHoursService: CompaniesOfficeHoursService) {}

  @Post()
  create(@Body() createCompaniesOfficeHourDto: CreateCompaniesOfficeHoursDto) {
    return this.companiesOfficeHoursService.create(createCompaniesOfficeHourDto);
  }
}
