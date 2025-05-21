"use client";
import { login } from "@/src/apis/auth/loginAPI";
import { useState } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type Form = {
  email: string;
  password: string;
};

export const Page = () => {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuthStore();
  const [form, setForm] = useState<Form>({ email: "", password: "" });

  const changeForm = (name: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // if (isAuthenticated) router.back();

  const handleSubmit = async () => {
    const result = await login(form.email, form.password);
    const { id, nickname, email } = jwtDecode<{
      id: number;
      nickname: string;
      email: string;
    }>(result.data.data);
    setAuth(id, nickname, email, result.data.data);
    router.replace("/");
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">로그인 페이지</h1>
      <section className="flex flex-col gap-4 w-frull max-w-sm mx-auto p-4 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col gap-2">
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
          로그인
        </button>
      </section>
    </div>
  );
};

export default Page;
