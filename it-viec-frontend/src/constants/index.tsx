import type { TFunction } from "i18next";


interface CompanyImageItem {
  name: string;
  url: string;
}

export const PHONE_NUMBER_REGEX =
  /^(0(?:3[2-9]|5[6-9]|7(?:0|6|7|8|9)|8[0-9]|9[0-9]))[0-9]{7}$/;

export const getGenderOptions = (t: TFunction) => [
  { value: "MALE", label: t("common:gender.male") },
  { value: "FEMALE", label: t("common:gender.female") },
  { value: "OTHERS", label: t("common:gender.others") },
];

export const getApplicationStatusOptions = (t: TFunction) => [
  { value: "PENDING", label: t("common:applicationStatus.pending") },
  { value: "ACCEPTED", label: t("common:applicationStatus.accepted") },
  { value: "REJECTED", label: t("common:applicationStatus.rejected") },
];

export const getCompanyModelOptions = (t: TFunction) => [
  { value: "PRODUCT", label: t("common:companyModel.product") },
  { value: "OUTSOURCING", label: t("common:companyModel.outsourcing") },
  { value: "CONSULTING_SOLUTION", label: t("common:companyModel.consultingSolution") },
  { value: "STARTUP", label: t("common:companyModel.startup") },
  { value: "CLOUD_PLATFORM", label: t("common:companyModel.cloudPlatform") },
  { value: "RESEARCH_LAB", label: t("common:companyModel.researchLab") },
];

export const getCompanySizeOptions = (t: TFunction) => [
  { value: "SIZE_1_10", label: t("common:companySize.size1_10") },
  { value: "SIZE_11_50", label: t("common:companySize.size11_50") },
  { value: "SIZE_51_150", label: t("common:companySize.size51_150") },
  { value: "SIZE_151_300", label: t("common:companySize.size151_300") },
  { value: "SIZE_301_500", label: t("common:companySize.size301_500") },
  { value: "SIZE_501_1000", label: t("common:companySize.size501_1000") },
  { value: "SIZE_1000_PLUS", label: t("common:companySize.size1000Plus") },
];

export const getExperienceLevelOptions = (t: TFunction) => [
  { value: "INTERN", label: t("common:experienceLevel.intern") },
  { value: "FRESHER", label: t("common:experienceLevel.fresher") },
  { value: "JUNIOR", label: t("common:experienceLevel.junior") },
  { value: "MID", label: t("common:experienceLevel.mid") },
  { value: "SENIOR", label: t("common:experienceLevel.senior") },
  { value: "LEAD", label: t("common:experienceLevel.lead") },
  { value: "MANAGER", label: t("common:experienceLevel.manager") },
];

export const getJobStatusOptions = (t: TFunction) => [
  { value: "ACTIVE", label: t("common:jobStatus.active") },
  { value: "CLOSED", label: t("common:jobStatus.closed") },
  { value: "DRAFT", label: t("common:jobStatus.draft") },
  { value: "EXPIRED", label: t("common:jobStatus.expired") },
];

export const getJobTypeOptions = (t: TFunction) => [
  { value: "ONSITE", label: t("common:jobType.onsite") },
  { value: "HYBRID", label: t("common:jobType.hybrid") },
  { value: "REMOTE", label: t("common:jobType.remote") },
  { value: "FLEXIBLE", label: t("common:jobType.flexible") },
];

export const getRoleOptions = (t: TFunction) => [
  { value: "ADMIN", label: t("common:roles.admin") },
  { value: "EMPLOYER", label: t("common:roles.employer") },
  { value: "SEEKER", label: t("common:roles.seeker") },
];

export const getOvertimePolicyOptions = (t: TFunction) => [
  { value: "NO_OVERTIME", label: t("common:overtimePolicy.noOvertime") },
  { value: "OPTIONAL", label: t("common:overtimePolicy.optional") },
  { value: "OCCASIONAL", label: t("common:overtimePolicy.occasional") },
  { value: "PAID_OT", label: t("common:overtimePolicy.paidOt") },
  { value: "FREQUENT", label: t("common:overtimePolicy.frequent") },
];

export const getUserStatusOptions = (t: TFunction) => [
  { value: "PENDING_ACTIVATION", label: t("common:userStatus.pendingActivation") },
  { value: "ACTIVE", label: t("common:userStatus.active") },
  { value: "DISABLED", label: t("common:userStatus.disabled") },
];

export const getWorkingHoursOptions = (t: TFunction) => [
  { value: "MON_FRI", label: t("common:workingHours.monFri") },
  { value: "MON_SAT_HALF", label: t("common:workingHours.monSatHalf") },
  { value: "MON_SAT", label: t("common:workingHours.monSat") },
  { value: "FLEXIBLE", label: t("common:workingHours.flexible") },
  { value: "HYBRID", label: t("common:workingHours.hybrid") },
  { value: "FULL_REMOTE", label: t("common:workingHours.fullRemote") },
];

// City name to i18n key mapping
const cityNameToKeyMap: Record<string, string> = {
  "Tuyên Quang": "tuyenquang",
  "Lào Cai": "laocai",
  "Thái Nguyên": "thainguyen",
  "Phú Thọ": "phutho",
  "Bắc Ninh": "bacninh",
  "Hưng Yên": "hungyen",
  "Hải Phòng": "haiphong",
  "Ninh Bình": "ninhbinh",
  "Quảng Trị": "quangtri",
  "Đà Nẵng": "danang",
  "Quảng Ngãi": "quangngai",
  "Gia Lai": "gialai",
  "Khánh Hòa": "khanhoa",
  "Lâm Đồng": "lamdong",
  "Đắk Lắk": "daklak",
  "Hồ Chí Minh": "hochiminh",
  "Đồng Nai": "dongnai",
  "Tây Ninh": "tayninh",
  "Cần Thơ": "cantho",
  "Vĩnh Long": "vinhlong",
  "Đồng Tháp": "dongthaap",
  "Cà Mau": "camau",
  "An Giang": "angiang",
  "Hà Nội": "hanoi",
  "Huế": "hue",
  "Lai Châu": "laichau",
  "Điện Biên": "dienbien",
  "Sơn La": "sonla",
  "Lạng Sơn": "langson",
  "Quảng Ninh": "quangninh",
  "Thanh Hóa": "thanhhoa",
  "Nghệ An": "nghean",
  "Hà Tĩnh": "hatinh",
  "Cao Bằng": "caobang",
  "Others": "others",
};

export const getCityLabel = (cityName: string | undefined, t: TFunction): string => {
  if (!cityName) return "";
  const key = cityNameToKeyMap[cityName] || "others";
  return t(`common:cities.${key}`, { defaultValue: cityName });
};

export const COMPANY_IMAGE_URL: CompanyImageItem[] = [
  { name: "mb-bank", url: "MBLOGO.webp" },
  { name: "scandinavian-software-park", url: "ScandinavianLOGO.webp" },
  { name: "one-tech-stop-vietnam-company-ltd", url: "OTSVLOGO.webp" },
  { name: "mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei", url: "MCREDITLOGO.webp" },
  { name: "tymex", url: "TYMEXLOGO.webp" },
  { name: "andpad-vietnam-co-ltd", url: "ANDPADLOGO.webp" },
  { name: "employment-hero", url: "EmploymentHeroLOGO.webp" },
  { name: "bosch-global-software-technologies-company-limited", url: "BoschLOGO.webp" },
  { name: "ssi-securities-corporation", url: "SSILOGO.webp" },
];
