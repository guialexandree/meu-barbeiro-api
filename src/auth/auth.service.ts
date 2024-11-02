import { Injectable } from '@nestjs/common';
import { SignInUseCase } from './usecases/sigin-use-case';
import { SignInClientUseCase } from './usecases/sigin-client-use-case';

@Injectable()
export class AuthService {
  constructor(
    private signInUseCase: SignInUseCase,
    private signInClientUseCase: SignInClientUseCase
  ) {}

  async signIn(username: string, password: string): Promise<{ accessToken: string }> {
    const accessToken = await this.signInUseCase.execute(username, password);
    return accessToken;
  }

  async signInClient(deviceId: string): Promise<{ accessToken: string }> {
    const accessToken = await this.signInClientUseCase.execute(deviceId);
    return accessToken;
  }
}
