import { Inject, Injectable } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { IDateAdapter } from 'src/infra/adapters/protocols';

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
    input.amount > 0 && (project.price = input.amount);
    input.timeExecution > 0 && (project.timeExecution = input.timeExecution);
    input.updatedAt = this.dateAdapter.now();

    return this.servicesRepository.save(project)
  }
}
