import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GetUserUseCase } from './usecases/get-user-user-case';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './usecases/create-user-use-case';
import { GetUserByIdUseCase } from './usecases/get-user-by-id-use-case';
import { GetUserByDeviceIdUseCase } from './usecases/get-user-by-device-id-use-case';
import { SeedUsersUseCase } from './usecases/seed-users-use-case';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject()
    private getUser: GetUserUseCase,
    private getUserById: GetUserByIdUseCase,
    private getUserByDeviceId: GetUserByDeviceIdUseCase,
    private createUser: CreateUserUseCase,
    private seedUser: SeedUsersUseCase,
  ) {}

  onModuleInit() {
    return this.seedUser.execute();
  }

  findById(id: string) {
    return this.getUserById.execute(id);
  }

  findByDeviceId(deviceId: string) {
    return this.getUserByDeviceId.execute(deviceId);
  }

  findOne(userName: string) {
    return this.getUser.execute(userName);
  }

  create(user: CreateUserDto) {
    return this.createUser.execute(user);
  }
}
