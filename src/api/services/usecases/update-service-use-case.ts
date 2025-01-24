import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { IDateAdapter } from '../../../infra/adapters/protocols';

@Injectable()
export class UpdateServiceUseCase {
  constructor(
    @Inject('IServicesRepository')
    private readonly servicesRepository: IServicesRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter
  ) {}

  async execute (id: string, input: UpdateServiceDto){
    const project = await this.servicesRepository.findOne(id);

    input.status && (project.status = input.status);
    input.name && (project.name = input.name);
    input.description && (project.description = input.description);
    input.price > 0 && (project.price = input.price);
    input.timeExecution > 0 && (project.timeExecution = input.timeExecution);
    project.updatedAt = this.dateAdapter.now();

    return this.servicesRepository.save(project)
  }
}
