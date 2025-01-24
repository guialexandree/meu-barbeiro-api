import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { AlertsRepository } from './alerts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { CompaniesModule } from '../companies/companies.module';
import { DateAdapterModule } from '../../infra/adapters/date-adapter';
import { CreateAlertUseCase, GetAllAlertsUseCase, RemoveAlertUseCase, SeedAlertsUseCase, UpdateAlertUseCase } from '@/api/alerts/usecases';

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
