import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional} from 'class-validator'
import { PositionAttendance } from './create-attendance.dto'

export class SendToAttendanceDto {
  @ApiProperty({
    required: true,
    description: 'ID do atendimento deve ser informado',
  })
  id: string

  @ApiProperty({ required: true, default: 'last' })
  @IsEnum({ last: 'last', first: 'first' })
  position: PositionAttendance
}
