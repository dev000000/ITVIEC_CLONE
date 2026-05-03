import type { CompanyState, CompanyActions } from "@/types/slice.types";
import { create } from "zustand";

const companyInitial: CompanyState = {
  id: 0,
  userId: 0,
  companyName: "",
  description: "",
  website: "",
  logoUrl: "",
  address: "",
  companyModel: "",
  industry: "",
  companySize: "",
  country: "",
  workingHours: "",
  overtimePolicy: "",
  openPositions: 0,
  rating: 0,
  reviewCount: 0,
  recommendationRate: 0,
  postCount: 0,
  createdAt: "",
  skills: [],
  companyIntroduction: "",
  ourExpertise: "",
  whyWorkHere: "",
  jobs: [],
  isLoaded: false,
};

export const useCompanyStore = create<CompanyState & CompanyActions>((set) => ({
  ...companyInitial,

  setCompanyFullInfo: (data) =>
    set((state) => ({ ...state, ...data, isLoaded: true })),

  updateCompanyField: (field, value) =>
    set((state) => ({ ...state, [field]: value })),

  clearCompanyInfo: () => set(() => ({ ...companyInitial })),
}));
