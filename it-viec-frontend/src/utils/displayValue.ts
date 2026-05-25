import type {
  ApplicationStatus,
  CompanyModel,
  CompanySize,
  ExperienceLevel,
  Gender,
  JobStatus,
  JobType,
  OvertimePolicy,
  Role,
  UserStatus,
  WorkingHours,
} from "@/types/common.types";

// ---------------------------------------------------------------------------
// Vietnamese label maps
// ---------------------------------------------------------------------------

export const COMPANY_SIZE_VI: Record<CompanySize, string> = {
  SIZE_1_10: "1-10 nhân viên",
  SIZE_11_50: "11-50 nhân viên",
  SIZE_51_150: "51-150 nhân viên",
  SIZE_151_300: "151-300 nhân viên",
  SIZE_301_500: "301-500 nhân viên",
  SIZE_501_1000: "501-1000 nhân viên",
  SIZE_1000_PLUS: "Trên 1000 nhân viên",
};

export const COMPANY_MODEL_VI: Record<CompanyModel, string> = {
  PRODUCT: "Công ty sản phẩm",
  OUTSOURCING: "Công ty outsourcing",
  CONSULTING_SOLUTION: "Tư vấn / Giải pháp",
  STARTUP: "Startup",
  CLOUD_PLATFORM: "Cloud / Nền tảng",
  RESEARCH_LAB: "Phòng nghiên cứu",
};

export const JOB_TYPE_VI: Record<JobType, string> = {
  ONSITE: "Tại văn phòng",
  HYBRID: "Kết hợp",
  REMOTE: "Làm từ xa",
  FLEXIBLE: "Linh hoạt",
};

export const EXPERIENCE_LEVEL_VI: Record<ExperienceLevel, string> = {
  INTERN: "Thực tập sinh",
  FRESHER: "Fresher",
  JUNIOR: "Junior",
  MID: "Middle",
  SENIOR: "Senior",
  LEAD: "Lead",
  MANAGER: "Quản lý",
};

export const WORKING_HOURS_VI: Record<WorkingHours, string> = {
  MON_FRI: "Thứ 2 - Thứ 6",
  MON_SAT_HALF: "Thứ 2 - Thứ 7 (nửa ngày)",
  MON_SAT: "Thứ 2 - Thứ 7",
  FLEXIBLE: "Linh hoạt",
  HYBRID: "Kết hợp (Từ xa + Văn phòng)",
  FULL_REMOTE: "Làm từ xa hoàn toàn",
};

export const OVERTIME_POLICY_VI: Record<OvertimePolicy, string> = {
  NO_OVERTIME: "Không làm thêm giờ",
  OPTIONAL: "Tự nguyện",
  OCCASIONAL: "Thỉnh thoảng khi cần",
  PAID_OT: "Được trả lương OT / Nghỉ bù",
  FREQUENT: "Thường xuyên",
};

export const APPLICATION_STATUS_VI: Record<ApplicationStatus, string> = {
  PENDING: "Chờ xét duyệt",
  ACCEPTED: "Đã chấp nhận",
  REJECTED: "Đã từ chối",
};

export const JOB_STATUS_VI: Record<JobStatus, string> = {
  ACTIVE: "Đang tuyển",
  CLOSED: "Đã đóng",
  DRAFT: "Bản nháp",
  EXPIRED: "Hết hạn",
};

export const GENDER_VI: Record<Gender, string> = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHERS: "Khác",
};

export const USER_STATUS_VI: Record<UserStatus, string> = {
  PENDING_ACTIVATION: "Chờ kích hoạt",
  ACTIVE: "Đang hoạt động",
  DISABLED: "Đã vô hiệu hóa",
};

export const ROLE_VI: Record<Role, string> = {
  ADMIN: "Quản trị viên",
  EMPLOYER: "Nhà tuyển dụng",
  SEEKER: "Người tìm việc",
};

// ---------------------------------------------------------------------------
// Generic converter
// ---------------------------------------------------------------------------

/**
 * Chuyển đổi giá trị enum từ backend thành nhãn tiếng Việt.
 *
 * @example
 * toVI("SIZE_1_10", COMPANY_SIZE_VI)   // "1-10 nhân viên"
 * toVI("ONSITE", JOB_TYPE_VI)          // "Tại văn phòng"
 * toVI("UNKNOWN", JOB_TYPE_VI)         // "UNKNOWN"  (fallback)
 */
export function toVI<T extends string>(
  value: T,
  labelMap: Record<T, string>,
): string {
  return labelMap[value] ?? value;
}
