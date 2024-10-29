import { Inject, Injectable } from '@nestjs/common';
import { SignInUseCase } from './usecases/sigin-use-case';

@Injectable()
export class AuthService {
  constructor(
    private signInUseCase: SignInUseCase
  ) {}

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const accessToken = await this.signInUseCase.execute(username, password);
    return accessToken;
  }
}
