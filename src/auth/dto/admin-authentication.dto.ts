import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class AdminAuthenticationDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsOptional()
  password: string

  @ApiProperty()
  @IsNotEmpty({ message: 'O devicId deve ser informado' })
  deviceId: string
}
