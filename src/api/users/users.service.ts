import { Inject, Injectable, OnModuleInit, Request } from '@nestjs/common'
import { CreateUserParamsDto } from './dto/create-user.dto'
import { CreateUserUseCase } from './usecases/create-user-use-case'
import { GetUserByIdUseCase } from './usecases/load-user-by-id-use-case'
import { SeedUsersUseCase } from './usecases/seed-users-use-case'
import { ChangeNameUseCase } from './usecases/change-name-use-case'
import { LoadUsersUseCase } from './usecases/load-users-use-case'
import { LoadUserByNameUseCase } from './usecases/load-user-by-name-use-case'
import { LoadUsersTotalizerUseCase } from './usecases/load-users-totalizer-use-case'
import { LoadUsersParamsDto } from './dto'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject()
    private getUserUseCase: LoadUserByNameUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private changeNameUseCase: ChangeNameUseCase,
    private seedUserUseCase: SeedUsersUseCase,
    private loadUsersUseCase: LoadUsersUseCase,
    private loadUsersTotalizerUseCase: LoadUsersTotalizerUseCase,
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

  search(filters: LoadUsersParamsDto) {
    return this.loadUsersUseCase.execute(filters)
  }

  loadTotalizer() {
    return this.loadUsersTotalizerUseCase.execute()
  }

  create(user: CreateUserParamsDto) {
    return this.createUserUseCase.execute(user)
  }

  changeName(@Request() req, name: string) {
    return this.changeNameUseCase.execute(name, req.user.id)
  }
}
