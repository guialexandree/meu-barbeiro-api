import { Inject, Injectable, OnModuleInit, Request } from '@nestjs/common'
import { CreateUserParamsDto } from './dto/create-user.dto'
import { UsersGateway } from './users.gateway'
import { LoadUsersParamsDto } from './dto'
import * as UC from './usecases'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject()
    private readonly getUserUseCase: UC.LoadUserByNameUseCase,
    private readonly getUserByIdUseCase: UC.GetUserByIdUseCase,
    private readonly createUserUseCase: UC.CreateUserUseCase,
    private readonly changeNameUseCase: UC.ChangeNameUseCase,
    private readonly seedUserUseCase: UC.SeedUsersUseCase,
    private readonly loadUsersUseCase: UC.LoadUsersUseCase,
    private readonly loadUsersSimpleUseCase: UC.LoadUsersSimpleUseCase,
    private readonly loadUsersTotalizerUseCase: UC.LoadUsersTotalizerUseCase,
    private readonly usersGateway: UsersGateway,
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

  loadSimples() {
    return this.loadUsersSimpleUseCase.execute()
  }

  search(filters: LoadUsersParamsDto) {
    return this.loadUsersUseCase.execute(filters)
  }

  loadTotalizer() {
    return this.loadUsersTotalizerUseCase.execute()
  }

  async create(createUserParams: CreateUserParamsDto) {
    const user = await this.createUserUseCase.execute(createUserParams)
    this.usersGateway.notifyAdd(user)
    return user
  }

  async changeName(@Request() req, name: string) {
    const user = await this.changeNameUseCase.execute(name, req.user.id)
    this.usersGateway.notifyUpdate(user)
    return user
  }
}
