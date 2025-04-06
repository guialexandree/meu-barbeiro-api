import { ApiProperty } from '@nestjs/swagger'
import { UserOrigin, UserRole } from '../entities/user.entity'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @Length(14, 14)
  @IsNotEmpty()
  contactNumber: string

  @ApiProperty()
  @IsNotEmpty()
  origin: UserOrigin

  @ApiProperty({ required: false })
  name?: string

  @ApiProperty({ required: false })
  @IsString()
  email?: string

  @ApiProperty({ required: false })
  token?: string

  @ApiProperty({ required: false })
  role?: UserRole
}
