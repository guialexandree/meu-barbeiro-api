export interface IDateAdapter {
  format(date: string | Date, template: string): string;
  now(): Date;
}
