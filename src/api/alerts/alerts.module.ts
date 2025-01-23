import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { AlertsRepository } from './alerts.repository';
import { SeedAlertsUseCase } from './usecases/seed-alerts-use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { CompaniesModule } from '../companies/companies.module';
import { DateAdapterModule } from 'src/infra/adapters/date-adapter';
import { GetAllAlertsUseCase } from './usecases/get-all-alerts-use-case';
import { CreateAlertUseCase } from './usecases/create-alert-use-case';
import { UpdateAlertUseCase } from './usecases/update-alert-use-case';
import { RemoveAlertUseCase } from './usecases/remove-alert-use-case';

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
    AlertsRepository,
    {
      provide: 'IAlertsRepository',
      useExisting: AlertsRepository,
    },
  ],
  exports: [AlertsService],
})
export class AlertsModule {}
