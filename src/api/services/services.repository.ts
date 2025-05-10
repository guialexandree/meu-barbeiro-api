import { Injectable } from '@nestjs/common'
import { ILike, Like, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Service, ServiceStatus } from './entities/service.entity'

export interface IServicesRepository {
  findAllByName(name: string): Promise<Service[]>
  findByName(name: string): Promise<Service>
  findByStatus(status: ServiceStatus): Promise<Service[]>
  findOne(id: string): Promise<Service>
  remove(id: string): Promise<Service>
  findAll(): Promise<Service[]>
  loadDefault(): Promise<Service>
  count(): Promise<number>
  save(service: Service): Promise<Service>
  removeDefault(): Promise<void>
}

@Injectable()
export class ServicesRepository implements IServicesRepository {
  constructor(
    @InjectRepository(Service)
    private repository: Repository<Service>,
  ) {}

  async findAllByName(name: string): Promise<Service[]> {
    const whereCondition = name ? { name: Like(`%${name}%`) } : {}
    return this.repository.find({ where: whereCondition })
  }

  async removeDefault(): Promise<void> {
    await this.repository.update({}, { default: true })
  }

  async findByStatus(status: ServiceStatus): Promise<Service[]> {
    return this.repository.find({ where: { status } })
  }

  async loadDefault(): Promise<Service> {
    return this.repository.findOne({ where: { default: true } })
  }

  async findByName(name: string): Promise<Service> {
    return this.repository.findOne({ where: { name: ILike(`%${name}%`) } })
  }

  findOne(id: string): Promise<Service> {
    return this.repository.findOneBy({ id })
  }

  findAll(): Promise<Service[]> {
    return this.repository.find()
  }

  count(): Promise<number> {
    return this.repository.count()
  }

  async save(service: Service): Promise<Service> {
    return this.repository.save(service)
  }

  async remove(id: string): Promise<Service> {
    const service = await this.findOne(id)
    return this.repository.remove(service)
  }
}
