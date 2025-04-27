import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString, IsUUID } from 'class-validator'

export class CreateAttendanceDto {
  @ApiProperty({ required: true })
  @IsUUID('all', { message: 'O id do usuário deve ser um UUID válido' })
  userId: string

  @ApiProperty({ required: true })
  @IsArray()
  services: string[]
}
