import { Injectable } from '@nestjs/common';
import { GroupEntity } from 'src/entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class GroupsFavoritesService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupsRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(userId: string): Promise<UserEntity[]> {
    const favorites = await this.usersRepository.find({
      relations: ['favorites'],
      where: { userId },
    });
    return favorites;
  }
}
