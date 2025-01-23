import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class ChangeNameUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute(name: string, userId: string) {
    const user = await this.userRepository.findById(userId);
    user.name = name;

    return this.userRepository.save(user);
  }
}
