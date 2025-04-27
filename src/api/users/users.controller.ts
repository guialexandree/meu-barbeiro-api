import { Body, Controller, Get, Query, Post, Param, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { UsersService } from './users.service'
import { LoadUsersParamsDto, CreateUserParamsDto } from './dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserParamsDto) {
    return this.usersService.create(createUserDto)
  }

  @Get('/totalizer')
  totalizer() {
    return this.usersService.loadTotalizer()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  search(@Query() filters: LoadUsersParamsDto) {
    return this.usersService.search(filters)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }
}
