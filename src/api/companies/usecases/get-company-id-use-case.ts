import { Inject, Injectable } from '@nestjs/common';
import { ICompaniesRepository } from '../companies.repository';

@Injectable()
export class GetCompanyIdUseCase {
  constructor(
    @Inject('ICompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository,
  ) {}

  async execute() {
    const company = await this.companiesRepository.find();
    return company.id
  }
}
