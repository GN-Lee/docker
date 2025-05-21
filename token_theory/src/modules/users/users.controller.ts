import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    const result = await this.userRepository.save(newUser);
    return {
      data: result,
      message: `${createUserDto.nickname}님 회원가입이 완료되었습니다.`,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'findOne';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return 'update';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'remove';
  }
}
