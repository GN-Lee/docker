import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: '이름은 필수 입력 사항입니다.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력 사항입니다.' })
  password: string;
}
