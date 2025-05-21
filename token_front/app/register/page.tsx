"use client";
import { signup } from "@/src/apis/auth/loginAPI";
import { useState } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Form = {
  email: string;
  password: string;
  nickname: string;
};

export const Page = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    toast.error("로그인 후 이용해주세요.");
    router.push("/login");
  }
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
    nickname: "",
  });

  const changeForm = (name: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const result = await signup(form.nickname, form.email, form.password);
    toast.success("회원가입 성공");
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">회원등록 페이지</h1>
      <section className="flex flex-col gap-4 w-frull max-w-sm mx-auto p-4 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col gap-2">
          <input
            className="w-full p-2 border border-gray-700 rounded-md text-gray-700"
            type="text"
            placeholder="닉네임입력"
            value={form.nickname}
            onChange={(e) => changeForm("nickname", e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-700 rounded-md text-gray-700"
            type="text"
            placeholder="이메일입력"
            value={form.email}
            onChange={(e) => changeForm("email", e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-700 rounded-md text-gray-700"
            type="password"
            placeholder="비밀번호입력"
            value={form.password}
            onChange={(e) => changeForm("password", e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          회원가입하기
        </button>
      </section>
    </div>
  );
};

export default Page;
