import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../../api/users/users.service'
import { AdminAuthenticationDto } from '../dto/admin-authentication.dto'
import { PasswordEncoder } from '../../infra/adapters'

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async execute(authenticationDto: AdminAuthenticationDto) {
    const user = await this.usersService.findOne(authenticationDto.username)
    const validLogin = await this.passwordEncoder.comparePassword(authenticationDto.password, user.password)
    if (!validLogin) {
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
