import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesOfficeHoursController } from './companies-office-hours.controller';
import { CompaniesOfficeHoursService } from './companies-office-hours.service';

describe('CompaniesOfficeHoursController', () => {
  let controller: CompaniesOfficeHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesOfficeHoursController],
      providers: [CompaniesOfficeHoursService],
    }).compile();

    controller = module.get<CompaniesOfficeHoursController>(CompaniesOfficeHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
