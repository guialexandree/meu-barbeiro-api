import { Inject, Injectable } from '@nestjs/common'
import { IAlertsRepository } from '../alerts.repository'
import { CreateAlertDto } from '../dto/create-alert.dto'
import { Alert } from '../entities/alert.entity'
import { UpdateAlertUseCase } from './update-alert-use-case'
import { CompaniesService } from '../../companies/companies.service'
import { IDateAdapter } from '../../../infra/adapters/protocols'
import { Company } from '../../companies/entities/company.entity'

@Injectable()
export class CreateAlertUseCase {
  constructor(
    @Inject('IAlertsRepository')
    private readonly alertsRepository: IAlertsRepository,
    @Inject()
    private readonly updateAlertUseCase: UpdateAlertUseCase,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute(input: CreateAlertDto) {
    const alertExists = await this.alertsRepository.findByType(input.type)
    if (alertExists) {
      return this.updateAlertUseCase.execute(alertExists.id, input)
    }

    const newAlert = new Alert({
      ...input,
      createdAt: this.dateAdapter.now(),
    })
    const alert = await this.alertsRepository.save(newAlert)
    return alert
  }
}
