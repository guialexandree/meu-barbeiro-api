import { ApiProperty } from '@nestjs/swagger';
import { AlertStatus, AlertType } from '../entities/alert.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  type: AlertType;

  @ApiProperty()
  @IsNotEmpty()
  status: AlertStatus;
}
