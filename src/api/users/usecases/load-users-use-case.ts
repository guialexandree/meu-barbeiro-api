import { Inject, Injectable } from '@nestjs/common'
import { IUsersRepository } from '../users.repository'
import { LoadUsersParamsDto } from '../dto'
import { PaginatedResult } from '../../../infra/protocols'
import { User } from '../entities/user.entity'

@Injectable()
export class LoadUsersUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(filters: LoadUsersParamsDto): Promise<User[]> {
    filters.page = filters.page || 1
    filters.limit = filters.limit || 10
    filters.search = filters.search?.toLowerCase()

    const users = await this.usersRepository.findPaginated(
      filters.search,
      filters.page,
      filters.limit,
    )

    return users
  }
}

