import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/api/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants.';
import { SignInUseCase } from './usecases/sigin-use-case';
import { SignInClientUseCase } from './usecases/sigin-client-use-case';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInUseCase,
    SignInClientUseCase
  ],
  exports: [AuthService]
})
export class AuthModule {}
