import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from 'src/api/users/entities/user.entity';
import { UsersService } from 'src/api/users/users.service';

@Injectable()
export class SignInClientUseCase {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async execute (deviceId: string){
    const user = null;
    if (user?.status !== UserStatus.Ativo) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      name: user.username
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
