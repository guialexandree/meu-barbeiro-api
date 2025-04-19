import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '../entities/user.entity'
import { IsInt, IsOptional, IsString, Length } from 'class-validator'

export class LoadUsersParamsDto {
  @ApiProperty({
    description: 'Número da Pagina',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  page?: number

  @ApiProperty({
    description: 'Número de itens na página',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  limit?: number

  @ApiProperty({ description: 'Buscar por usuários', required: false })
  @IsOptional()
  @Length(0, 255)
  search?: string

  @ApiProperty({
    description: 'Filtrar por tipo de usuário',
    examples: ['client', 'barber'],
    enum: UserRole,
    required: false,
    default: UserRole.Client,
  })
  @IsOptional()
  role?: UserRole
}
