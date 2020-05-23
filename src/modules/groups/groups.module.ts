import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/entities/group.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
