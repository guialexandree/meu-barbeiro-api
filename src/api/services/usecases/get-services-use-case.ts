import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';

@Injectable()
export class GetServicesUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly serviceRepository: IServicesRepository,
  ) {}

  async execute (search: string) {
    if (search) {
      const services = await this.serviceRepository.findAllByName(search)
      return services
    }

    const services = await this.serviceRepository.findAll()
    return services
  }
}
