import { AlertsService } from '@/api/alerts/alerts.service';
import { AlertType } from '@/api/alerts/entities/alert.entity';
import { AttendancesService } from '@/api/attendances/attendances.service';
import { CompaniesService } from '@/api/companies/companies.service';
import { IDateAdapter } from '@/infra/adapters/protocols';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetHomeInfoUseCase {
  constructor(
    @Inject()
    private readonly companiesService: CompaniesService,
    @Inject()
    private readonly attendancesService: AttendancesService,
    @Inject()
    private readonly alertsService: AlertsService,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute(userId: string) {
    const company = await this.companiesService.find();

    const weekDay = this.dateAdapter.weekDay();
    const currentOfficeHours = company.officeHours.find(officeHours => officeHours.weekDay === weekDay);
    const isWithinTimeRange = this.dateAdapter.isAfter(currentOfficeHours.start) && this.dateAdapter.isBefore(currentOfficeHours.end);
    const statusAttendanceCompany = isWithinTimeRange ? 'aberto' : 'fechado'

    const attendance = await this.attendancesService.findActivedByUser(userId);
    const userAttendance = attendance ? 'nafila' : 'online';

    const alerts = (await this.alertsService.findAll())
      .filter(alert => alert.type === AlertType.Home)
      .map(alert => alert.message)

    return {
      pix: company.pix,
      name: company.name,
      statusAttendanceCompany,
      userAttendance,
      attendanceId: attendance?.id ?? null,
      alerts
    }
  }
}
