import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { UserOrigin } from 'src/api/users/entities/user.entity';

export class RegisterActivationDto {
  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @Length(14, 14)
  @IsNotEmpty()
  contactNumber: string;

  @ApiProperty()
  @Length(4, 4)
  @IsNotEmpty()
  codeActivation: string;

  @ApiProperty()
  @IsNotEmpty()
  origin: UserOrigin;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  token?: string;
}
