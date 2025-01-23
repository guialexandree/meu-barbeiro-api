import { Inject, Injectable } from '@nestjs/common';
import { ISmsRepository } from '../sms.repository';
import { Sms } from '../entities/sms.entity';
import { Logger } from '@nestjs/common';
import { IDateAdapter, ISmsAdapter } from '@/infra/adapters/protocols';
import { SMSResult, SMSStatus } from '@/infra/adapters/sms-adapter/vonage-sms-adapter/sms-provider-adapter';

@Injectable()
export class SendSmsUseCase {
  private readonly logger = new Logger(SendSmsUseCase.name);

  constructor(
    @Inject('ISmsRepository')
    private readonly smsRepository: ISmsRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
    @Inject('ISmsAdapter')
    private readonly smsAdapter: ISmsAdapter<SMSResult>,
  ) {}

  async execute(to: string, text: string) {
    try {
      const messageResult = await this.smsAdapter.send(to, text);
      if (messageResult.status !== SMSStatus.Enviado) {
        return null;
      }

      const sms = new Sms(
        {
          contactNumber: to,
          message: text,
          date: this.dateAdapter.now(),
          response: JSON.stringify(messageResult),
        },
        messageResult?.messageId,
      );

      return this.smsRepository.save(sms);
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
