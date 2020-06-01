import { Controller, UseGuards, Get, Query, Request } from '@nestjs/common';
import { GroupsFavoritesService } from './groups-favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class GroupsFavoritesController {
  constructor(
    private readonly groupsFavoritesService: GroupsFavoritesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getFavoriteGroups(@Request() req) {
    return this.groupsFavoritesService.findAll(req.user.id);
  }
}
