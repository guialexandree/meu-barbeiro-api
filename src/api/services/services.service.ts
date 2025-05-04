import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { GetServiceUseCase } from './usecases/get-service-use-case'
import { CreateServiceUseCase } from './usecases/create-service-use-case'
import { UpdateServiceUseCase } from './usecases/update-service-use-case'
import { GetServicesListUseCase } from './usecases/get-services-list-use-case'
import { SeedServicesUseCase } from './usecases/seed-services-use-case'
import { RemoveServiceUseCase } from './usecases/remove-service-use-case'
import { Service } from './entities/service.entity'
import { GetActivedServicesUseCase } from './usecases/get-actived-services-use-case'
import { GetServicesUseCase } from './usecases/get-services-use-case'
import { GetServicesDto } from './dto'
import { ServicesGateway } from './services.gateway'

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @Inject()
    private readonly getServicesUseCase: GetServicesUseCase,
    private readonly getActivedServicesUseCase: GetActivedServicesUseCase,
    private readonly getServicesListUseCase: GetServicesListUseCase,
    private readonly getServiceUseCase: GetServiceUseCase,
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
    private readonly removeServiceUseCase: RemoveServiceUseCase,
    private readonly seedServicesUseCase: SeedServicesUseCase,
    private readonly servicesGateway: ServicesGateway
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

  async findOne(id: string) {
    const service = await this.getServiceUseCase.execute(id)
    if (!service) {
      throw new HttpException('O serviço não foi encontrado', 404)
    }

    return service
  }

  async update(id: string, updateServicoDto: UpdateServiceDto) {
    const service = await this.updateServiceUseCase.execute(id, updateServicoDto)
    this.servicesGateway.notifyUpdate(service)
    return service
  }

  async remove(id: string) {
    const service = await this.removeServiceUseCase.execute(id)
    this.servicesGateway.notifyRemove(id)
    return service
  }
}
