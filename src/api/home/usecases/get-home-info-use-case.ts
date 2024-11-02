import { Inject, Injectable, Logger } from '@nestjs/common';
import { CompaniesService } from 'src/api/companies/companies.service';

@Injectable()
export class GetHomeInfoUseCase {
  private readonly logger = new Logger(GetHomeInfoUseCase.name)

  constructor(
    @Inject()
    private readonly companiesService: CompaniesService,
  ) {}

  async execute() {
    const company = await this.companiesService.find();
    this.logger.verbose(JSON.stringify(company))

  }
}
