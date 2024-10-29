import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { GetUserUseCase } from './usecases/get-user-user-case';
import { CreateUserUseCase } from './usecases/create-user-use-case';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    GetUserUseCase,
    CreateUserUseCase,
    UsersRepository,
    {
      provide: 'IUsersRepository',
      useExisting: UsersRepository
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}
