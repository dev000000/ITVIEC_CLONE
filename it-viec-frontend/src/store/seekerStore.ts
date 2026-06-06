import { create } from "zustand";
import type { SeekerState, SeekerActions } from "@/types/slice.types";

const withAvatarCacheBuster = (avatarUrl?: string | null) => {
  if (!avatarUrl) return undefined;

  const [baseUrl, queryString = ""] = avatarUrl.split("?");
  const searchParams = new URLSearchParams(queryString);
  searchParams.set("t", Date.now().toString());

  return `${baseUrl}?${searchParams.toString()}`;
};

const seekerInitial: SeekerState = {
  id: undefined,
  fullName: undefined,
  jobTitle: undefined,
  phoneNumber: undefined,
  dateOfBirth: undefined,
  gender: undefined,
  city: undefined,
  address: undefined,
  personalLink: undefined,
  coverLetter: undefined,
  avatarUrl: undefined,
  createdAt: undefined, // LocalDateTime (ISO string)
  updatedAt: undefined, // LocalDateTime (ISO string)
  skills: [],
  desiredLocations: [],
  isLoaded: false,
};

export const useSeekerStore = create<SeekerState & SeekerActions>((set) => ({
  ...seekerInitial,

  setSeekerFullInfo: (data) =>
    set((state) => ({
      ...state,
      ...data,
      avatarUrl:
        data.avatarUrl === undefined
          ? state.avatarUrl
          : withAvatarCacheBuster(data.avatarUrl),
      isLoaded: true,
    })),

  updateSeekerField: (field, value) =>
    set((state) => ({ ...state, [field]: value })),

  clearSeekerInfo: () => set(() => ({ ...seekerInitial })),
}));
