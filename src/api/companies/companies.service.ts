import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { GetCompanyUseCase } from './usecases/get-company-use-case'
import { SeedCompanyUseCase } from './usecases/seed-company-use-case'
import { CreateCompanyUseCase } from './usecases/create-company-use-case'
import { CreateCompanyDto } from './dto/create-company.dto'
import { GetCompanyIdUseCase } from './usecases/get-company-id-use-case'
import { StartAttendanceCompanyUseCase } from './usecases/start-attendance-company-use-case'
import { EndAttendanceCompanyUseCase } from './usecases/end-attendance-company-use-case'

@Injectable()
export class CompaniesService implements OnModuleInit {
  constructor(
    @Inject()
    private readonly getCompany: GetCompanyUseCase,
    private readonly getCompanyId: GetCompanyIdUseCase,
    private readonly seedCompany: SeedCompanyUseCase,
    private readonly startAttendanceCompany: StartAttendanceCompanyUseCase,
    private readonly endAttendanceCompany: EndAttendanceCompanyUseCase,
    private readonly createCompany: CreateCompanyUseCase,
  ) {}

  onModuleInit() {
    return this.seedCompany.execute()
  }

  save(input: CreateCompanyDto) {
    return this.createCompany.execute(input)
  }

  load() {
    return this.getCompany.execute()
  }

  loadById() {
    return this.getCompanyId.execute()
  }

  startAttendances() {
    return this.startAttendanceCompany.execute()
  }

  endAttendances() {
    return this.endAttendanceCompany.execute()
  }
}
