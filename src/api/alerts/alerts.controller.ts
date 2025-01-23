import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.remove({ id });
  }

  @Post()
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertsService.update(id, updateAlertDto);
  }

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }
}
