import { Inject, Injectable, Logger } from '@nestjs/common'
import { ICompaniesRepository } from '../companies.repository'
import { Company } from '../entities/company.entity'

@Injectable()
export class SeedCompanyUseCase {
  private readonly logger = new Logger(SeedCompanyUseCase.name)

  constructor(
    @Inject('ICompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute() {
    const companiesCount = await this.companiesRepository.count()

    if (companiesCount === 0) {
      this.logger.verbose('Seeding Companies ###')
      const newCompany = new Company({
        name: 'Barbearia',
        pix: 'afg389f298fbujh9uh32901hbf6acb0',
      })

      const company = await this.companiesRepository.save(newCompany)
      this.logger.verbose(JSON.stringify(company))

      return company
    }
  }
}
