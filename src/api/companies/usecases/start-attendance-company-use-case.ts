import { Inject, Injectable, Logger } from '@nestjs/common'
import { ICompaniesRepository } from '../companies.repository'
import { StatusAttendanceCompany } from '../entities/company.entity'

@Injectable()
export class StartAttendanceCompanyUseCase {
  private readonly logger = new Logger(StartAttendanceCompanyUseCase.name)

  constructor(
    @Inject('ICompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository,
  ) {}

  async execute() {
    const company = await this.companiesRepository.findFirst()
    company.statusAttendance = StatusAttendanceCompany.Serving

    await this.companiesRepository.save(company)
    this.logger.verbose(JSON.stringify(company))

    return company
  }
}
