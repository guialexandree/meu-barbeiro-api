import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert, AlertType } from './entities/alert.entity';

export interface IAlertsRepository {
  save(alert: Alert): Promise<Alert>;
  findAll(): Promise<Alert[]>;
  findById(id: string): Promise<Alert>;
  remove(alert: Alert): Promise<Alert>;
  findByType(type: AlertType): Promise<Alert>;
  count(): Promise<number>;
}

@Injectable()
export class AlertsRepository implements IAlertsRepository {
  constructor(
    @InjectRepository(Alert)
    private repository: Repository<Alert>,
  ) {}

  findByType(type: AlertType): Promise<Alert> {
    return this.repository.findOneBy({ type });
  }

  findById(id: string): Promise<Alert> {
    return this.repository.findOneByOrFail({ id });
  }

  findAll(): Promise<Alert[]> {
    return this.repository.find();
  }

  count(): Promise<number> {
    return this.repository.count();
  }

  async remove(alert: Alert): Promise<Alert> {
    return this.repository.remove(alert);
  }

  async save(alert: Alert): Promise<Alert> {
    return this.repository.save(alert);
  }
}
