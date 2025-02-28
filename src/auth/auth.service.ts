import { Injectable } from '@nestjs/common'
import { SignInUseCase } from './usecases/sigin-use-case'
import { SignInClientUseCase } from './usecases/sigin-client-use-case'
import { AdminAuthenticationDto } from './dto/admin-authentication.dto'
import { AuthenticationDto } from './dto/authentication.dto'

@Injectable()
export class AuthService {
  constructor(
    private signInUseCase: SignInUseCase,
    private signInClientUseCase: SignInClientUseCase,
  ) {}

  async signIn(authenticationDto: AdminAuthenticationDto): Promise<{ accessToken: string }> {
    const accessToken = await this.signInUseCase.execute(authenticationDto)
    return accessToken
  }

  async signInClient(authenticationDto: AuthenticationDto): Promise<{ accessToken: string }> {
    const accessToken = await this.signInClientUseCase.execute(authenticationDto.deviceId)
    return accessToken
  }
}
