import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/api/companies/entities/company.entity';

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
