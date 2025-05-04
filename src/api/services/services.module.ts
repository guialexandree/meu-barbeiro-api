import { Module } from '@nestjs/common'
import { ServicesService } from './services.service'
import { ServicesController } from './services.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from './entities/service.entity'
import { ServicesRepository } from './services.repository'
import { AlertsModule } from '../alerts/alerts.module'
import { DateAdapterModule } from '../../infra/adapters/date-adapter/dayjs-adapter/date-adapter.module'
import { ServicesGateway } from './services.gateway'
import * as UC from './usecases'

@Module({
  imports: [
    AlertsModule,
    DateAdapterModule,
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [ServicesController],
  providers: [
    ServicesGateway,
    ServicesService,
    UC.GetServicesUseCase,
    UC.GetServicesListUseCase,
    UC.GetServiceUseCase,
    UC.GetActivedServicesUseCase,
    UC.UpdateServiceUseCase,
    UC.CreateServiceUseCase,
    UC.RemoveServiceUseCase,
    UC.SeedServicesUseCase,
    ServicesRepository,
    {
      provide: 'IServicesRepository',
      useExisting: ServicesRepository,
    },
  ],
  exports: [ServicesService],
})
export class ServicesModule {}
