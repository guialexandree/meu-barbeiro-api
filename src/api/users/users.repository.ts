import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

export interface IUsersRepository {
  findUser(username: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByDeviceId(device_id: string): Promise<User>;
  save(service: User): Promise<User>;
  count(): Promise<number>;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  findUser(username: string): Promise<User> {
    return this.repository.findOneBy({ username });
  }

  findById(id: string): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  findByDeviceId(device_id: string): Promise<User> {
    return this.repository.findOneBy({ deviceId: device_id });
  }

  save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  count(): Promise<number> {
    return this.repository.count();
  }
}
