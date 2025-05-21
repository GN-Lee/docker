import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SampleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // jwt 토큰은 조작이 가능하므로 토큰을 검증해야함
    // 토큰 검증 대상: id, email, nickname
    // 시크릿: teemo, 만료기간: 5m

    console.log('가드로 막아보자잇');
    return true;
  }
}
