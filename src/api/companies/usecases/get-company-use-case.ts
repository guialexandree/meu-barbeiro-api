import { Inject, Injectable } from '@nestjs/common';
import { ICompaniesRepository } from '../companies.repository';

@Injectable()
export class GetCompanyUseCase {
  constructor(
    @Inject('ICompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository,
  ) {}

  async execute() {
    const company = await this.companiesRepository.find();
    return company
  }
}
