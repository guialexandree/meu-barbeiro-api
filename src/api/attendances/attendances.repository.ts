import { Inject, Injectable } from '@nestjs/common'
import { Between, In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Attendance, AttendanceStatus } from './entities/attendance.entity'
import { AttendanceService } from './entities/attendance.service.entity'
import { IDateAdapter } from '../../infra/adapters/protocols'

export interface IAttendancesRepository {
  findOne(id: string): Promise<Attendance>
  findActivedByUser(userId: string): Promise<Attendance>
  loadByStatus(statusList: AttendanceStatus[]): Promise<Attendance[]>
  loadByUser(userId: string): Promise<Attendance[]>
  remove(id: string): Promise<Attendance>
  findAll(): Promise<Attendance[]>
  save(attendance: Attendance): Promise<Attendance>
  countTodayByStatus(status: AttendanceStatus): Promise<number>
  amountToday(): Promise<number>
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
      .where('attendances.status = :status', { status: 'in_queue' })
      .andWhere('attendances.createdAt BETWEEN :start AND :end', {
        start,
        end,
      })
      .select('SUM(service.timeExecution)', 'totalTimeExecution')
      .getRawOne()

    return result.totalTimeExecution || 0
  }

  async amountToday(): Promise<number> {
    const start = this.dateAdapter.startOf()
    const end = this.dateAdapter.endOf()

    const result = await this.repositoryAttendanceService
      .createQueryBuilder('attendances_services')
      .leftJoinAndSelect('attendances_services.attendance', 'attendances')
      .leftJoinAndSelect('attendances_services.service', 'services')
      .where('attendances.createdAt BETWEEN :start AND :end', {
        start,
        end,
      })
      .select('SUM(services.price)', 'totalAmount')
      .getRawOne()

    return +result.totalAmount || 0
  }

  countTodayByStatus(status: AttendanceStatus): Promise<number> {
    const start = this.dateAdapter.startOf()
    const end = this.dateAdapter.endOf()

    return this.repositoryAttendance.count({
      where: {
        createdAt: Between(start, end),
        status: status,
      },
    })
  }

  async findActivedByUser(userId: string): Promise<Attendance> {
    const todayStart = this.dateAdapter.startOf()
    const todayEnd = this.dateAdapter.endOf()

    const attendances = await this.repositoryAttendance.find({
      where: {
        createdAt: Between(todayStart, todayEnd),
        status: In(['in_queue', 'attending']),
        user: { id: userId },
      },
    })

    return attendances.at(0)
  }

  async loadByStatus(statusList: AttendanceStatus[]): Promise<Attendance[]> {
    const todayStart = this.dateAdapter.startOf()
    const todayEnd = this.dateAdapter.endOf()

    const attendances = await this.repositoryAttendance.find({
      where: {
        createdAt: Between(todayStart, todayEnd),
        status: In(statusList),
      },
      order: {
        status: 'ASC',
        startedAt: 'ASC',
        createdAt: 'ASC',
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
