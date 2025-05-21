import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 사항입니다.' })
  @Length(5, 50, {
    message: '이메일은 최소 5글자 이상, 최대 50글자 이하여야 합니다.',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력 사항입니다.' })
  @MinLength(5, { message: '비밀번호는 최소 5글자 이상이어야 합니다.' })
  @MaxLength(200, { message: '비밀번호는 최대 200글자 이하여야 합니다.' })
  password: string;
}
