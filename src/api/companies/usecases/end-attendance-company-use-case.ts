import { Inject, Injectable, Logger } from '@nestjs/common'
import { ICompaniesRepository } from '../companies.repository'
import { StatusAttendanceCompany } from '../entities/company.entity'

@Injectable()
export class EndAttendanceCompanyUseCase {
  private readonly logger = new Logger(EndAttendanceCompanyUseCase.name)

  constructor(
    @Inject('ICompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository,
  ) {}

  async execute() {
    const company = await this.companiesRepository.findFirst()
    company.statusAttendance = StatusAttendanceCompany.Closed

    await this.companiesRepository.save(company)
    this.logger.verbose(JSON.stringify(company))

    return company
  }
}
