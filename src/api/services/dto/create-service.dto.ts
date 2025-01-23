import { ApiProperty } from '@nestjs/swagger'
import { ServiceStatus } from '../entities/service.entity'
import { IsNotEmpty } from 'class-validator'

export class CreateServiceDto {
  @ApiProperty({ required: false })
  name: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  description: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  price: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  timeExecution: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  status: ServiceStatus
}
