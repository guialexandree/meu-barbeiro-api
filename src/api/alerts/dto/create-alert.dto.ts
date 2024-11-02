import { ApiProperty } from '@nestjs/swagger';
import { AlertType } from '../entities/alert.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  type: AlertType;
}
