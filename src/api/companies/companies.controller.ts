import { Controller, Get, Post } from '@nestjs/common'
import { CompaniesService } from './companies.service'

@Controller('barber-shop')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  loadCompany() {
    return this.companiesService.load()
  }

  @Post('/start')
  startAttendances() {
    return this.companiesService.startAttendances()
  }

  @Post('/closed')
  endAttendance() {
    return this.companiesService.endAttendances()
  }
}
