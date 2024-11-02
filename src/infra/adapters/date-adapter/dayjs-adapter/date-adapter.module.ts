import { Module } from '@nestjs/common';
import { DayjsDateAdapter } from './dayjs-date-adapter';

@Module({
  providers: [
    DayjsDateAdapter,
    {
      provide: 'IDateAdapter',
      useExisting: DayjsDateAdapter,
    },
  ],
  exports: [
    DayjsDateAdapter,
    {
      provide: 'IDateAdapter',
      useExisting: DayjsDateAdapter,
    },
  ],
})
export class DateAdapterModule {}
