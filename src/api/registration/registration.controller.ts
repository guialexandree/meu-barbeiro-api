import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterActivationDto } from './dto/register-activation.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.registrationService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('activation')
  activation(@Body() activationDto: RegisterActivationDto) {
    return this.registrationService.activation(activationDto);
  }
}
