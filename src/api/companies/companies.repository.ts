import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'

export interface ICompaniesRepository {
  find(): Promise<Company>
  findFirst(): Promise<Company>
  save(input: Company): Promise<Company>
  count(): Promise<number>
}

@Injectable()
export class CompaniesRepository implements ICompaniesRepository {
  constructor(
    @InjectRepository(Company)
    private repository: Repository<Company>,
  ) {}

  save(input: Company): Promise<Company> {
    return this.repository.save(input)
  }

  async find(): Promise<Company> {
    const companies = await this.repository.find({
      order: {
        id: 'ASC',
      },
    })
    return companies.at(0)
  }

  async findFirst(): Promise<Company> {
    const companies = await this.repository.find({
      order: {
        id: 'ASC',
      },
      take: 1,
    })

    if (companies.length === 0) {
      return null
    }

    return companies.at(0)
  }

  count(): Promise<number> {
    return this.repository.count()
  }
}
