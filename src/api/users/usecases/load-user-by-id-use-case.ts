import { Inject, Injectable } from '@nestjs/common'
import { IUsersRepository } from '../users.repository'

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)
    return user
  }
}
