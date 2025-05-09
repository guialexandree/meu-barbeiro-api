export interface IDateAdapter {
  format(date: string | Date, template: string): string
  now(): Date
  addMinutes(minutes: number, startDate?: Date | string): Date
  startOf(): Date
  endOf(): Date
  weekDay(): number
  differenceInMinutes(start: Date | string, end: Date | string): number
  daysAgo(days: number): Date
  weekDayLabel(): string
  isAfter(date: Date | string): boolean
  isBefore(date: Date | string): boolean
}
