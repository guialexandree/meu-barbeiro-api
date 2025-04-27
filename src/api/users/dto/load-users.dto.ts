import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '../entities/user.entity'
import { IsOptional, Length } from 'class-validator'

export class LoadUsersParamsDto {
  @ApiProperty({
    description: 'Número da Pagina',
    required: false,
    default: 1,
  })
  @IsOptional()
  page?: number

  @ApiProperty({
    description: 'Número de itens na página',
    required: false,
    default: 10,
  })
  @IsOptional()
  limit?: number

  @ApiProperty({ description: 'Buscar por nome do usuário', required: false })
  @IsOptional()
  @Length(0, 255)
  search?: string

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  role?: UserRole
}
