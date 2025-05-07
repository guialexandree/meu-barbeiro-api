import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import localeData from 'dayjs/plugin/localeData'
import timezone from 'dayjs/plugin/timezone'
import { IDateAdapter } from '../../protocols'
import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)
dayjs.locale('pt-br')

@Injectable()
export class DayjsDateAdapter implements IDateAdapter {
  daysAgo(days: number): Date {
    return dayjs().subtract(days, 'day').toDate()
  }

  differenceInMinutes(start: Date | string, end: Date | string): number {
    return dayjs(end).diff(dayjs(start), 'minute')
  }

  addMinutes(minutes: number): Date {
    return dayjs().add(minutes, 'minutes').toDate()
  }

  startOf(): Date {
    return dayjs().startOf('day').toDate()
  }

  endOf(): Date {
    return dayjs().endOf('day').toDate()
  }

  isAfter(date: Date | string): boolean {
    const now = dayjs()
    return now.isAfter(date)
  }

  isBefore(date: Date | string): boolean {
    const now = dayjs()
    return now.isBefore(date)
  }

  weekDay(): number {
    return dayjs().day()
  }

  weekDayLabel(): string {
    return dayjs().format('dddd')
  }

  format(date: string | Date, template: string): string {
    return dayjs(date).format(template)
  }

  now(): Date {
    return dayjs().toDate()
  }
}
