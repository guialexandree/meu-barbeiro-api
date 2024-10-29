import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';
import { ServiceStatus } from '../entities/service.entity';

@Injectable()
export class GetServicesUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly serviceRepository: IServicesRepository,
  ) {}

  async execute (){
    const services = await this.serviceRepository.findAll()
    const servicesAvailables = services.filter(service => service.status === ServiceStatus.Ativo)

    return {
      services: servicesAvailables,
      alerts: ['No mês de dezembro o corte terá acréscimo, novo valor será R$ 35']
    }
  }
}
