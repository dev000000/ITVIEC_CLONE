import type {
  ApplicationStatus,
  CompanyModel,
  CompanySize,
  ExperienceLevel,
  Gender,
  JobStatus,
  JobType,
  SalaryCurrency,
  OvertimePolicy,
  Role,
  UserStatus,
  WorkingHours,
} from "./common.types";

/**
 * Generic API response wrapper
 */
export interface APIResponse<T> {
  code: number;
  message: string;
  result: T;
}

/**
 * Generic pagination response wrapper
 */
export interface PageResponse<T> {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first?: boolean;
  last?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

// --- Common Metadata Types ---

export interface CityResponse {
  id: number;
  cityName: string;
  slug: string;
}

export interface CountryResponse {
  id: number;
  countryName: string;
}

export interface SkillResponse {
  id: number;
  skillName: string;
}

// --- Auth & User Types ---

export interface AuthenticationResponse {
  authenticated: boolean;
  id: string;
  email: string;
  role: Role;
  status?: UserStatus;
}

export interface UserResponse {
  id: string;
  email: string;
  role: Role;
  status: UserStatus;
}

export interface RegisterUserSeekerResponse {
  id: string;
  username: string;
}

export interface EmployerResponse {
  id: string;
  user: UserResponse;
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
}

export interface SeekerResponse {
  id: string;
  user: UserResponse;
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  dateOfBirth: string; // LocalDate (ISO string)
  gender: Gender;
  city: CityResponse;
  address: string;
  personalLink: string;
  coverLetter: string;
  avatarUrl?: string | null;
  createdAt: string; // LocalDateTime (ISO string)
  updatedAt: string; // LocalDateTime (ISO string)
  skills: SkillResponse[];
  desiredLocations: CityResponse[];
}

// --- Company Types ---

export interface CompanyBaseResponse {
  id: string;
  companyName: string;
  slug: string;
  logoUrl: string;
}

export interface CompanyBriefResponse {
  id: string;
  companyName: string;
  slug: string;
  logoUrl: string;
  description: string;
  companyModel: CompanyModel;
  country: CountryResponse;
  workingHours: WorkingHours;
  overtimePolicy: OvertimePolicy;
  industry: string;
  companySize: CompanySize;
}

export interface CompanyCardResponse {
  id: string;
  companyName: string;
  slug: string;
  logoUrl: string;
  address: string;
  companySkills: SkillResponse[];
  numberOfJobsActive: number;
}

export interface CompanyOptionResponse {
  id: string;
  companyName: string;
  slug: string;
}

export interface CompanyDetailResponse {
  id: string;
  companyName: string;
  slug: string;
  description: string;
  website: string;
  logoUrl: string;
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
  createdAt: string;
  updatedAt: string;
  companySkills: SkillResponse[];
  jobs: JobCardResponse[];
}

// --- Job Types ---

export interface JobSalaryResponse {
  salary?: string | null;
  salaryNegotiable?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: SalaryCurrency | null;
}

export interface JobCardResponse extends JobSalaryResponse {
  id: number;
  title: string;
  slug: string;
  city: CityResponse;
  jobType: JobType;
  status: JobStatus;
  postedAt: string; // LocalDateTime
  skills: SkillResponse[];
  company: CompanyBaseResponse;
}

export interface JobDetailResponse extends JobSalaryResponse {
  id: number;
  company: CompanyBriefResponse;
  title: string;
  slug: string;
  jobReason: string;
  jobDescription: string;
  jobRequirements: string;
  whyJoinUs: string;
  location: string;
  city: CityResponse;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  postedAt: string;
  expiresAt: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  skills: SkillResponse[];
}

export interface PopularTagResponse {
  id: number;
  category: string;
  name: string;
  sourceId: string;
  companySlug?: string | null;
}

// --- Application Types ---

export interface SeekerBasicResponse {
  id: string;
  cvUrl: string;
}

export interface ApplicationResponse {
  id: string;
  job?: JobCardResponse;
  seeker?: SeekerBasicResponse;
  fullName: string;
  phoneNumber: string;
  resumeUrl: string;
  resumePreviewUrl?: string;
  cvFileId?: string;
  coverLetter: string;
  status: ApplicationStatus;
  employerMessage: string;
  createdAt: string;
  updatedAt: string;
  desiredLocations: CityResponse[];
}

export interface ApplicationCreateResponse {
  id: string;
  job: JobDetailResponse;
  fullName: string;
  phoneNumber: string;
  resumeUrl: string;
  resumePreviewUrl?: string;
  cvFileId?: string;
  coverLetter: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  desiredLocations: CityResponse[];
}

export interface ApplicationCheckResponse {
  applied: boolean;
  createdAt?: string | null;
}

// --- Saved Job Types ---

export interface SavedJobItemResponse extends JobSalaryResponse {
  id: number;
  title: string;
  slug: string;
  city: CityResponse;
  jobType: JobType;
  status: JobStatus;
  postedAt: string;
  expiresAt: string;
  skills: SkillResponse[];
  company: CompanyBaseResponse;
}

export interface SavedJobResponse {
  id: string;
  savedAt: string;
  job: SavedJobItemResponse;
}

export interface EmployerRegistrationResponse {
  userId: string;
  email: string;
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  referralSource?: string;
  companyName: string;
  companyAddress: string;
  website?: string;
  status: UserStatus;
  createdAt: string;
}

export interface CompanyProfileStatusResponse {
  complete: boolean;
  missingFields: string[];
}
