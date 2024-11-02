import { Module } from '@nestjs/common';
import { SmsProviderAdapter } from './sms-provider-adapter';

@Module({
  providers: [
    SmsProviderAdapter,
    {
      provide: 'ISmsAdapter',
      useExisting: SmsProviderAdapter
    }
  ],
  exports: [
    SmsProviderAdapter,
    {
      provide: 'ISmsAdapter',
      useExisting: SmsProviderAdapter
    }
  ]
})
export class SmsProviderModule {}
