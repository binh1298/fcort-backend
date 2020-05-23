import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  showUsers() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() userDto: UserDTO) {
    return this.usersService.create(userDto);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.read(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  destroyUser(@Param('id') id: string) {
    return this.usersService.destroy(id);
  }
}
