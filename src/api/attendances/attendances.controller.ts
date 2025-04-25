import { Controller, Post, Body, Request, Get, Req, Param } from '@nestjs/common'
import { AttendancesService } from './attendances.service'
import { CreateAttendanceDto } from './dto/create-attendance.dto'

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Get()
  loadAttendances() {
    return this.attendancesService.loadToday()
  }

  @Get('/info')
  findInfo() {
    return this.attendancesService.findAttendancesInfo()
  }

  @Get('/user')
  loadAttendancesByUser(@Req() req) {
    const userId = req.user.id
    return this.attendancesService.loadByUser(userId)
  }

  @Get('/:id/start')
  startAttendance(@Param('id') id: string) {
    return this.attendancesService.startAttendance(id)
  }

  @Get('/:id/end')
  endAttendance(@Param('id') id: string) {
    return this.attendancesService.endAttendance(id)
  }

  @Post()
  create(@Request() req, @Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.create(
      createAttendanceDto,
      'afedb371-858a-4afd-a5bc-f45f08d51571',
    )
  }
}
