import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GetCompanyUseCase } from './usecases/get-company-use-case';
import { SeedCompanyUseCase } from './usecases/seed-company-use-case';
import { CreateCompanyUseCase } from './usecases/create-company-use-case';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService implements OnModuleInit{
  constructor(
    @Inject()
    private readonly getCompany: GetCompanyUseCase,
    private readonly seedCompany: SeedCompanyUseCase,
    private readonly createCompany: CreateCompanyUseCase,
  ) {}

  onModuleInit() {
    return this.seedCompany.execute();
  }

  save(input: CreateCompanyDto) {
    return this.createCompany.execute(input);
  }

  find() {
    return this.getCompany.execute();
  }
}
