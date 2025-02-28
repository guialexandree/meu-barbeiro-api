import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('auth')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn({
      username: signInDto.username,
      password: signInDto.password,
      deviceId: signInDto.deviceId,
    })
  }

  @HttpCode(HttpStatus.OK)
  @Post('auth/client')
  signInClient(@Body() signInDto: Record<string, string>) {
    return this.authService.signInClient({ username: signInDto.username, deviceId: signInDto.deviceId })
  }
}
