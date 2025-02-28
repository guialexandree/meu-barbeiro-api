import { Inject, Injectable } from '@nestjs/common'
import { CompaniesService } from '../../companies/companies.service'
import { AttendancesService } from '../../attendances/attendances.service'
import { AlertsService } from '../../alerts/alerts.service'
import { AlertType } from '../../alerts/entities/alert.entity'

@Injectable()
export class GetHomeInfoUseCase {
  constructor(
    @Inject()
    private readonly companiesService: CompaniesService,
    @Inject()
    private readonly attendancesService: AttendancesService,
    @Inject()
    private readonly alertsService: AlertsService,
  ) {}

  async execute(userId: string) {
    const company = await this.companiesService.find()

    const statusAttendanceCompany = 'aberto'

    const attendance = await this.attendancesService.findActivedByUser(userId)
    const userAttendance = attendance ? 'nafila' : 'online'

    const alerts = (await this.alertsService.findAll())
      .filter((alert) => alert.type === AlertType.Home)
      .map((alert) => alert.message)

    return {
      pix: company.pix,
      name: company.name,
      statusAttendanceCompany,
      userAttendance,
      attendanceId: attendance?.id ?? null,
      alerts,
    }
  }
}
