import { Injectable } from '@nestjs/common';
import { IDateAdapter } from '../../protocols';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

@Injectable()
export class DayjsDateAdapter implements IDateAdapter {
  format(date: string | Date, template: string): string {
    return dayjs(date).format(template);
  }

  now(): Date {
    return dayjs().toDate();
  }
}
