import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';

export interface IServicesRepository {
  findOne(id: string): Promise<Service>;
  remove(id: string): Promise<Service>;
  findAll(): Promise<Service[]>;
  count(): Promise<number>;
  save(service: Service): Promise<Service>;
}

@Injectable()
export class ServicesRepository implements IServicesRepository {
  constructor(
    @InjectRepository(Service)
    private repository: Repository<Service>,
  ) {}

  findOne(id: string): Promise<Service> {
    return this.repository.findOneByOrFail({ id });
  }

  findAll(): Promise<Service[]> {
    return this.repository.find();
  }

  count(): Promise<number> {
    return this.repository.count();
  }

  async save(service: Service): Promise<Service> {
    return this.repository.save(service);
  }

  async remove(id: string): Promise<Service> {
    const service = await this.findOne(id)
    return this.repository.remove(service)
  }
}
