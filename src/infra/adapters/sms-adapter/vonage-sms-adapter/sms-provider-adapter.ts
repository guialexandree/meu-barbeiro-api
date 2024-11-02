import { Injectable, Logger } from '@nestjs/common';
import { Vonage } from '@vonage/server-sdk';
import { AuthInterface } from '@vonage/auth';
import { SMS } from '@vonage/messages';
import { ISmsAdapter } from '../../protocols';

export enum SMSStatus {
  Enviado = '0'
}

export type SMSResult = {
  messageId: string;
  status: SMSStatus | string;
  messagePrice: string;
  remainingBalance: string;
  error_text: string;
};

const smsProvider = new Vonage({
  ...(null as AuthInterface),
  apiKey: process.env.CHURRASCO_SMS_MASTER,
  apiSecret: process.env.CHURRASCO_SMS,
});

@Injectable()
export class SmsProviderAdapter implements ISmsAdapter<SMSResult> {
  private readonly logger = new Logger(SmsProviderAdapter.name);

  async send(to: string, text: string): Promise<SMSResult> {
    const smsParams = new SMS({ from: 'Vonage APIs', to, text });

    const { messages } = await smsProvider.sms.send(smsParams);

    const messageResult = messages.at(0) as unknown as SMSResult;
    this.logger.verbose(JSON.stringify(messageResult))
    if (messageResult.status !== SMSStatus.Enviado) {
      return null
    }

    return messageResult
  }
}
