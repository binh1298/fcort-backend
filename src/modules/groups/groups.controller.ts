import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupDTO } from './group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  showGroups(@Request() req) {
    return this.groupsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getGroup(@Param('id') id: string) {
    return this.groupsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createGroup(@Request() req, @Body() groupDto: GroupDTO) {
    return this.groupsService.create(req.user.id, groupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateGroup(@Param('id') id: string, @Body() data: Partial<GroupDTO>) {
    return this.groupsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  destroyGroup(@Request() req, @Param('id') id: string) {
    return this.groupsService.destroy(req.user.id, id);
  }
}
