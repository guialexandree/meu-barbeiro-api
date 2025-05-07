import { Inject, Injectable, Logger } from '@nestjs/common'
import { IAlertsRepository } from '../alerts.repository'
import { Alert, AlertType } from '../entities/alert.entity'
import { IDateAdapter } from '../../../infra/adapters/protocols'

@Injectable()
export class SeedAlertsUseCase {
  private readonly logger = new Logger(SeedAlertsUseCase.name)

  constructor(
    @Inject('IAlertsRepository')
    private readonly alertsRepository: IAlertsRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute() {
    const alertsCount = await this.alertsRepository.count()

    if (alertsCount === 0) {
      this.logger.verbose('Seeding Alerts ###')

      const newAlerts = [
        {
          message:
            'No mês de dezembro o corte terá acréscimo, novo valor será R$ 35',
          type: AlertType.Home,
          createdAt: this.dateAdapter.now(),
        },
        {
          message: 'A partir de janeiro o preço do corte será R$ 35',
          type: AlertType.Servicos,
          createdAt: this.dateAdapter.now(),
        },
      ]

      const jobs: Promise<Alert>[] = []
      for (const alert of newAlerts) {
        const newAlert = new Alert(alert)
        jobs.push(this.alertsRepository.save(newAlert))
      }
      await Promise.all(jobs)
    }
  }
}
