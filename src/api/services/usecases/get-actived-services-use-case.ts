import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';
import { ServiceStatus } from '../entities/service.entity';

@Injectable()
export class GetActivedServicesUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly serviceRepository: IServicesRepository,
  ) {}

  async execute (active: ServiceStatus) {
    const services = await this.serviceRepository.findByStatus(active)
    return services
  }
}
