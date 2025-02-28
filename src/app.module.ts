import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServicesModule } from './api/services/services.module'
import { Service } from './api/services/entities/service.entity'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './api/users/users.module'
import { User } from './api/users/entities/user.entity'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AttendancesModule } from './api/attendances/attendances.module'
import { Attendance } from './api/attendances/entities/attendance.entity'
import { AttendanceService } from './api/attendances/entities/attendance.service.entity'
import { RegistrationModule } from './api/registration/registration.module'
import { Registration } from './api/registration/entities/registration.entity'
import { SmsModule } from './api/sms/sms.module'
import { Sms } from './api/sms/entities/sms.entity'
import { HomeModule } from './api/home/home.module'
import { AlertsModule } from './api/alerts/alerts.module'
import { Alert } from './api/alerts/entities/alert.entity'
import { CompaniesModule } from './api/companies/companies.module'
import { Company } from './api/companies/entities/company.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: () => ({
    //     type: 'postgres' as const,
    //     host: process.env.DATABASE_HOST,
    //     port: +process.env.DATABASE_PORT,
    //     username: process.env.DATABASE_USERNAME,
    //     password: process.env.DATABASE_PASSWORD,
    //     database: process.env.DATABASE_NAME,
    //     ssl: {
    //       rejectUnauthorized: false,
    //     },
    //     extra: {
    //       sslmode: 'require',
    //     },
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     migrations: [__dirname + '/infra/migrations/*{.ts,.js}'],
    //     cli: {
    //       migrationsDir: './infra/migrations',
    //     },
    //     synchronize: false,
    //   }),
    // }),
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
  ],
})
export class AppModule {}
