import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { UsersController } from './users.controller'
import * as UC from './usecases'

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UC.LoadUserByNameUseCase,
    UC.LoadUsersSimpleUseCase,
    UC.GetUserByIdUseCase,
    UC.CreateUserUseCase,
    UC.LoadDefaultUserUseCase,
    UC.ChangeNameUseCase,
    UC.SeedUsersUseCase,
    UC.LoadUsersUseCase,
    UC.LoadUsersTotalizerUseCase,
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
