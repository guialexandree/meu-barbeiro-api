import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Get()
  findInfo() {
    return this.attendancesService.findAttendancesInfo();
  }

  @Post()
  create(@Request() req, @Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.create(createAttendanceDto, 'afedb371-858a-4afd-a5bc-f45f08d51571');
  }
}
