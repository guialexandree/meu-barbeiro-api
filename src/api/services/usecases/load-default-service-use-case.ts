import { Inject, Injectable } from '@nestjs/common'
import { IServicesRepository } from '../services.repository'

@Injectable()
export class LoadDefaultServiceUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly servicesRepository: IServicesRepository,
  ) {}

  async execute() {
    const project = await this.servicesRepository.loadDefault()

    await this.servicesRepository.removeDefault()
    project.default = true

    return this.servicesRepository.save(project)
  }
}
