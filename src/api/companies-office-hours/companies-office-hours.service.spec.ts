import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesOfficeHoursService } from './companies-office-hours.service';

describe('CompaniesOfficeHoursService', () => {
  let service: CompaniesOfficeHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesOfficeHoursService],
    }).compile();

    service = module.get<CompaniesOfficeHoursService>(CompaniesOfficeHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
