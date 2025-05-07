import { Global, Module } from '@nestjs/common'
import { DayjsDateAdapter } from './dayjs-date-adapter'

@Global()
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
