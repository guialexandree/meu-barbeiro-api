import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';

export interface IRegistrationRepository {
  save(registration: Registration): Promise<string>;
  findByContactNumber(contactNumber: string): Promise<Registration>;
}

@Injectable()
export class RegistrationRepository implements IRegistrationRepository {
  constructor(
    @InjectRepository(Registration)
    private repository: Repository<Registration>,
  ) {}

  async save(registration: Registration): Promise<string> {
    const newRegistration = await this.repository.save(registration);
    return newRegistration.id
  }

  findByContactNumber(contact_number: string): Promise<Registration> {
    return this.repository.findOne({
      where: { contactNumber: contact_number },

    });
  }
}
