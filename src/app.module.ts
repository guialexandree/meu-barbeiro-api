import { Module } from '@nestjs/common'
import { AlertsModule, AttendancesModule, CompaniesModule, HomeModule, RegistrationModule, ServicesModule, SmsModule, UsersModule } from './api'
import { ConfigModule } from '@nestjs/config'
import { DbModule } from './infra/db/db.module'
import { DateAdapterModule, SocketAdapterModule } from './infra/adapters'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DateAdapterModule,
    SocketAdapterModule,
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
