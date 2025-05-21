"use client";
import { useAuthStore } from "@/src/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, id, nickname, email } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">
        {nickname}님의 마이페이지
      </h1>
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <span className="font-semibold">고유 번호:</span>
            <span className="ml-2 text-gray-700">{id}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <span className="font-semibold">이메일:</span>
            <span className="ml-2 text-gray-700">{email}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
