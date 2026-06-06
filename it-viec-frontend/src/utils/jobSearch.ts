import type { CityResponse } from "@/types/response.types";

const normalizeWhitespace = (value: string) => value.trim().replace(/\s+/g, " ");

export const normalizeSearchKeyword = (value?: string) =>
  value ? normalizeWhitespace(value) : "";

export const slugifySearchSegment = (value?: string) => {
  const normalized = normalizeSearchKeyword(value);
  if (!normalized) {
    return "";
  }

  return normalized
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const deslugifySearchSegment = (value?: string) => {
  if (!value) {
    return "";
  }

  return normalizeSearchKeyword(decodeURIComponent(value).replace(/-/g, " "));
};

export const buildJobSearchPath = (params: { keyword?: string; city?: string }) => {
  const keywordSegment = slugifySearchSegment(params.keyword);
  const citySegment = slugifySearchSegment(params.city);

  if (keywordSegment && citySegment) {
    return `/viec-lam-it/${keywordSegment}/${citySegment}`;
  }

  if (keywordSegment) {
    return `/viec-lam-it/${keywordSegment}`;
  }

  if (citySegment) {
    return `/viec-lam-it/${citySegment}`;
  }

  return "/viec-lam-it";
};

export const findCityBySegment = (
  segment: string | undefined,
  cities: CityResponse[],
) => {
  if (!segment) {
    return null;
  }

  const normalizedSegment = slugifySearchSegment(segment);
  return (
    cities.find((city) => slugifySearchSegment(city.cityName) === normalizedSegment) ?? null
  );
};
