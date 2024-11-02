import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from './api/services/services.module';
import { Service } from './api/services/entities/service.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { User } from './api/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AttendancesModule } from './api/attendances/attendances.module';
import { Attendance } from './api/attendances/entities/attendance.entity';
import { AttendanceService } from './api/attendances/entities/attendance.service.entity';
import { RegistrationModule } from './api/registration/registration.module';
import { Registration } from './api/registration/entities/registration.entity';
import { SmsModule } from './api/sms/sms.module';
import { Sms } from './api/sms/entities/sms.entity';
import { HomeModule } from './api/home/home.module';
import { AlertsModule } from './api/alerts/alerts.module';
import { Alert } from './api/alerts/entities/alert.entity';
import { CompaniesModule } from './api/companies/companies.module';
import { CompaniesOfficeHoursModule } from './api/companies-office-hours/companies-office-hours.module';
import { Company } from './api/companies/entities/company.entity';
import { CompaniesOfficeHour } from './api/companies-office-hours/entities/companies-office-hour.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.db',
      entities: [
        User,
        Alert,
        Service,
        Attendance,
        AttendanceService,
        Registration,
        Sms,
        Company,
        CompaniesOfficeHour
      ],
      synchronize: true,
    }),
    ServicesModule,
    UsersModule,
    AuthModule,
    AttendancesModule,
    RegistrationModule,
    SmsModule,
    HomeModule,
    AlertsModule,
    CompaniesModule,
    CompaniesOfficeHoursModule,
  ]
})
export class AppModule {}
