import { NextRequest, NextResponse } from "next/server";
import { useAuthStore } from "@/src/store/auth.store";

// 작동되는 곳 : 브라우저(클라이언트)[주스탄트에 토큰 있음]
// app 폴더
// components 폴더

//작동되는 곳 : next.js 시작전
// middleware.ts 파일
export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname === "/login") {
    console.log("로그인 페이지임ㅋ");
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/login"],
};
