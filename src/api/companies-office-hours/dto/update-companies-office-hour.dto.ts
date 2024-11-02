import { PartialType } from '@nestjs/swagger';
import { CreateCompaniesOfficeHoursDto } from './create-companies-office-hour.dto';

export class UpdateCompaniesOfficeHourDto extends PartialType(CreateCompaniesOfficeHoursDto) {}
