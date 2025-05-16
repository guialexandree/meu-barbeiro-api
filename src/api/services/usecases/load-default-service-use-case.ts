import { Inject, Injectable } from '@nestjs/common'
import { IServicesRepository } from '../services.repository'

@Injectable()
export class LoadDefaultServiceUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly servicesRepository: IServicesRepository,
  ) {}

  async execute() {
    const defaultService = await this.servicesRepository.loadDefault()
    return defaultService
  }
}
