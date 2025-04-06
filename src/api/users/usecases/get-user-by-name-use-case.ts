import { Inject, Injectable } from '@nestjs/common'
import { IUsersRepository } from '../users.repository'

@Injectable()
export class LoadUserByNameUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(userName: string) {
    const user = await this.usersRepository.find(userName)
    return user
  }
}
