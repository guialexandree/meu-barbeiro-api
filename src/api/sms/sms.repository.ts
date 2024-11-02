import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sms } from './entities/sms.entity';

export interface ISmsRepository {
  save(registration: Sms): Promise<Sms>;
}

@Injectable()
export class SmsRepository implements ISmsRepository {
  constructor(
    @InjectRepository(Sms)
    private repository: Repository<Sms>,
  ) {}

  save(sms: Sms): Promise<Sms> {
    return this.repository.save(sms);
  }

}
