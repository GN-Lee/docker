import { create } from "zustand";

type AuthState = {
  id?: number;
  nickname?: string;
  email?: string;
  isAuthenticated: boolean;
  accessToken?: string;
  setAuth: (
    id: number,
    nickname: string,
    email: string,
    accessToken: string
  ) => void;
  setAuthOff: () => void;
  //   setAccessToken: (accessToken: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  nickname: "",
  accessToken: "",
  setAuth: (
    id: number,
    nickname: string,
    email: string,
    accessToken: string
  ) => {
    set({
      isAuthenticated: true,
      id,
      nickname,
      email,
      accessToken,
    });
  },
  setAuthOff: () => {
    set({
      isAuthenticated: false,
      nickname: "",
      accessToken: "",
    });
  },
}));
