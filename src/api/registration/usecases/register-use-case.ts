import { Inject, Injectable } from '@nestjs/common';
import { IRegistrationRepository } from '../registration.repository';
import { RegisterDto } from '../dto/register.dto';
import {
  Registration,
  RegistrationStatus,
  SMSStatus,
} from '../entities/registration.entity';
import { SmsService } from 'src/api/sms/sms.service';
import { Sms } from 'src/api/sms/entities/sms.entity';
import { IDateAdapter } from 'src/infra/adapters/protocols';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IRegistrationRepository')
    private readonly registrationRepository: IRegistrationRepository,
    @Inject()
    private readonly smsService: SmsService,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute(registerDto: RegisterDto) {
    let sms: Sms;
    let registration = await this.registrationRepository.findByContactNumber(
      registerDto.contactNumber,
    );

    if (
      registration?.smsStatus === SMSStatus.Sending &&
      registration?.status === RegistrationStatus.Activated
    ) {
      return registration;
    }

    if (!registration) {
      registration = new Registration({
        ...registerDto,
        createdAt: this.dateAdapter.now(),
      });
    } else {
      registration.createdAt = this.dateAdapter.now();
    }

    const message = registration.getMessageCode();
    sms = await this.smsService.send(registerDto.contactNumber, message);
    if (sms) {
      registration.sms = sms;
      registration.smsStatus = SMSStatus.Sending;
    }

    const id = await this.registrationRepository.save(registration);

    return { id }
  }
}
