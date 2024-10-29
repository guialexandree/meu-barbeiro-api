import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';

@Injectable()
export class GetAllServicesUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly serviceRepository: IServicesRepository,
  ) {}

  async execute (){
    const services = await this.serviceRepository.findAll()
    return services
  }
}
