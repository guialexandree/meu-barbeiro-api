import { ApiProperty } from '@nestjs/swagger'
import { ServiceStatus } from '../entities/service.entity'
import { IsNotEmpty, MinLength } from 'class-validator'

export class CreateServiceDto {
  @ApiProperty({ required: true })
  @MinLength(3, { message: 'O nome do serviço deve ter no mínimo 3 caracteres' })
  @IsNotEmpty({ message: 'O nome do serviço é obrigatório' })
  name: string

  @ApiProperty({ required: false })
  description: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  price: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  timeExecution: number

  @ApiProperty({ required: false })
  status: ServiceStatus
}
