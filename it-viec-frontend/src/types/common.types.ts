// Synced from backend enums in com.dev001.itviec.enums

export const ROLE_VALUES = ["ADMIN", "EMPLOYER", "SEEKER"] as const;
export type Role = (typeof ROLE_VALUES)[number];

// Backward compatibility for old frontend value.
export type LegacyRole = "USER";
export type RoleInput = Role | LegacyRole;

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Admin",
  EMPLOYER: "Employer",
  SEEKER: "Seeker",
};

export const normalizeRole = (role: RoleInput): Role => {
  return role === "USER" ? "SEEKER" : role;
};

export const APPLICATION_STATUS_VALUES = [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUS_VALUES)[number];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export const COMPANY_MODEL_VALUES = [
  "PRODUCT",
  "OUTSOURCING",
  "CONSULTING_SOLUTION",
  "STARTUP",
  "CLOUD_PLATFORM",
  "RESEARCH_LAB",
] as const;
export type CompanyModel = (typeof COMPANY_MODEL_VALUES)[number];

export const COMPANY_MODEL_LABELS: Record<CompanyModel, string> = {
  PRODUCT: "Product",
  OUTSOURCING: "Outsourcing",
  CONSULTING_SOLUTION: "Consulting / Solution",
  STARTUP: "Startup",
  CLOUD_PLATFORM: "Cloud / Platform",
  RESEARCH_LAB: "Research Lab",
};

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

export const COMPANY_SIZE_LABELS: Record<CompanySize, string> = {
  SIZE_1_10: "1-10 employees",
  SIZE_11_50: "11-50 employees",
  SIZE_51_150: "51-150 employees",
  SIZE_151_300: "151-300 employees",
  SIZE_301_500: "301-500 employees",
  SIZE_501_1000: "501-1000 employees",
  SIZE_1000_PLUS: "1000+ employees",
};

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

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  INTERN: "Intern",
  FRESHER: "Fresher",
  JUNIOR: "Junior",
  MID: "Mid",
  SENIOR: "Senior",
  LEAD: "Lead",
  MANAGER: "Manager",
};

export const GENDER_VALUES = ["MALE", "FEMALE", "OTHERS"] as const;
export type Gender = (typeof GENDER_VALUES)[number];

export const GENDER_LABELS: Record<Gender, string> = {
  MALE: "Nam",
  FEMALE: "N\u1eef",
  OTHERS: "Kh\u00e1c",
};

export const JOB_STATUS_VALUES = [
  "ACTIVE",
  "CLOSED",
  "DRAFT",
  "EXPIRED",
] as const;
export type JobStatus = (typeof JOB_STATUS_VALUES)[number];

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  ACTIVE: "Active",
  CLOSED: "Closed",
  DRAFT: "Draft",
  EXPIRED: "Expired",
};

export const JOB_TYPE_VALUES = [
  "ONSITE",
  "HYBRID",
  "REMOTE",
  "FLEXIBLE",
] as const;
export type JobType = (typeof JOB_TYPE_VALUES)[number];

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  ONSITE: "Onsite",
  HYBRID: "Hybrid",
  REMOTE: "Remote",
  FLEXIBLE: "Flexible",
};

export const OVERTIME_POLICY_VALUES = [
  "NO_OVERTIME",
  "OPTIONAL",
  "OCCASIONAL",
  "PAID_OT",
  "FREQUENT",
] as const;
export type OvertimePolicy = (typeof OVERTIME_POLICY_VALUES)[number];

export const OVERTIME_POLICY_LABELS: Record<OvertimePolicy, string> = {
  NO_OVERTIME: "No overtime (No OT)",
  OPTIONAL: "Optional (voluntary)",
  OCCASIONAL: "Occasional OT when necessary",
  PAID_OT: "Paid OT / Compensatory leave",
  FREQUENT: "Frequent OT",
};

export const TOKEN_TYPE_VALUES = ["BEARER"] as const;
export type TokenType = (typeof TOKEN_TYPE_VALUES)[number];

export const USER_STATUS_VALUES = [
  "PENDING_ACTIVATION",
  "ACTIVE",
  "DISABLED",
] as const;
export type UserStatus = (typeof USER_STATUS_VALUES)[number];

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  PENDING_ACTIVATION: "Pending Activation",
  ACTIVE: "Active",
  DISABLED: "Disabled",
};

export const WORKING_HOURS_VALUES = [
  "MON_FRI",
  "MON_SAT_HALF",
  "MON_SAT",
  "FLEXIBLE",
  "HYBRID",
  "FULL_REMOTE",
] as const;
export type WorkingHours = (typeof WORKING_HOURS_VALUES)[number];

export const WORKING_HOURS_LABELS: Record<WorkingHours, string> = {
  MON_FRI: "Monday - Friday",
  MON_SAT_HALF: "Monday - Saturday (half-day)",
  MON_SAT: "Monday - Saturday",
  FLEXIBLE: "Flexible (Flexible time)",
  HYBRID: "Hybrid (Remote + Office)",
  FULL_REMOTE: "Full Remote",
};
