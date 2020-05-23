import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

import { CustomLocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'hehehe',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, CustomLocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
