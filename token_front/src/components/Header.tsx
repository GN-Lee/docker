"use client";
import Link from "next/link";
import { useAuthStore } from "@/src/store/auth.store";

export const Header = () => {
  const { isAuthenticated, nickname } = useAuthStore();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex p-4 lg:px-8 justify-center">
        <div className="text-black flex justify-center items-center gap-4">
          {isAuthenticated ? (
            <div className="flex gap-4">
              <span className="text-blue-500 font-bold">
                {nickname}님 환영합니다.
              </span>
              <Link href="/mypage">마이페이지</Link>
              <Link href="/register">회원등록</Link>
            </div>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
