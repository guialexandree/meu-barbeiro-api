import { Controller, Post } from '@nestjs/common'
import { CompaniesService } from './companies.service'

@Controller('barber-shop')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post('/start')
  startAttendances() {
    return this.companiesService.startAttendances()
  }

  @Post('/end')
  endAttendance() {
    return this.companiesService.endAttendances()
  }
}
