// Synced from backend enums in com.dev001.itviec.enums

export const ROLE = {
  ADMIN: "ADMIN",
  EMPLOYER: "EMPLOYER",
  SEEKER: "SEEKER",
} as const;
export type Role = (typeof ROLE)[keyof typeof ROLE];
export const ROLE_VALUES = Object.values(ROLE);
;

export const APPLICATION_STATUS_VALUES = [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUS_VALUES)[number];

export const COMPANY_MODEL_VALUES = [
  "PRODUCT",
  "OUTSOURCING",
  "CONSULTING_SOLUTION",
  "STARTUP",
  "CLOUD_PLATFORM",
  "RESEARCH_LAB",
] as const;
export type CompanyModel = (typeof COMPANY_MODEL_VALUES)[number];

export const COMPANY_SIZE_VALUES = [
  "SIZE_1_10",
  "SIZE_11_50",
  "SIZE_51_150",
  "SIZE_151_300",
  "SIZE_301_500",
  "SIZE_501_1000",
  "SIZE_1000_PLUS",
] as const;
export type CompanySize = (typeof COMPANY_SIZE_VALUES)[number];

export const EXPERIENCE_LEVEL_VALUES = [
  "INTERN",
  "FRESHER",
  "JUNIOR",
  "MID",
  "SENIOR",
  "LEAD",
  "MANAGER",
] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVEL_VALUES)[number];

export const GENDER_VALUES = ["MALE", "FEMALE", "OTHERS"] as const;
export type Gender = (typeof GENDER_VALUES)[number];

export const JOB_STATUS_VALUES = [
  "ACTIVE",
  "CLOSED",
  "DRAFT",
  "EXPIRED",
] as const;
export type JobStatus = (typeof JOB_STATUS_VALUES)[number];

export const JOB_TYPE_VALUES = [
  "ONSITE",
  "HYBRID",
  "REMOTE",
  "FLEXIBLE",
] as const;
export type JobType = (typeof JOB_TYPE_VALUES)[number];


export const OVERTIME_POLICY_VALUES = [
  "NO_OVERTIME",
  "OPTIONAL",
  "OCCASIONAL",
  "PAID_OT",
  "FREQUENT",
] as const;
export type OvertimePolicy = (typeof OVERTIME_POLICY_VALUES)[number];

export const TOKEN_TYPE_VALUES = ["BEARER"] as const;
export type TokenType = (typeof TOKEN_TYPE_VALUES)[number];

export const USER_STATUS_VALUES = [
  "PENDING_ACTIVATION",
  "ACTIVE",
  "DISABLED",
] as const;
export type UserStatus = (typeof USER_STATUS_VALUES)[number];

export const WORKING_HOURS_VALUES = [
  "MON_FRI",
  "MON_SAT_HALF",
  "MON_SAT",
  "FLEXIBLE",
  "HYBRID",
  "FULL_REMOTE",
] as const;
export type WorkingHours = (typeof WORKING_HOURS_VALUES)[number];

