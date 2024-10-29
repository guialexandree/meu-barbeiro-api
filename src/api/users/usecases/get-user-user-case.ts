import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute (userName: string){
    const user = await this.usersRepository.findUser(userName);
    return user
  }
}

// buscar usuario por whatsapp
// buscar por token instagram
// criar modulo sms
