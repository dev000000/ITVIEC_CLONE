import type {
  ApplicationStatus,
  CompanyModel,
  CompanySize,
  ExperienceLevel,
  Gender,
  JobStatus,
  JobType,
  OvertimePolicy,
  UserStatus,
  WorkingHours,
} from "./common.types";

export interface GetMyCompanyApplicationsParams {
  page?: number;
  size?: number;
  status?: ApplicationStatus;
  jobTitle?: string;
}
import type {
  CityResponse,
  CountryResponse,
  SkillResponse,
} from "./response.types";

export type EntityId = number | string;
export type IsoDateString = string;
export type IsoDateTimeString = string;

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface RegisterUserSeekerRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface UserUpdateRequest {
  status: UserStatus;
}

export interface EmployerUpdateRequest {
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
}

export interface SeekerUpdateRequest {
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  dateOfBirth: IsoDateString;
  gender: Gender;
  city?: CityResponse | null;
  address?: string;
  personalLink?: string;
  coverLetter?: string;
  skills?: SkillResponse[];
  desiredLocations?: CityResponse[];
}

export interface CompanyUpdateRequest {
  companyName: string;
  description: string;
  website?: string;
  logoUrl?: string;
  address: string;
  companyModel: CompanyModel;
  industry: string;
  companySize: CompanySize;
  country: CountryResponse;
  workingHours: WorkingHours;
  overtimePolicy: OvertimePolicy;
  companyIntroduction: string;
  ourExpertise: string;
  whyWorkHere: string;
  companySkills?: SkillResponse[];
}

export interface JobCreateRequest {
  title: string;
  jobReason: string;
  jobDescription: string;
  jobRequirements: string;
  whyJoinUs: string;
  location: string;
  city: CityResponse;
  salary: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  postedAt: IsoDateTimeString;
  expiresAt: IsoDateTimeString;
  status: JobStatus;
  skills: SkillResponse[];
}

export interface JobUpdateRequest {
  title: string;
  jobReason: string;
  jobDescription: string;
  jobRequirements: string;
  whyJoinUs: string;
  location: string;
  city: CityResponse;
  salary: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  postedAt: IsoDateTimeString;
  expiresAt: IsoDateTimeString;
  status: JobStatus;
  skills: SkillResponse[];
}

export interface ApplicationRequest {
  fullName: string;
  phoneNumber: string;
  coverLetter?: string;
  desiredLocations?: CityResponse[];
}

export interface ApplicationUpdateRequest {
  status: ApplicationStatus;
  employerMessage?: string;
}

export interface CityCreateRequest {
  cityName: string;
}

export interface SkillCreateRequest {
  skillName: string;
}
