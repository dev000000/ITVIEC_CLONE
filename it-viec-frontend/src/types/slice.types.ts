import type { CompanyModel, CompanySize, Gender, OvertimePolicy, Role, UserStatus, WorkingHours } from "./common.types";
import type { AuthenticationResponse, CityResponse, CountryResponse, JobCardResponse, SkillResponse } from "./response.types";

export interface UserState {
  authenticated: boolean;
  id: string | undefined;
  email: string | undefined;
  role: Role | undefined;
  status: UserStatus | undefined;
}

export interface SeekerState {
  id: string | undefined;
  fullName: string | undefined;
  jobTitle: string | undefined;
  phoneNumber: string | undefined;
  dateOfBirth: string | undefined; // LocalDate (ISO string)
  gender: Gender | undefined;
  city: CityResponse | undefined;
  address: string | undefined;
  personalLink: string | undefined;
  coverLetter: string | undefined;
  createdAt: string | undefined; // LocalDateTime (ISO string)
  updatedAt: string | undefined; // LocalDateTime (ISO string)
  skills: SkillResponse[];
  desiredLocations: CityResponse[];
  isLoaded: boolean;
}

export interface CompanyState {
  id: string | undefined;
  companyName: string | undefined;
  slug: string | undefined;
  description: string | undefined;
  website: string | undefined;
  logoUrl: string | undefined;
  address: string | undefined;
  companyModel: CompanyModel | undefined;
  industry: string | undefined;
  companySize: CompanySize | undefined;
  country: CountryResponse | undefined;
  workingHours: WorkingHours | undefined;
  overtimePolicy: OvertimePolicy | undefined;
  companyIntroduction: string | undefined;
  ourExpertise: string | undefined;
  whyWorkHere: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  companySkills: SkillResponse[];
  jobs: JobCardResponse[];
  isLoaded: boolean;
}

export interface UserActions {
  setLogin: (data: Partial<UserState>) => void;
  logout: () => void;
}

export interface SeekerActions {
  setSeekerFullInfo: (data: Partial<SeekerState>) => void;
  updateSeekerField: <K extends keyof SeekerState>(
    field: K,
    value: SeekerState[K],
  ) => void;
  clearSeekerInfo: () => void;
}

export interface CompanyActions {
  setCompanyFullInfo: (data: Partial<CompanyState>) => void;
  updateCompanyField: <K extends keyof CompanyState>(
    field: K,
    value: CompanyState[K],
  ) => void;
  clearCompanyInfo: () => void;
}
