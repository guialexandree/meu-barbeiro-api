import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { UsersController } from './users.controller'
import { DateAdapterModule } from '../../infra/adapters/date-adapter'
import { UsersGateway } from './users.gateway'
import * as UC from './usecases'

@Module({
  imports: [
    DateAdapterModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    UsersGateway,
    UsersService,
    UC.LoadUserByNameUseCase,
    UC.GetUserByIdUseCase,
    UC.CreateUserUseCase,
    UC.ChangeNameUseCase,
    UC.SeedUsersUseCase,
    UC.LoadUsersSimpleUseCase,
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
