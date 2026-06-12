import type { SalaryCurrency } from "@/types/common.types";

export interface SalaryDisplayJob {
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: SalaryCurrency | null;
}

export const SALARY_RANGE_LIMITS: Record<
  SalaryCurrency,
  { min: number; max: number; step: number }
> = {
  VND: { min: 0, max: 100_000_000, step: 500_000 },
  USD: { min: 0, max: 10_000, step: 100 },
};

export function getSalaryCurrencyByLocale(language: string): SalaryCurrency {
  return language.startsWith("vi") ? "VND" : "USD";
}

function formatVnd(value: number): string {
  return value.toLocaleString("vi-VN");
}

function formatUsd(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatSalaryAmount(value: number, currency: SalaryCurrency): string {
  return currency === "VND" ? formatVnd(value) : formatUsd(value);
}

export function formatSalaryRange(
  min: number,
  max: number,
  currency: SalaryCurrency,
): string {
  if (currency === "VND") {
    return `${formatVnd(min)} - ${formatVnd(max)}đ`;
  }
  return `${formatUsd(min)} - ${formatUsd(max)}$`;
}

export function formatSalaryRangeForFilter(
  min: number,
  max: number,
  currency: SalaryCurrency,
): string {
  if (currency === "VND") {
    return `${formatVnd(min)} - ${formatVnd(max)}đ`;
  }
  return `${formatUsd(min)}$ - ${formatUsd(max)}$`;
}

export function formatJobSalary(
  job: SalaryDisplayJob,
  negotiableLabel: string,
): string {
  if (
    job.salaryMin != null &&
    job.salaryMax != null &&
    job.salaryCurrency
  ) {
    return formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryCurrency);
  }
  return negotiableLabel;
}
