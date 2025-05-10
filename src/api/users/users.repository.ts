import { Injectable } from '@nestjs/common'
import { Like, MoreThanOrEqual, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

export interface IUsersRepository {
  find(username: string): Promise<User>
  loadDefault(): Promise<User>
  loadSimples(): Promise<User[]>
  findPaginated(search: string, page: number, limit: number): Promise<User[]>
  findById(id: string): Promise<User>
  save(service: User): Promise<User>
  count(search?: string): Promise<number>
  countStartDate(startDate: Date): Promise<number>
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  find(username: string): Promise<User> {
    return this.repository.findOne({
      where: { name: username.toLowerCase() },
    })
  }

  loadDefault(): Promise<User> {
    return this.repository.findOne({
      where: { default: true },
    })
  }

  loadSimples(): Promise<User[]> {
    return this.repository.find({
      select: ['id', 'name', 'nickname'],
    })
  }

  findPaginated(search: string, page: number, limit: number): Promise<User[]> {
    const offset = (page - 1) * limit
    const whereCondition = search
      ? { name: Like(`%${search}%`) }
      : {}

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
        where: { name: search },
      })
    }
    return this.repository.count()
  }

  countStartDate(startDate?: Date): Promise<number> {
    return this.repository.count({
      where: { createdAt: MoreThanOrEqual(startDate) },
    })
  }
}
