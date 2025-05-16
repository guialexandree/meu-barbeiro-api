import { Inject, Injectable, Logger } from '@nestjs/common'
import { IUsersRepository } from '../users.repository'
import { User, UserRole } from '../entities/user.entity'
import { IDateAdapter } from '../../../infra/adapters/protocols'

@Injectable()
export class SeedUsersUseCase {
  private readonly logger = new Logger(SeedUsersUseCase.name)

  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,

    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
  ) {}

  async execute() {
    const userCount = await this.usersRepository.count()

    if (userCount === 0) {
      this.logger.verbose('Seeding Users ###')
      const users = [
        {
          name: 'guilherme',
          password: '101214',
          deviceId: 'HRJ21HH1HJ12HJ312H3JH1H2J3',
          contactNumber: '5545999872483',
          role: UserRole.Admin,
          createdAt: this.dateAdapter.now(),
          default: false,
        },
        {
          name: 'barbeiro',
          deviceId: 'HR44121HH1HJ12HJ312H3JH1H2J3',
          password: '1012',
          contactNumber: '5545999872483',
          role: UserRole.Barber,
          createdAt: this.dateAdapter.now(),
        },
        {
          name: 'sem cadastro',
          deviceId: 'HRJ21HH1HJ122312H3JH1H2J3',
          password: '1012',
          contactNumber: '5545999872483',
          role: UserRole.Client,
          createdAt: this.dateAdapter.now(),
          default: true,
        },
      ]

      const jobs: Promise<User>[] = []
      for (const user of users) {
        var newUser = new User(user)
        jobs.push(this.usersRepository.save(newUser))
      }
      await Promise.all(jobs)
    }
  }
}
