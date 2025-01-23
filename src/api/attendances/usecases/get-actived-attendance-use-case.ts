import { Inject, Injectable } from '@nestjs/common';
import { IAttendancesRepository } from '../attendances.repository';

@Injectable()
export class GetActivedAttendanceUseCase {
  constructor(
    @Inject('IAttendancesRepository')
    private readonly attendancesRepository: IAttendancesRepository,
  ) {}

  async execute(userId: string) {
    const attendance =
      await this.attendancesRepository.findActivedByUser(userId);
    return attendance;
  }
}
