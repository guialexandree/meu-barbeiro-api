import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'

export class LoadUsersTotalizerDto {
  @ApiProperty({
    description: 'Total de clientes cadastrados',
  })
  @IsInt()
  total: number

  @ApiProperty({
    description: 'Total de clientes cadastrados nos ultimos 30 dias',
  })
  @IsInt()
  new: number

  @ApiProperty({
    description: 'Percentual de novos clientes em relação ao mês anterior',
  })
  @IsInt()
  growth: number
}
