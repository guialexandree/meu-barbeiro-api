import { Inject, Injectable } from '@nestjs/common'
import { IServicesRepository } from '../services.repository'

@Injectable()
export class SetDefaultServiceUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly servicesRepository: IServicesRepository,
  ) {}

  async execute(id: string) {
    const project = await this.servicesRepository.findOne(id)

    await this.servicesRepository.removeDefault()
    project.default = true

    return this.servicesRepository.save(project)
  }
}
