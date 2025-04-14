import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../../api/users/users.service'
import { AdminAuthenticationDto } from '../dto/admin-authentication.dto'

@Injectable()
export class SignInUseCase {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async execute(authenticationDto: AdminAuthenticationDto) {
    const user = await this.usersService.findOne(authenticationDto.username)
    if (user?.password !== authenticationDto.password) {
      throw new UnauthorizedException()
    }

    const payload = {
      sub: user.id,
      role: user.role,
      name: user.name,
    }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
