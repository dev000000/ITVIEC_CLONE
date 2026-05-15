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

export type EntityId = number | string;

// Minimal relation payload accepted by backend for nested entities.
export interface EntityRef {
  id: EntityId;
}

export type CityRef = EntityRef;
export type SkillRef = EntityRef;
export type CountryRef = EntityRef;

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
  city?: CityRef | null;
  address?: string;
  personalLink?: string;
  coverLetter?: string;
  skills?: SkillRef[];
  desiredLocations?: CityRef[];
}

export interface CompanyUpdateRequest {
  companyName: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  address: string;
  companyModel: CompanyModel;
  industry: string;
  companySize: CompanySize;
  country: CountryRef;
  workingHours: WorkingHours;
  overtimePolicy: OvertimePolicy;
  companyIntroduction: string;
  ourExpertise: string;
  whyWorkHere: string;
  companySkills?: SkillRef[];
}

export interface JobCreateRequest {
  companyId: string;
  title: string;
  jobReason: string;
  jobDescription: string;
  jobRequirements: string;
  whyJoinUs: string;
  location: string;
  city: CityRef;
  salary: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  postedAt: IsoDateTimeString;
  expiresAt: IsoDateTimeString;
  skills: SkillRef[];
}

export interface JobUpdateRequest {
  title: string;
  jobReason: string;
  jobDescription: string;
  jobRequirements: string;
  whyJoinUs: string;
  location: string;
  city?: CityRef | null;
  salary: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  postedAt: IsoDateTimeString;
  expiresAt: IsoDateTimeString;
  status: JobStatus;
  skills?: SkillRef[];
}

export interface ApplicationRequest {
  fullName: string;
  phoneNumber: string;
  coverLetter?: string;
  desiredLocations?: CityRef[];
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
