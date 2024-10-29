import { Module, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/api/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants.';
import { SignInUseCase } from './usecases/sigin-use-case';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

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
    SignInUseCase
  ],
  exports: [AuthService]
})
export class AuthModule {}
