import { create } from "zustand";
import type { SeekerState, SeekerActions } from "@/types/slice.types";

const seekerInitial: SeekerState = {
  id: 0,
  userId: 0,
  fullName: "",
  jobTitle: "",
  phoneNumber: "",
  skills: [],
  dateOfBirth: "",
  gender: "",
  city: "",
  address: "",
  personalLink: "",
  gmail: "",
  coverLetter: "",
  desiredLocations: [],
  isLoaded: false,
};

export const useSeekerStore = create<SeekerState & SeekerActions>((set) => ({
  ...seekerInitial,

  setSeekerFullInfo: (data) =>
    set((state) => ({ ...state, ...data, isLoaded: true })),

  updateSeekerField: (field, value) =>
    set((state) => ({ ...state, [field]: value })),

  clearSeekerInfo: () => set(() => ({ ...seekerInitial })),
}));
