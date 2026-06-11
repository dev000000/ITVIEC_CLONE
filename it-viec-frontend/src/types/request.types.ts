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
import type {
  CityResponse,
  CountryResponse,
  SkillResponse,
} from "./response.types";

export type EntityId = number | string;
export type IsoDateString = string;
export type IsoDateTimeString = string;

export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface GetMyCompanyApplicationsParams extends PaginationParams {
  status?: ApplicationStatus;
  jobTitle?: string;
}

export interface EntityRef {
  id: EntityId;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface RegisterUserSeekerRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface ResendActivationRequest {
  email: string;
}

export interface UserUpdateRequest {
  status: UserStatus;
}

export interface AdminJobStatusUpdateRequest {
  status: JobStatus;
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

/** Form 1: Chỉ cập nhật cover letter */
export interface SeekerCoverLetterUpdateRequest {
  coverLetter: string;
}

/** Form 2: Cập nhật thông tin cơ bản (fullName, phoneNumber, desiredLocations) */
export interface SeekerBasicInfoUpdateRequest {
  fullName: string;
  phoneNumber: string;
  desiredLocations: EntityRef[];
}

/** Form 3: Cập nhật thông tin cá nhân đầy đủ */
export interface SeekerPersonalInfoUpdateRequest {
  fullName: string;
  gender: Gender;
  jobTitle: string;
  personalLink?: string;
  phoneNumber: string;
  dateOfBirth: IsoDateString;
  city?: EntityRef | null;
  address?: string;
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

export interface GetAdminJobsParams extends PaginationParams {
  title?: string;
  companyName?: string;
  status?: JobStatus;
  jobType?: JobType;
  cityId?: number;
  postedAtFrom?: IsoDateString;
  postedAtTo?: IsoDateString;
}

export interface GetAdminCompaniesParams extends PaginationParams {
  companyName?: string;
  companyModel?: CompanyModel;
  countryId?: number;
  companySize?: CompanySize;
}

export interface SearchJobsParams extends PaginationParams {
  keyword?: string;
  cityId?: number;
  jobType?: JobType;
  experienceLevel?: ExperienceLevel;
}

export interface PopularTagCreateRequest {
  category: string;
  sourceId: string;
}

export interface ApplicationRequest {
  fullName: string;
  phoneNumber: string;
  coverLetter?: string;
  desiredLocations?: EntityRef[];
}

export interface ApplicationUpdateRequest {
  status: ApplicationStatus;
  employerMessage?: string;
}

export interface CityCreateRequest {
  cityName: string;
}

export interface GetSavedJobsParams extends PaginationParams {
  sort?: "expiresAt,asc" | "expiresAt,desc";
}

export interface SkillCreateRequest {
  skillName: string;
}
