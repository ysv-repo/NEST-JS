import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';
// import { JwtAuthGuard } from 'src/services/jwt-auth.guard';
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  usersRepository: any;
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-user')
  async createUser(@Body() createUserDto: UserDto): Promise<User> {
    throw new Error('Method not implemented.');
    return this.usersService.createUser(createUserDto);
  }

  @Get('/allUsers')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put('/update-user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() dto: UserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, dto);
  }

  @Get('/allUsersByQuery')
  async findAllByQuery(): Promise<User[]> {
    return this.usersService.findAllByQuery();
  }

  @Get('/getUserByIds/:ids')
  async getUserByIds(@Param('ids') ids: string): Promise<User[]> {
    return this.usersService.getUserByIds(ids);
  }
}
