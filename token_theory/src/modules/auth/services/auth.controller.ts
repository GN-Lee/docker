import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseGuards(JwtAuthGuard)
  async signup(@Body() signupDto: SignupDto, @Req() req) {
    console.log(`req:${req.user}`);
    const result = await this.authService.signup(signupDto);
    return {
      data: result,
      message: `${result.nickname}님 회원가입이 완료되었습니다.`,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      data: result,
      message: '로그인 성공',
    };
  }
}
