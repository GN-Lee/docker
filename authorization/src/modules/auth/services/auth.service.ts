import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from '../dto/signup.dto';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, password } = signupDto;
    const isUserExist = await this.userRepository.findOne({ where: { name } });
    if (isUserExist) {
      throw new ConflictException('이미 존재하는 유저입니다.');
    }

    const newPassword = await hash(password, 10);

    const newUser = await this.userRepository.create({
      name,
      password: newPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async validateUser(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { name } });
    if (!user) throw new UnauthorizedException('존재하지 않는 유저입니다.');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const player = await this.validateUser(loginDto);
    const token = this.tokenService.generateToken();
    return { player, token };
  }
}
