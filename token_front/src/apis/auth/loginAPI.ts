import { toast } from "react-toastify";
import { api } from "../commonAPI";
import { AxiosResponse } from "axios";

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<{ data: string }>> => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response;
  } catch (error) {
    toast.error("로그인 실패");
    throw "에러님 GG";
  }
};

export const signup = async (
  nickname: string,
  email: string,
  password: string
): Promise<AxiosResponse<{ data: string }>> => {
  try {
    const response = await api.post("/auth/signup", {
      nickname,
      email,
      password,
    });
    return response;
  } catch (error) {
    toast.error("회원가입 실패");
    throw "에러님 GG";
  }
};
