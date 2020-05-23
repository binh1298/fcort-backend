import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserAuthDTO } from './user.dto';
import { UserEntity } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  showUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body() userDto: UserDTO) {
    return this.usersService.create(userDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  destroyUser(@Param('id') id: string) {
    return this.usersService.destroy(id);
  }

  @Post('signup')
  async signUp(@Body() userSignUpDto: UserAuthDTO): Promise<UserEntity>{
    const regExEmail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const isEmail = regExEmail.test(userSignUpDto.email);
    if (!isEmail)
      throw new HttpException('Email is invalid!', HttpStatus.BAD_REQUEST);

    const user = await this.usersService.findByEmail(userSignUpDto.email);
    if(user) throw new HttpException('This email is taken', HttpStatus.BAD_REQUEST);

    if (userSignUpDto.password != userSignUpDto.confirmPassword)
      throw new HttpException(
        'Passwords does not match!',
        HttpStatus.BAD_REQUEST,
      );
    return this.usersService.signup(userSignUpDto);
  }
  
}
