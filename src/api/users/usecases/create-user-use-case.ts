import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute (input: CreateUserDto){
    const userParams = {
      ...input,
      role: input.role ?? UserRole.Visit,
      whatsapp: '',
      email: '',
      created_at: new Date()
    };

    const user = new User(userParams)
    return this.userRepository.save(user)
  }
}
