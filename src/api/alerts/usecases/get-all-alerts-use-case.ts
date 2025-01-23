import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAlertsRepository } from '../alerts.repository';

@Injectable()
export class GetAllAlertsUseCase {
  constructor(
    @Inject('IAlertsRepository')
    private readonly alertsRepository: IAlertsRepository,
  ) {}

  async execute() {
    const alerts = await this.alertsRepository.findAll();
    return alerts;
  }
}
