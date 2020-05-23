import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupDTO } from './group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  
  @Get()
  showUsers() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.groupsService.findById(id);
  }

  @Post()
  createUser(@Body() groupDto: GroupDTO) {
    return this.groupsService.create(groupDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: Partial<GroupDTO>) {
    return this.groupsService.update(id, data);
  }

  @Delete(':id')
  destroyUser(@Param('id') id: string) {
    return this.groupsService.destroy(id);
  }
}
