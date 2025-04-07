import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

export interface IUsersRepository {
  find(username: string): Promise<User>
  findPaginated(search: string, page: number, limit: number): Promise<User[]>
  findById(id: string): Promise<User>
  save(service: User): Promise<User>
  count(search?: string): Promise<number>
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  find(username: string): Promise<User> {
    return this.repository.findOne({
      where: { username: username.toLowerCase() },
    })
  }

  findPaginated(search: string, page: number, limit: number): Promise<User[]> {
    const offset = (page - 1) * limit
    const whereCondition = search ? { username: search.toLowerCase() } : {}

    return this.repository.find({
      where: whereCondition,
      skip: offset,
      take: limit,
      order: { name: 'asc' },
    })
  }

  findById(id: string): Promise<User> {
    return this.repository.findOneBy({ id })
  }

  save(user: User): Promise<User> {
    return this.repository.save(user)
  }

  count(search?: string): Promise<number> {
    if (search) {
      return this.repository.count({
      where: { username: search.toLowerCase() },
      })
    }
    return this.repository.count()
  }
}
