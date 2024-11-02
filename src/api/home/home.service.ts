import { Inject, Injectable } from '@nestjs/common';
import { GetHomeInfoUseCase } from './usecases/get-home-info-use-case';

@Injectable()
export class HomeService {
  constructor(
    @Inject()
    private readonly getHomeInfoUseCase: GetHomeInfoUseCase
  ) {}
  findHomeInfo() {
    return this.getHomeInfoUseCase.execute();
  }
}
