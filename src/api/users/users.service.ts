import { Inject, Injectable, OnModuleInit, Request } from '@nestjs/common'
import { GetUserUseCase } from './usecases/get-user-user-case'
import { CreateUserDto } from './dto/create-user.dto'
import { CreateUserUseCase } from './usecases/create-user-use-case'
import { GetUserByIdUseCase } from './usecases/get-user-by-id-use-case'
import { SeedUsersUseCase } from './usecases/seed-users-use-case'
import { ChangeNameUseCase } from './usecases/change-name-use-case'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject()
    private getUserUseCase: GetUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private changeNameUseCase: ChangeNameUseCase,
    private seedUserUseCase: SeedUsersUseCase,
  ) {}

  onModuleInit() {
    return this.seedUserUseCase.execute()
  }

  findById(id: string) {
    return this.getUserByIdUseCase.execute(id)
  }

  findOne(userName: string) {
    return this.getUserUseCase.execute(userName)
  }

  create(user: CreateUserDto) {
    return this.createUserUseCase.execute(user)
  }

  changeName(@Request() req, name: string) {
    return this.changeNameUseCase.execute(name, req.user.id)
  }
}
