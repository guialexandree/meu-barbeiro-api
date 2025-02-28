import { ApiProperty } from '@nestjs/swagger'
import { ServiceStatus } from '../entities/service.entity'

export class GetServicesDto {
  @ApiProperty({ required: false })
  search: string

  @ApiProperty({ required: false })
  status: ServiceStatus
}
