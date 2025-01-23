import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserRole } from '../entities/user.entity';
import { IDateAdapter } from '@/infra/adapters/protocols';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute (input: CreateUserDto){
    const user = new User({
      ...input,
      role: input.role ?? UserRole.Client,
      createdAt: this.dateAdapter.now()
    })

    return this.userRepository.save(user)
  }
}
