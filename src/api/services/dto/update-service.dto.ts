import { PartialType } from '@nestjs/mapped-types'
import { ServiceStatus } from '../entities/service.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

class _UpdateServiceDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  name: string

  @ApiProperty({ required: false })
  description: string

  @ApiProperty({ required: false })
  price: number

  @ApiProperty({ required: false })
  timeExecution: number

  @ApiProperty({ required: false })
  status: ServiceStatus
}

export class UpdateServiceDto extends PartialType(_UpdateServiceDto) {}
