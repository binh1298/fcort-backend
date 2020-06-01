import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RouterModule, Routes } from 'nest-router';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseDataInterceptor } from './interceptors/response-data.interceptor';
import { GroupsModule } from './modules/groups/groups.module';
import { configService } from './config/config.service';
import { GroupsFavoritesModule } from './modules/groups-favorites/groups-favorites.module';

const routes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/users',
    module: UsersModule,
  },
  {
    path: '/favorites',
    module: GroupsFavoritesModule,
  },
  {
    path: '/groups',
    module: GroupsModule,
  },
];
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RouterModule.forRoutes(routes), // setup the routes
    UsersModule,
    AuthModule,
    GroupsModule,
    GroupsFavoritesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseDataInterceptor,
    },
  ],
})
export class AppModule {}
