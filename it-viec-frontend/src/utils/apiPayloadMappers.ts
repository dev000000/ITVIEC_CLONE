import type {
  ApplicationStatus,
  CompanyModel,
  CompanySize,
  ExperienceLevel,
  Gender,
  JobStatus,
  JobType,
  OvertimePolicy,
  WorkingHours,
} from "@/types/common.types";
import type {
  CityResponse,
  CountryResponse,
  SkillResponse,
} from "@/types/response.types";

interface EntityRef {
  id: number | string;
}

const normalize = (value: unknown): string =>
  String(value ?? "").trim().toLowerCase();

export const toEntityRef = (id: number | string | undefined): EntityRef | undefined =>
  id === undefined || id === "" ? undefined : { id };

export const findCityRef = (
  value: unknown,
  cities: CityResponse[],
  fallback?: CityResponse,
): EntityRef | undefined => {
  const normalizedValue = normalize(value);
  const city = cities.find(
    (item) =>
      normalize(item.id) === normalizedValue ||
      normalize(item.cityName) === normalizedValue,
  );

  return toEntityRef(city?.id ?? fallback?.id);
};

export const findCountryRef = (
  value: unknown,
  countries: CountryResponse[],
  fallback?: CountryResponse,
): EntityRef | undefined => {
  const normalizedValue = normalize(value);
  const country = countries.find(
    (item) =>
      normalize(item.id) === normalizedValue ||
      normalize(item.countryName) === normalizedValue,
  );

  return toEntityRef(country?.id ?? fallback?.id ?? countries[0]?.id);
};

export const findSkillRefs = (
  values: unknown,
  skills: SkillResponse[],
): EntityRef[] => {
  const selectedValues = Array.isArray(values) ? values : [];

  return selectedValues
    .map((value) => {
      const normalizedValue = normalize(value);
      const skill = skills.find(
        (item) =>
          normalize(item.id) === normalizedValue ||
          normalize(item.skillName) === normalizedValue,
      );

      return toEntityRef(skill?.id);
    })
    .filter((item): item is EntityRef => Boolean(item));
};

export const findCityRefs = (
  values: unknown,
  cities: CityResponse[],
): EntityRef[] => {
  const selectedValues = Array.isArray(values) ? values : [];

  return selectedValues
    .map((value) => findCityRef(value, cities))
    .filter((item): item is EntityRef => Boolean(item));
};

export const toGender = (value: unknown): Gender => {
  const normalizedValue = normalize(value);

  if (normalizedValue === "others" || normalizedValue.includes("kh")) {
    return "OTHERS";
  }

  if (normalizedValue === "female" || normalizedValue.includes("n")) {
    return normalizedValue === "nam" ? "MALE" : "FEMALE";
  }

  return "MALE";
};

export const toJobType = (value: unknown): JobType => {
  const normalizedValue = normalize(value);

  if (normalizedValue === "remote" || normalizedValue.includes("xa")) {
    return "REMOTE";
  }

  if (normalizedValue === "hybrid") {
    return "HYBRID";
  }

  if (normalizedValue === "flexible" || normalizedValue.includes("linh")) {
    return "FLEXIBLE";
  }

  return "ONSITE";
};

export const toExperienceLevel = (value: unknown): ExperienceLevel => {
  const normalizedValue = normalize(value);

  if (normalizedValue === "mid" || normalizedValue === "middle") return "MID";
  if (normalizedValue === "senior") return "SENIOR";
  if (normalizedValue === "lead") return "LEAD";
  if (normalizedValue === "manager") return "MANAGER";
  if (normalizedValue === "fresher") return "FRESHER";
  if (normalizedValue === "intern") return "INTERN";

  return "JUNIOR";
};

export const toJobStatus = (value: unknown): JobStatus => {
  const normalizedValue = normalize(value);

  if (normalizedValue === "closed") return "CLOSED";
  if (normalizedValue === "draft") return "DRAFT";
  if (normalizedValue === "expired") return "EXPIRED";

  return "ACTIVE";
};

export const toApplicationStatus = (value: unknown): ApplicationStatus => {
  const normalizedValue = normalize(value);

  if (normalizedValue === "accepted") return "ACCEPTED";
  if (normalizedValue === "rejected") return "REJECTED";

  return "PENDING";
};

export const toCompanyModel = (value: unknown): CompanyModel => {
  const normalizedValue = normalize(value);

  if (normalizedValue.includes("outsourcing")) return "OUTSOURCING";
  if (normalizedValue.includes("consult")) return "CONSULTING_SOLUTION";
  if (normalizedValue.includes("startup")) return "STARTUP";
  if (normalizedValue.includes("cloud")) return "CLOUD_PLATFORM";
  if (normalizedValue.includes("research")) return "RESEARCH_LAB";

  return "PRODUCT";
};

export const toCompanySize = (value: unknown): CompanySize => {
  const normalizedValue = normalize(value);

  if (normalizedValue.includes("1001") || normalizedValue.includes("1000+")) {
    return "SIZE_1000_PLUS";
  }
  if (normalizedValue.includes("501")) return "SIZE_501_1000";
  if (normalizedValue.includes("301")) return "SIZE_301_500";
  if (normalizedValue.includes("151") || normalizedValue.includes("101")) {
    return "SIZE_151_300";
  }
  if (normalizedValue.includes("51")) return "SIZE_51_150";
  if (normalizedValue.includes("11")) return "SIZE_11_50";

  return "SIZE_1_10";
};

export const toWorkingHours = (value: unknown): WorkingHours => {
  const normalizedValue = normalize(value);

  if (normalizedValue.includes("remote")) return "FULL_REMOTE";
  if (normalizedValue.includes("hybrid")) return "HYBRID";
  if (normalizedValue.includes("flexible")) return "FLEXIBLE";
  if (normalizedValue.includes("sat")) return "MON_SAT";

  return "MON_FRI";
};

export const toOvertimePolicy = (value: unknown): OvertimePolicy => {
  const normalizedValue = normalize(value);

  if (normalizedValue.includes("paid") || normalizedValue.includes("salary")) {
    return "PAID_OT";
  }
  if (normalizedValue.includes("optional")) return "OPTIONAL";
  if (normalizedValue.includes("frequent")) return "FREQUENT";
  if (normalizedValue.includes("ot")) return "OCCASIONAL";

  return "NO_OVERTIME";
};
