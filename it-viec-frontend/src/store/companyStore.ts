import type { CompanyState, CompanyActions } from "@/types/slice.types";
import { create } from "zustand";

const companyInitial: CompanyState = {
  id: undefined,
  companyName: undefined,
  slug: undefined,
  description: undefined,
  website: undefined,
  logoUrl: undefined,
  address: undefined,
  companyModel: undefined,
  industry: undefined,
  companySize: undefined,
  country: undefined,
  workingHours: undefined,
  overtimePolicy: undefined,
  companyIntroduction: undefined,
  ourExpertise: undefined,
  whyWorkHere: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  companySkills: [],
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
