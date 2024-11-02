import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { GetHomeInfoUseCase } from './usecases/get-home-info-use-case';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [CompaniesModule],
  controllers: [HomeController],
  providers: [HomeService, GetHomeInfoUseCase],
})
export class HomeModule {}
