import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IRegistrationRepository } from '../registration.repository';
import { RegistrationStatus } from '../entities/registration.entity';
import { RegisterActivationDto } from '../dto/register-activation.dto';
import { UsersService } from 'src/api/users/users.service';
import { UserRole } from 'src/api/users/entities/user.entity';
import { InvalidRuleException } from 'src/domain/errors/invalid-rule-exception';
import { ValidationError } from 'class-validator';

@Injectable()
export class RegisterActivationUseCase {
  constructor(
    @Inject('IRegistrationRepository')
    private readonly registrationRepository: IRegistrationRepository,
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  async execute(registerDto: RegisterActivationDto) {
    let registration = await this.registrationRepository.findByContactNumber(
      registerDto.contactNumber,
    );

    if (!registration) {
      throw new InvalidRuleException(['Nenhum registro encontrado para o número informado']);
    }

    if (registerDto.activationCode !== registration.code) {
      throw new InvalidRuleException(['Código inválido!']);
    }

    if (registration.status === RegistrationStatus.Activated) {
      return { id: registration.id };
    }

    registration.status = RegistrationStatus.Activated;
    const registrationId = await this.registrationRepository.save(registration);

    const { contactNumber: contact_number, ...userParams } = registerDto;
    const contact = contact_number.replace(/\D/g, '');
    await this.usersService.create({
      ...userParams,
      username: contact,
      password: contact.slice(-4),
      contactNumber: contact,
      role: UserRole.Client,
    });

    return { id: registrationId };
  }
}
