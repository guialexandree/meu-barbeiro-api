import { Controller, Get, Request } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService

  ) {}

  @Get()
  findAll(@Request() req) {
    return this.homeService.findHomeInfo('afedb371-858a-4afd-a5bc-f45f08d51571');
  }
}
