import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserParamsDto } from './dto/create-user.dto'
import { LoadUsersParamsDto } from './dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserParamsDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  search(@Param() filters?: LoadUsersParamsDto) {
    return this.usersService.search(filters)
  }

  @Get('totalizer')
  totalizer() {
    return this.usersService.loadTotalizer()
  }
}
