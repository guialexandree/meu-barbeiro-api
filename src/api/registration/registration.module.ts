import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { RegistrationRepository } from './registration.repository';
import { UsersModule } from '../users/users.module';
import { Registration } from './entities/registration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsModule } from '../sms/sms.module';
import { RegisterUseCase } from './usecases/register-use-case';
import { RegisterActivationUseCase } from './usecases/register-activation-use-case';
import { AuthModule } from 'src/auth/auth.module';
import { DateAdapterModule } from 'src/infra/adapters/date-adapter';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SmsModule,
    DateAdapterModule,
    TypeOrmModule.forFeature([Registration])
  ],
  controllers: [RegistrationController],
  providers: [
    RegistrationService,
    RegisterUseCase,
    RegisterActivationUseCase,
    RegistrationRepository,
    {
      provide: 'IRegistrationRepository',
      useExisting: RegistrationRepository
    }
  ],
  exports: [
    RegistrationService
  ]
})
export class RegistrationModule {}
