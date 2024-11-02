import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetServiceUseCase } from './usecases/get-service-use-case';
import { CreateServiceUseCase } from './usecases/create-service-use-case';
import { UpdateServiceUseCase } from './usecases/update-service-use-case';
import { GetAllServicesUseCase } from './usecases/get-all-services-use-case';
import { GetServicesUseCase } from './usecases/get-services-use-case';
import { SeedServicesUseCase } from './usecases/seed-services-use-case';

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @Inject()
    private getAllServicesUseCase: GetAllServicesUseCase,
    private getServicesUseCase: GetServicesUseCase,
    private getServiceUseCase: GetServiceUseCase,
    private createServiceUseCase: CreateServiceUseCase,
    private updateServiceUseCase: UpdateServiceUseCase,
    private seedServicesUseCase: SeedServicesUseCase,
  ) {}

  onModuleInit() {
    return this.seedServicesUseCase.execute();
  }

  create(createServicoDto: CreateServiceDto) {
    return this.createServiceUseCase.execute(createServicoDto);
  }

  findAll() {
    return this.getAllServicesUseCase.execute();
  }

  findServices() {
    return this.getServicesUseCase.execute();
  }

  findOne(id: string) {
    return this.getServiceUseCase.execute(id);
  }

  async update(id: string, updateServicoDto: UpdateServiceDto) {
    return this.updateServiceUseCase.execute(id, updateServicoDto);
  }

  remove(id: string) {
    return `This action removes a #${id} servico`;
  }
}
