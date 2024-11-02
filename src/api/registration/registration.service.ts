import { Inject, Injectable } from '@nestjs/common';
import { RegisterUseCase } from './usecases/register-use-case';
import { RegisterDto } from './dto/register.dto';
import { RegisterActivationUseCase } from './usecases/register-activation-use-case';
import { RegisterActivationDto } from './dto/register-activation.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject()
    private readonly registerUseCase: RegisterUseCase,
    private readonly registerActivationUseCase: RegisterActivationUseCase
  ) {}

  register(registerDto: RegisterDto) {
    return this.registerUseCase.execute(registerDto);
  }

  activation(registerDto: RegisterActivationDto) {
    return this.registerActivationUseCase.execute(registerDto);
  }
}
