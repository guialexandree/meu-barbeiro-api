import { config } from 'dotenv'
import { ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Alert } from '../api/alerts/entities/alert.entity'
import { Company } from '../api/companies/entities/company.entity'
import { User } from '../api/users/entities/user.entity'
import { Service } from '../api/services/entities/service.entity'
import { Attendance } from '../api/attendances/entities/attendance.entity'
import { AttendanceService } from '../api/attendances/entities/attendance.service.entity'
import { Registration } from '../api/registration/entities/registration.entity'
import { Sms } from '../api/sms/entities/sms.entity'

config()

const configService = new ConfigService()

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    sslmode: 'require',
  },
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
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
}

export default new DataSource(dataSourceOptions)
