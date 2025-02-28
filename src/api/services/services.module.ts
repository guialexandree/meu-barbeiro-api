import { Module } from '@nestjs/common'
import { ServicesService } from './services.service'
import { ServicesController } from './services.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from './entities/service.entity'
import { ServicesRepository } from './services.repository'
import { AlertsModule } from '../alerts/alerts.module'
import { DateAdapterModule } from '../../infra/adapters/date-adapter/dayjs-adapter/date-adapter.module'
import { CreateServiceUseCase } from './usecases/create-service-use-case'
import { GetServiceUseCase } from './usecases/get-service-use-case'
import { GetServicesListUseCase } from './usecases/get-services-list-use-case'
import { RemoveServiceUseCase } from './usecases/remove-service-use-case'
import { SeedServicesUseCase } from './usecases/seed-services-use-case'
import { UpdateServiceUseCase } from './usecases/update-service-use-case'
import { GetActivedServicesUseCase } from './usecases/get-actived-services-use-case'
import { GetServicesUseCase } from './usecases/get-services-use-case'

@Module({
  imports: [
    AlertsModule,
    DateAdapterModule,
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    GetServicesUseCase,
    GetServicesListUseCase,
    GetServiceUseCase,
    GetActivedServicesUseCase,
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
