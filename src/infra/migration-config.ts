import { config } from 'dotenv'
import { Alert } from '../api/alerts/entities/alert.entity'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Company } from '../api/companies/entities/company.entity'

config()

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    sslmode: 'require',
  },
  entities: [Alert, Company],
  migrations: [__dirname + '/infra/migrations/*{.ts,.js}'],
}

export default new DataSource(dataSourceOptions)
