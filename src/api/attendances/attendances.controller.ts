import { Controller, Post, Body, Request, Get, Req, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { AttendancesService } from './attendances.service'
import { CreateAttendanceDto, CancelAttendanceDto } from './dto'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Get()
  loadAttendances() {
    return this.attendancesService.loadToday()
  }

  @Get('/info')
  loadInfoToday() {
    return this.attendancesService.loadInfoToday()
  }

  @Get('/info/clients')
  findInfoClients() {
    return this.attendancesService.findAttendancesInfo()
  }

  @Get('/user')
  loadAttendancesByUser(@Req() req) {
    const userId = req.user.id
    return this.attendancesService.loadByUser(userId)
  }

  @Post('/:id/start')
  startAttendance(@Param('id') id: string) {
    return this.attendancesService.startAttendance(id)
  }

  @Post('/:id/end')
  endAttendance(@Param('id') id: string) {
    return this.attendancesService.endAttendance(id)
  }

  @Post('/:id/cancel')
  cancelAttendance(@Body() cancelAttendanceDto: CancelAttendanceDto) {
    return this.attendancesService.cancelAttendance(cancelAttendanceDto)
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
