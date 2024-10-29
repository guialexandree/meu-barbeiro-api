import { PartialType } from '@nestjs/mapped-types';
import { ServiceStatus } from '../entities/service.entity';

class _UpdateServiceDto {
    name: string;

    description: string;

    amount: number;

    time_execution: number;

    status: ServiceStatus;

    updated_at?: Date | null;
}

export class UpdateServiceDto extends PartialType(_UpdateServiceDto) {}
