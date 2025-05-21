import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: '이름은 필수 입력 사항입니다.' })
  @MinLength(3, { message: '이름은 최소 3자 이상 입력해야 합니다.' })
  @MaxLength(25, { message: '이름은 최대 25자 이하로 입력해야 합니다.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력 사항입니다.' })
  @MinLength(4, { message: '비밀번호는 최소 4자 이상 입력해야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자 이하로 입력해야 합니다.' })
  password: string;
}
