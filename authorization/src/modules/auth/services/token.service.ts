import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken() {
    return this.jwtService.sign(
      { sub: 100, name: 'teemo' },
      { expiresIn: '1m', secret: 'mashroom' },
    );
  }
}
