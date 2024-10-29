import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/api/users/users.service';

@Injectable()
export class SignInUseCase {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async execute (username: string, pass: string){
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
