import { Inject, Injectable } from '@nestjs/common';
import { IAlertsRepository } from '../alerts.repository';
import { RemoveAlertDto } from '../dto/remove-alert.dto';

@Injectable()
export class RemoveAlertUseCase {
  constructor(
    @Inject('IAlertsRepository')
    private readonly alertsRepository: IAlertsRepository,
  ) {}

  async execute(removeAlertDto: RemoveAlertDto) {
    const alertExists = await this.alertsRepository.findById(removeAlertDto.id);
    if (!alertExists) {
      throw new Error('Alert already not exists');
    }

    await this.alertsRepository.remove(alertExists);

    return alertExists;
  }
}
