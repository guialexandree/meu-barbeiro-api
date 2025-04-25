import { Inject, Injectable } from '@nestjs/common'
import { Between, In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Attendance, AttendanceStatus } from './entities/attendance.entity'
import { AttendanceService } from './entities/attendance.service.entity'
import { IDateAdapter } from '../../infra/adapters/protocols'

export interface IAttendancesRepository {
  findOne(id: string): Promise<Attendance>
  findActivedByUser(userId: string): Promise<Attendance>
  loadActives(): Promise<Attendance[]>
  loadByUser(userId: string): Promise<Attendance[]>
  remove(id: string): Promise<Attendance>
  findAll(): Promise<Attendance[]>
  save(attendance: Attendance): Promise<Attendance>
  count(): Promise<number>
  totalServiceTime(): Promise<number>
}

@Injectable()
export class AttendancesRepository implements IAttendancesRepository {
  constructor(
    @InjectRepository(Attendance)
    private repositoryAttendance: Repository<Attendance>,
    @InjectRepository(AttendanceService)
    private repositoryAttendanceService: Repository<AttendanceService>,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async totalServiceTime(): Promise<number> {
    const start = this.dateAdapter.startOf()
    const end = this.dateAdapter.endOf()

    const result = await this.repositoryAttendanceService
      .createQueryBuilder('attendances_services')
      .leftJoinAndSelect('attendances_services.attendance', 'attendances')
      .leftJoinAndSelect('attendances_services.service', 'services')
      .where('attendance.status = :status', { status: AttendanceStatus.NaFila })
      .andWhere('attendance.createdAt BETWEEN :startDate AND :endDate', {
        start,
        end,
      })
      .select('SUM(service.timeExecution)', 'totalTimeExecution')
      .getRawOne()

    return result.totalTimeExecution || 0
  }

  count(): Promise<number> {
    const start = this.dateAdapter.startOf()
    const end = this.dateAdapter.endOf()

    return this.repositoryAttendance.count({
      where: {
        createdAt: Between(start, end),
        status: AttendanceStatus.NaFila,
      },
    })
  }

  async findActivedByUser(userId: string): Promise<Attendance> {
    const todayStart = this.dateAdapter.startOf()
    const todayEnd = this.dateAdapter.endOf()

    const attendances = await this.repositoryAttendance.find({
      where: {
        createdAt: Between(todayStart, todayEnd),
        status: In([AttendanceStatus.NaFila, AttendanceStatus.EmAtendimento]),
        user: { id: userId },
      },
    })

    return attendances.at(0)
  }

  async loadActives(): Promise<Attendance[]> {
    const todayStart = this.dateAdapter.startOf()
    const todayEnd = this.dateAdapter.endOf()

    const attendances = await this.repositoryAttendance.find({
      where: {
        createdAt: Between(todayStart, todayEnd),
        status: In([AttendanceStatus.NaFila, AttendanceStatus.EmAtendimento]),
      },
    })

    return attendances
  }

  async loadByUser(userId: string): Promise<Attendance[]> {
    const attendances = await this.repositoryAttendance.find({
      where: {
        user: { id: userId },
      },
    })

    return attendances
  }

  findOne(id: string): Promise<Attendance> {
    return this.repositoryAttendance.findOneBy({ id })
  }

  findAll(): Promise<Attendance[]> {
    return this.repositoryAttendance.find()
  }

  async save(attendance: Attendance): Promise<Attendance> {
    return this.repositoryAttendance.save(attendance)
  }

  async remove(id: string): Promise<Attendance> {
    const attendance = await this.findOne(id)
    return this.repositoryAttendance.remove(attendance)
  }
}
