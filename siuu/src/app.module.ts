import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  // configModule : 환경변수 설정
  // isGlobal: 다른 모듈에서 별도로 임포트 안해도 환경 변수 접근 가능
  // envFilePath: ".env" 파일 경로
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
