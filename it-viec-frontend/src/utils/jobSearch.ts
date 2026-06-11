import type { CityResponse } from "@/types/response.types";

// Hàm chuyển đổi keyword thành slug
export const toSlug = (keyword: string): string => {
  if (keyword === "") return "";
  return keyword
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, " ")   // ← collapse nhiều space thành 1 space
    .replace(/ /g, "-");    // ← rồi mới đổi space thành "-"
};

// Decode slug về dạng text thường: 
export const fromSlug = (slug: string): string => {
  return slug.replace(/-/g, " ");
};

// Hàm xây dựng đường dẫn tìm kiếm việc làm dựa trên keyword và city, sẽ bỏ qua các phần nếu không có giá trị
export const buildJobSearchPath = (params: { keyword?: string; city?: string }) => {
  const keywordSegment = toSlug(params.keyword);
  const city = params.city;

  const iscityValid = city && city !== "";
  const isKeywordValid = keywordSegment && keywordSegment !== "";

  if (isKeywordValid && iscityValid) {
    return `/viec-lam-it/${keywordSegment}/${city}`;
  }

  if (isKeywordValid) {
    return `/viec-lam-it/${keywordSegment}`;
  }

  if (iscityValid) {
    return `/viec-lam-it/${city}`;
  }

  return "/viec-lam-it";
};

// Hàm lấy về city từ segment, nếu không tìm thấy thì trả về null
export const getCityBySegment = (
  param: string | undefined,
  cities: CityResponse[],
): CityResponse | null => {
  return cities.find((city) => city.slug === param) || null;
};
