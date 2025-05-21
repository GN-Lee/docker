import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('teemo')
  getTeemo(): string {
    return '흐흐흫흐흐흫하하핳';
  }

  @Get('siuuu')
  getSiuuu(): string {
    return 'siuuuuuuuuuuuuuuuuuuuu';
  }
}
