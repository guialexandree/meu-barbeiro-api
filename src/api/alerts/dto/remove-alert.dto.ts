import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RemoveAlertDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
