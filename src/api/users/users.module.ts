import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { UsersController } from './users.controller'
import { DateAdapterModule } from '../../infra/adapters/date-adapter'
import { ChangeNameUseCase } from './usecases/change-name-use-case'
import { CreateUserUseCase } from './usecases/create-user-use-case'
import { GetUserByIdUseCase } from './usecases/get-user-by-id-use-case'
import { LoadUserByNameUseCase } from './usecases/get-user-by-name-use-case'
import { SeedUsersUseCase } from './usecases/seed-users-use-case'
import { LoadUsersUseCase } from './usecases/get-users-use-case'

@Module({
  imports: [
    DateAdapterModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    LoadUserByNameUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    ChangeNameUseCase,
    SeedUsersUseCase,
    LoadUsersUseCase,
    UsersRepository,
    {
      provide: 'IUsersRepository',
      useExisting: UsersRepository,
    },
  ],
  exports: [
    UsersService,
    UsersRepository,
    {
      provide: 'IUsersRepository',
      useExisting: UsersRepository,
    },
  ],
})
export class UsersModule {}
