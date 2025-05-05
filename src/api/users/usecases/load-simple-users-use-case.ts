import { Inject, Injectable } from '@nestjs/common'
import { IUsersRepository } from '../users.repository'
import { User } from '../entities/user.entity'

@Injectable()
export class LoadUsersSimpleUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    const simpleUsers = await this.usersRepository.loadSimples()

    return simpleUsers
  }
}
