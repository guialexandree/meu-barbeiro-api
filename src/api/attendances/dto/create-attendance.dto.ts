import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsUUID } from 'class-validator'

type PositionAttendance = 'last' | 'first'

export class CreateAttendanceDto {
  @ApiProperty({ required: false, description: 'ID do cliente que será atendido quando tiver cadastro' })
  @IsOptional()
  userId: string

  @ApiProperty({ required: true, description: 'IDs dos serviços a serem executados no cliente' })
  @IsArray()
  services: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  position: PositionAttendance
}
