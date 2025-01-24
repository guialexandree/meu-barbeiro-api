// filepath: /c:/Users/guilh/Desktop/dev24/susu-barbearia-api/src/api/alerts/alerts.module.ts
import { Module } from '@nestjs/common'
import { AlertsService } from './alerts.service.ts'
import { AlertsController } from './alerts.controller.ts'
import { SeedAlertsUseCase } from './usecases/seed-alerts-use-case.ts'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Alert } from './entities/alert.entity.ts'
import { CompaniesModule } from '@/api/companies/companies.module.ts'
import { DateAdapterModule } from '@/infra/adapters/date-adapter'
import { GetAllAlertsUseCase } from './usecases/get-all-alerts-use-case.ts'
import { CreateAlertUseCase } from './usecases/create-alert-use-case.ts'
import { UpdateAlertUseCase } from './usecases/update-alert-use-case.ts'
import { RemoveAlertUseCase } from './usecases/remove-alert-use-case.ts'

@Module({
  imports: [
    DateAdapterModule,
    CompaniesModule,
    TypeOrmModule.forFeature([Alert]),
  ],
  controllers: [AlertsController],
  providers: [
    AlertsService,
    SeedAlertsUseCase,
    GetAllAlertsUseCase,
    CreateAlertUseCase,
    UpdateAlertUseCase,
    RemoveAlertUseCase,
  ],
})
export class AlertsModule {}
