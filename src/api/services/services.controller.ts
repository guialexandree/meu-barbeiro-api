import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common'
import { ServicesService } from './services.service'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { GetServicesDto } from './dto'

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('default')
  async loadDefault() {
    return this.servicesService.loadDefault()
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id)
  }

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query() getServicesDto: GetServicesDto) {
    return this.servicesService.findAll(getServicesDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('prices')
  findServices() {
    return this.servicesService.findServices()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto)
  }

  @Patch(':id/default')
  setDefault(@Param('id') id: string) {
    return this.servicesService.setDefault(id)
  }

}
