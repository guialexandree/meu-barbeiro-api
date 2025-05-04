import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsUUID } from 'class-validator'
import { AttendanceStatus } from '../entities/attendance.entity'

export class CancelAttendanceDto {
  @ApiProperty({
    required: true,
    description: 'ID do atendimento deve ser informado',
  })
  @IsUUID('all', { message: 'O id do atendimento deve ser um UUID válido' })
  id: string

  @ApiProperty({ required: true, description: 'Motivo do cancelamento' })
  @IsEnum(
    {},
    {
      message:
        'O motivo deve ser um dos seguintes: [CANCELADO, NAO_COMPARECEU]',
    },
  )
  motivo: AttendanceStatus
}
