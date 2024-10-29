import { Inject, Injectable } from '@nestjs/common';
import { GetUserUseCase } from './usecases/get-user-user-case';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './usecases/create-user-use-case';

@Injectable()
export class UsersService {
  constructor(
    @Inject()
    private getUser: GetUserUseCase,
    private createUser: CreateUserUseCase
  ) {}

  findOne(userName: string) {
    return this.getUser.execute(userName);
  }

  create(user: CreateUserDto) {
    return this.createUser.execute(user);
  }

}
