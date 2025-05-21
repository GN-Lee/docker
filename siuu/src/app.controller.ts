import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image')) // image 라는 이름의 파일 필드 인터셉터
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.appService.uploadImage(file);
  }
}
