import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { UpdateAlertDto } from './dto/update-alert.dto'
import { GetAllAlertsUseCase } from './usecases/get-all-alerts-use-case'
import { CreateAlertUseCase } from './usecases/create-alert-use-case'
import { UpdateAlertUseCase } from './usecases/update-alert-use-case'
import { RemoveAlertUseCase } from './usecases/remove-alert-use-case'
import { SeedAlertsUseCase } from './usecases/seed-alerts-use-case'
import { CreateAlertDto, RemoveAlertDto } from '@/api/alerts/dto'

@Injectable()
export class AlertsService implements OnModuleInit {
  constructor(
    @Inject()
    private readonly createAlertUseCase: CreateAlertUseCase,
    private readonly updateAlertUseCase: UpdateAlertUseCase,
    private readonly removeAlertUseCase: RemoveAlertUseCase,
    private readonly seedAlertsUseCase: SeedAlertsUseCase,
    private readonly getAllAlertsUseCase: GetAllAlertsUseCase,
  ) {}

  onModuleInit() {
    return this.seedAlertsUseCase.execute()
  }

  remove(removeAlertDto: RemoveAlertDto) {
    return this.removeAlertUseCase.execute(removeAlertDto)
  }

  create(createAlertDto: CreateAlertDto) {
    return this.createAlertUseCase.execute(createAlertDto)
  }

  update(id: string, updateAlertDto: UpdateAlertDto) {
    return this.updateAlertUseCase.execute(id, updateAlertDto)
  }

  findAll() {
    return this.getAllAlertsUseCase.execute()
  }
}
