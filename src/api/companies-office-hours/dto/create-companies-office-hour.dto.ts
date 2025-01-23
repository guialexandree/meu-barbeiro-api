import { Company } from '@/api/companies/entities/company.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompaniesOfficeHoursDto {
  @ApiProperty()
  weekDay: number;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  company: Company;
}
