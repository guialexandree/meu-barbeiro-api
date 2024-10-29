import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';

@Injectable()
export class RemoveServiceUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly servicesRepository: IServicesRepository,
  ) {}

  async execute (id: string){
    const service = await this.servicesRepository.remove(id)
    return service
  }
}
