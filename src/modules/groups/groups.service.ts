import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entity';
import { Repository } from 'typeorm';
import { GroupDTO } from './group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupsRepository: Repository<GroupEntity>,
  ) {}

  async findAll(): Promise<GroupEntity[]> {
    return this.groupsRepository.find();
  }

  async findById(id: string): Promise<GroupEntity> {
    return await this.groupsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.groupsRepository.delete(id);
  }

  async create(groupDto: GroupDTO): Promise<GroupEntity> {
    const group = await this.groupsRepository.create(groupDto);
    await this.groupsRepository.save(group);
    return group;
  }

  async update(id: string, data: Partial<GroupDTO>) {
    await this.groupsRepository.update({ id }, data);
    return await this.groupsRepository.findOne({ id });
  }

  async destroy(id: string): Promise<boolean> {
    await this.groupsRepository.delete({ id });
    return true;
  }
}
