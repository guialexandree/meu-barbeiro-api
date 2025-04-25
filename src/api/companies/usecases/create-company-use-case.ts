import { Inject, Injectable } from '@nestjs/common'
import { ICompaniesRepository } from '../companies.repository'
import { CreateCompanyDto } from '../dto/create-company.dto'
import { Company } from '../entities/company.entity'

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject('ICompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository,
  ) {}

  async execute(input: CreateCompanyDto) {
    const newCompany = new Company(input)
    return await this.companiesRepository.save(newCompany)
  }
}
