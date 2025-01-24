import { Module } from '@nestjs/common'
import { ServicesService } from './services.service'
import { ServicesController } from './services.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from './entities/service.entity'
import { ServicesRepository } from './services.repository'
import { AlertsModule } from '../alerts/alerts.module'
import { DateAdapterModule } from '../../infra/adapters/date-adapter/dayjs-adapter/date-adapter.module'
import {
  CreateServiceUseCase,
  GetAllServicesUseCase,
  GetServicesUseCase,
  GetServiceUseCase,
  RemoveServiceUseCase,
  SeedServicesUseCase,
  UpdateServiceUseCase,
} from './usecases'

@Module({
  imports: [
    AlertsModule,
    DateAdapterModule,
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    GetAllServicesUseCase,
    GetServicesUseCase,
    GetServiceUseCase,
    UpdateServiceUseCase,
    CreateServiceUseCase,
    RemoveServiceUseCase,
    SeedServicesUseCase,
    ServicesRepository,
    {
      provide: 'IServicesRepository',
      useExisting: ServicesRepository,
    },
  ],
  exports: [ServicesService],
})
export class ServicesModule {}
