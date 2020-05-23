import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(userDto: UserDTO): Promise<UserEntity> {
    const user = await this.usersRepository.create(userDto);
    await this.usersRepository.save(user);
    return user;
  }

  async update(id: string, data: Partial<UserDTO>) {
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ id });
  }

  async destroy(id: string): Promise<boolean> {
    await this.usersRepository.delete({ id });
    return true;
  }
}
