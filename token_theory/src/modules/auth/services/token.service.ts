import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(user: User) {
    const payload = { id: user.id, nickname: user.nickname };
    return this.jwtService.sign(payload);
  }
}
