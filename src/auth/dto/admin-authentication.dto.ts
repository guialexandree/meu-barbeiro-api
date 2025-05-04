import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class AdminAuthenticationDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsOptional()
  password: string
}
