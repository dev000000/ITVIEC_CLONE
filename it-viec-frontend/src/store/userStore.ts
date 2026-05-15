import type { UserState, UserActions } from "@/types/slice.types";
import { create } from "zustand";

const userInitial: UserState = {
  authenticated: false,
  id: undefined,
  email: undefined,
  role: undefined,
  status: undefined
};
export const useUserStore = create<UserState & UserActions>((set) => ({
  ...userInitial,
  setLogin: (data) => set(() => ({ ...data })),
  logout: () => set(() => ({ ...userInitial })),
}));
