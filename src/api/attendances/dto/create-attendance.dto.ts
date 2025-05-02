import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsUUID } from 'class-validator'

type PositionAttendance = 'last' | 'first'

export class CreateAttendanceDto {
  @ApiProperty({ required: true, description: 'ID do cliente que será atendido' })
  @IsUUID('all', { message: 'O id do usuário deve ser um UUID válido' })
  userId: string

  @ApiProperty({ required: true, description: 'IDs dos serviços a serem executados no cliente' })
  @IsArray()
  services: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  position: PositionAttendance
}
