import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entity';

@Module({ imports: [TypeOrmModule.forFeature([GroupEntity])] })
export class GroupsModule {}
