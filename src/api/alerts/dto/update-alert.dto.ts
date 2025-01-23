import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AlertStatus, AlertType } from '../entities/alert.entity';

export class UpdateAlertDto {
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
