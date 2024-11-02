import { PartialType } from '@nestjs/mapped-types';
import { ServiceStatus } from '../entities/service.entity';

class _UpdateServiceDto {
  name: string;

  description: string;

  amount: number;

  timeExecution: number;

  status: ServiceStatus;

  updatedAt?: Date | null;
}

export class UpdateServiceDto extends PartialType(_UpdateServiceDto) {}
