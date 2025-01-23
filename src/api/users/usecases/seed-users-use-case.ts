import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUsersRepository } from '../users.repository';
import { User, UserRole } from '../entities/user.entity';
import { IDateAdapter } from '@/infra/adapters/protocols';

@Injectable()
export class SeedUsersUseCase {
  private readonly logger = new Logger(SeedUsersUseCase.name);

  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,

    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter
  ) {}

  async execute (){
    const userCount = await this.usersRepository.count()

    if (userCount === 0) {
      this.logger.verbose('Seeding Users ###')
      const users = [
        {
          name: 'Guilherme',
          username: 'gui',
          password: '1012',
          contactNumber: '5545999872483',
          role: UserRole.Admin,
          createdAt: this.dateAdapter.now(),
        },
        {
          name: 'Barbeiro',
          username: 'barbeiro',
          password: '1012',
          contactNumber: '5545999872483',
          role: UserRole.Barber,
          createdAt: this.dateAdapter.now(),
        },
        {
          name: 'Cliente',
          username: 'client',
          password: '1012',
          contactNumber: '5545999872483',
          role: UserRole.Client,
          createdAt: this.dateAdapter.now(),
        }
      ]

      const jobs: Promise<User>[] = [];
      for (const user of users) {
        var newUser = new User(user);
        jobs.push(this.usersRepository.save(newUser))
      }
      await Promise.all(jobs);
    }
  }
}
