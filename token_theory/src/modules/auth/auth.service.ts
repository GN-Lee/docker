import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './services/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { nickname, email, password } = signupDto;
    const isExistNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (isExistNickname)
      throw new ConflictException('이미 존재하는 닉네임입니다.');

    const isExistEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (isExistEmail)
      throw new ConflictException('이미 존재하는 이메일입니다.');

    const hashedPW = await hash(password, 10);

    const newUser = await this.userRepository.create({
      nickname,
      email,
      password: hashedPW,
    });
    const result = await this.userRepository.save(newUser);
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const token = await this.tokenService.generateToken(user);
    return token;
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const userInfo = await this.userRepository.findOne({
      where: { email },
    });
    if (!userInfo)
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');

    const isSamePassword = await compare(password, userInfo.password);
    if (!isSamePassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    return userInfo;
  }
}
