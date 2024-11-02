import { Inject, Injectable } from '@nestjs/common';
import { SendSmsUseCase } from './usecases/send-sms-use-case';

@Injectable()
export class SmsService {
  constructor(
    @Inject()
    private readonly sendSmsUseCase: SendSmsUseCase
  ) {}

  send(contactNumber: string, message: string) {
    return this.sendSmsUseCase.execute(contactNumber, message);
  }
}
