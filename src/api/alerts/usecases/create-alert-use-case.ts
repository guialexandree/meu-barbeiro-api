import { Inject, Injectable } from '@nestjs/common';
import { IAlertsRepository } from '../alerts.repository';
import { CreateAlertDto } from '../dto/create-alert.dto';
import { Alert } from '../entities/alert.entity';
import { Company } from 'src/api/companies/entities/company.entity';
import { CompaniesService } from 'src/api/companies/companies.service';
import { IDateAdapter } from 'src/infra/adapters/protocols';
import { AlertsService } from '../alerts.service';
import { UpdateAlertUseCase } from './update-alert-use-case';

@Injectable()
export class CreateAlertUseCase {
  constructor(
    @Inject('IAlertsRepository')
    private readonly alertsRepository: IAlertsRepository,
    @Inject()
    private readonly companiesService: CompaniesService,
    @Inject()
    private readonly updateAlertUseCase: UpdateAlertUseCase,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute(input: CreateAlertDto) {
    const alertExists = await this.alertsRepository.findByType(input.type);
    if (alertExists) {
      return this.updateAlertUseCase.execute(alertExists.id, input);
    }

    const companyId = await this.companiesService.findId();
    const newAlert = new Alert({
      ...input,
      company: new Company({}, companyId),
      createdAt: this.dateAdapter.now(),
    });
    const alert = await this.alertsRepository.save(newAlert);
    return alert;
  }
}
