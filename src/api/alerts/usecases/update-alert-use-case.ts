import { Inject, Injectable } from '@nestjs/common';
import { IAlertsRepository } from '../alerts.repository';
import { UpdateAlertDto } from '../dto/update-alert.dto';
import { IDateAdapter } from '../../../infra/adapters/protocols';

@Injectable()
export class UpdateAlertUseCase {
  constructor(
    @Inject('IAlertsRepository')
    private readonly alertsRepository: IAlertsRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute(id: string, input: UpdateAlertDto) {
    const alert = await this.alertsRepository.findById(id);

    input.message && (alert.message = input.message);
    input.status && (alert.status = input.status);

    await this.alertsRepository.save(alert);

    return alert;
  }
}
