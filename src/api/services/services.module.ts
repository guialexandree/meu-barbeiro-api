import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServicesRepository } from './services.repository';
import { GetServiceUseCase } from './usecases/get-service-use-case';
import { UpdateServiceUseCase } from './usecases/update-service-use-case';
import { CreateServiceUseCase } from './usecases/create-service-use-case';
import { RemoveServiceUseCase } from './usecases/remove-service-use-case';
import { GetAllServicesUseCase } from './usecases/get-all-services-use-case';
import { GetServicesUseCase } from './usecases/get-services-use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service])
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
    ServicesRepository,
    {
      provide: 'IServicesRepository',
      useExisting: ServicesRepository
    }
  ],
})
export class ServicesModule {}
