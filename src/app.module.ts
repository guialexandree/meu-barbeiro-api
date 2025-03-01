import { Module } from '@nestjs/common'
import { ServicesModule } from './api/services/services.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './api/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { AttendancesModule } from './api/attendances/attendances.module'
import { RegistrationModule } from './api/registration/registration.module'
import { SmsModule } from './api/sms/sms.module'
import { HomeModule } from './api/home/home.module'
import { AlertsModule } from './api/alerts/alerts.module'
import { CompaniesModule } from './api/companies/companies.module'
import { DbModule } from './infra/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    ServicesModule,
    UsersModule,
    AuthModule,
    AttendancesModule,
    RegistrationModule,
    SmsModule,
    HomeModule,
    AlertsModule,
    CompaniesModule,
  ],
})
export class AppModule {}
