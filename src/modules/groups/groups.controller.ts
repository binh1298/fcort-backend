import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupDTO } from './group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  showGroups() {
    return this.groupsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getGroup(@Param('id') id: string) {
    return this.groupsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createGroup(@Body() groupDto: GroupDTO) {
    return this.groupsService.create(groupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateGroup(@Param('id') id: string, @Body() data: Partial<GroupDTO>) {
    return this.groupsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  destroyGroup(@Param('id') id: string) {
    return this.groupsService.destroy(id);
  }
}
