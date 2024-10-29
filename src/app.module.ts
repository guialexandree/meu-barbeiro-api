import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/infra/db/sqlite.db',
      entities: [User, Attendance, Service, AttendanceService],
      synchronize: true,
    }),
    ServicesModule,
    UsersModule,
    AuthModule,
    AttendancesModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
