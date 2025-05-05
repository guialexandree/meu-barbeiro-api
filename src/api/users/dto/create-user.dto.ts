import { ApiProperty } from '@nestjs/swagger'
import { UserOrigin, UserRole } from '../entities/user.entity'
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class CreateUserParamsDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  name: string

  @ApiProperty({ required: false })
  @IsOptional()
  nickname?: string

  @ApiProperty()
  @IsOptional()
  password?: string

  @ApiProperty()
  @Length(9, 14)
  @IsOptional()
  contactNumber?: string

  @ApiProperty({ required: false })
  @IsOptional()
  origin?: UserOrigin

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string

  @ApiProperty({ required: false })
  @IsOptional()
  token?: string

  @ApiProperty({ required: false })
  @IsOptional()
  role?: UserRole
}
