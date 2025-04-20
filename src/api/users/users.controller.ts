import { Body, Controller, Get, Query, Post, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { LoadUsersParamsDto, CreateUserParamsDto } from './dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserParamsDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('/totalizer')
  totalizer() {
    console.log('Totalizer')
    return this.usersService.loadTotalizer()
  }

  @Get()
  search(@Query() filters?: LoadUsersParamsDto) {
    return this.usersService.search(filters)
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

}
