import { Inject, Injectable } from '@nestjs/common'
import { IUsersRepository } from '../users.repository'
import { CreateUserParamsDto } from '../dto/create-user.dto'
import { User, UserRole } from '../entities/user.entity'
import { IDateAdapter } from '../../../infra/adapters/protocols'
import { PasswordEncoder } from '../../../infra/adapters'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async execute(input: CreateUserParamsDto) {
    const passwordEncoder = await this.passwordEncoder.encode(input.name)

    const user = new User({
      ...input,
      password: passwordEncoder,
      name: input.name.toLowerCase(),
      createdAt: this.dateAdapter.now(),
      role: input.role ?? UserRole.Client,
    })

    return this.userRepository.save(user)
  }
}
