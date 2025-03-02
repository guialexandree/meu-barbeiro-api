import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { GetServiceUseCase } from './usecases/get-service-use-case'
import { CreateServiceUseCase } from './usecases/create-service-use-case'
import { UpdateServiceUseCase } from './usecases/update-service-use-case'
import { GetServicesListUseCase } from './usecases/get-services-list-use-case'
import { SeedServicesUseCase } from './usecases/seed-services-use-case'
import { RemoveServiceUseCase } from './usecases/remove-service-use-case'
import { Service, ServiceStatus } from './entities/service.entity'
import { GetActivedServicesUseCase } from './usecases/get-actived-services-use-case'
import { GetServicesUseCase } from './usecases/get-services-use-case'
import { GetServicesDto } from './dto'

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @Inject()
    private getServicesUseCase: GetServicesUseCase,
    private getActivedServicesUseCase: GetActivedServicesUseCase,
    private getServicesListUseCase: GetServicesListUseCase,
    private getServiceUseCase: GetServiceUseCase,
    private createServiceUseCase: CreateServiceUseCase,
    private updateServiceUseCase: UpdateServiceUseCase,
    private removeServiceUseCase: RemoveServiceUseCase,
    private seedServicesUseCase: SeedServicesUseCase,
  ) {}

  onModuleInit() {
    return this.seedServicesUseCase.execute()
  }

  async create(createServicoDto: CreateServiceDto) {
    const { id } = await this.createServiceUseCase.execute(createServicoDto)
    return { id }
  }

  async findAll(getServicesDto: GetServicesDto) {
    let services: Service[] = []

    if (!!getServicesDto.status) {
      services = await this.getActivedServicesUseCase.execute(getServicesDto.status)
      return services.filter((service) =>
        service.name.toLowerCase().includes(getServicesDto.search?.toLowerCase()),
      )
    } else {
      services = await this.getServicesUseCase.execute(getServicesDto.search)
    }

    return services
  }

  findServices() {
    return this.getServicesListUseCase.execute()
  }

  findOne(id: string) {
    return this.getServiceUseCase.execute(id)
  }

  async update(id: string, updateServicoDto: UpdateServiceDto) {
    return this.updateServiceUseCase.execute(id, updateServicoDto)
  }

  remove(id: string) {
    return this.removeServiceUseCase.execute(id)
  }
}
