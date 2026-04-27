import type { UserState, UserActions } from "@/types/slice.types";
import { create } from "zustand";

const userInitial: UserState = {
  ok: false,
  id: null,
  userType: "none",
};
export const useUserStore = create<UserState & UserActions>((set) => ({
  ...userInitial,
  setLogin: (data) => set(() => ({ ...data })),
  logout: () => set(() => ({ ...userInitial })),
}));
