import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';
import { CreateServiceDto } from '../dto/create-service.dto';
import { Service, ServiceStatus } from '../entities/service.entity';

@Injectable()
export class CreateServiceUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly servicesRepository: IServicesRepository,
  ) {}

  async execute (input: CreateServiceDto){
    const serviceParams = {
      ...input,
      created_at: new Date(),
      updated_at: new Date(),
      status: ServiceStatus.Ativo,
    };

    const service = new Service(serviceParams)
    return this.servicesRepository.save(service)
  }
}
