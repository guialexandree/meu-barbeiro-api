import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

export interface IUsersRepository {
  findUser(username: string): Promise<User>;
  save(service: User): Promise<User>;
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

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
