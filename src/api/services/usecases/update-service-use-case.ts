import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';
import { UpdateServiceDto } from '../dto/update-service.dto';

@Injectable()
export class UpdateServiceUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly servicesRepository: IServicesRepository,
  ) {}

  async execute (id: string, input: UpdateServiceDto){
    const project = await this.servicesRepository.findOne(id);

    input.status && (project.status = input.status);
    input.name && (project.name = input.name);
    input.description && (project.description = input.description);
    input.amount > 0 && (project.price = input.amount);
    input.time_execution > 0 && (project.time_execution = input.time_execution);
    input.updated_at = new Date();

    return this.servicesRepository.save(project)
  }
}
