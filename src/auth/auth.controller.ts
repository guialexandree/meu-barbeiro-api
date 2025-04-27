import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AdminAuthenticationDto } from './dto/admin-authentication.dto'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('auth')
  signIn(@Body() signInDto: AdminAuthenticationDto) {
    return this.authService.signIn(signInDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('auth/client')
  signInClient(@Body() signInDto: Record<string, string>) {
    return this.authService.signInClient({ username: signInDto.username, deviceId: signInDto.deviceId })
  }
}
