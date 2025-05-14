import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants.'
import { SignInUseCase } from './usecases/sigin-use-case'
import { SignInClientUseCase } from './usecases/sigin-client-use-case'
import { UsersModule } from '../api/users/users.module'
import { PasswordEncoder } from '../infra/adapters'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SignInUseCase, SignInClientUseCase, PasswordEncoder],
  exports: [AuthService],
})
export class AuthModule {}
