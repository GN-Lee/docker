import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './services/auth.controller';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'teemo',
      signOptions: { expiresIn: '40s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, UsersService, JwtStrategy],
})
export class AuthModule {}
