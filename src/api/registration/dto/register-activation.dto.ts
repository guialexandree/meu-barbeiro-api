import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'
import { UserOrigin } from '../../users/entities/user.entity'

export class RegisterActivationDto {
  @ApiProperty()
  @Length(11, 11, { message: 'O número de contato deve conter 11 digitos.' })
  @IsNotEmpty({ message: 'O número de contato é obrigatório.' })
  contactNumber: string

  @ApiProperty()
  @Length(6, 6, { message: 'O código de ativação deve conter 6 digitos.' })
  @IsNotEmpty({ message: 'O código de ativação é obrigatório.' })
  activationCode: string

  @ApiProperty()
  @IsNotEmpty({ message: 'O campo origin é obrigatório.' })
  origin: UserOrigin

  @ApiProperty({ required: false })
  email?: string

  @ApiProperty({ required: false })
  name?: string

  @ApiProperty({ required: false })
  token?: string
}
