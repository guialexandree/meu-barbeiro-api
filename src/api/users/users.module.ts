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
import { GetUserUseCase } from './usecases/get-user-user-case'
import { SeedUsersUseCase } from './usecases/seed-users-use-case'

@Module({
  imports: [DateAdapterModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    GetUserUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    ChangeNameUseCase,
    SeedUsersUseCase,
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
