import { Controller, Post, Body, Request, Get, Req, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { AttendancesService } from './attendances.service'
import { CreateAttendanceDto } from './dto/create-attendance.dto'

@UseInterceptors(ClassSerializerInterceptor)
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
  add(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.add(createAttendanceDto)
  }

  @Post('/signin')
  addIn(@Req() req, @Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.addIn(createAttendanceDto, req.user.id)
  }
}
