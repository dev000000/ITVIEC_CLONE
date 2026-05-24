import { COMPANY_IMAGE_URL } from "@/constants";

export const getImageName = (name: string): string | null => {
  const company = COMPANY_IMAGE_URL.find(item => item.name === name);
  return company ? company.url : null;
};