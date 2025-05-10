import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { Service } from './entities/service.entity'
import { ISocketAdapter } from '../../infra/adapters/protocols'
import { CreateServiceDto, GetServicesDto, UpdateServiceDto } from './dto'
import * as UC from './usecases'

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @Inject()
    private readonly getServicesUseCase: UC.GetServicesUseCase,
    private readonly getActivedServicesUseCase: UC.GetActivedServicesUseCase,
    private readonly getServicesListUseCase: UC.GetServicesListUseCase,
    private readonly getServiceUseCase: UC.GetServiceUseCase,
    private readonly createServiceUseCase: UC.CreateServiceUseCase,
    private readonly updateServiceUseCase: UC.UpdateServiceUseCase,
    private readonly setDefaultServiceUseCase: UC.SetDefaultServiceUseCase,
    private readonly removeServiceUseCase: UC.RemoveServiceUseCase,
    private readonly loadDefaultServiceUseCase: UC.LoadDefaultServiceUseCase,
    private readonly seedServicesUseCase: UC.SeedServicesUseCase,
    @Inject('ISocketAdapter')
    private readonly socketAdapter: ISocketAdapter
  ) {}

  onModuleInit() {
    return this.seedServicesUseCase.execute()
  }

  async create(createServicoDto: CreateServiceDto) {
    const service = await this.createServiceUseCase.execute(createServicoDto)
    this.socketAdapter.notify('new_service', service)
    return service
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

  loadDefault() {
    return this.loadDefaultServiceUseCase.execute()
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
    this.socketAdapter.notify('update_service', service)
    return service
  }

  async setDefault(id: string) {
    const service = await this.setDefaultServiceUseCase.execute(id)
    return service
  }

  async remove(id: string) {
    const service = await this.removeServiceUseCase.execute(id)
    this.socketAdapter.notify('remove_service', service)
    return service
  }
}
