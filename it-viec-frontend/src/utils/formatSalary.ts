import type { SalaryCurrency } from "@/types/common.types";

export interface SalaryDisplayJob {
  salary?: string | null;
  salaryNegotiable?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: SalaryCurrency | null;
}

export const SALARY_RANGE_LIMITS: Record<
  SalaryCurrency,
  { min: number; max: number; step: number }
> = {
  VND: { min: 0, max: 100_000_000, step: 1_000_000 },
  USD: { min: 0, max: 10_000, step: 100 },
};

export function getSalaryCurrencyByLocale(language: string): SalaryCurrency {
  return language.startsWith("vi") ? "VND" : "USD";
}

function isRoundMillion(value: number): boolean {
  return value >= 1_000_000 && value % 1_000_000 === 0;
}

function formatVnd(value: number): string {
  return value.toLocaleString("vi-VN");
}

function formatUsd(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatSalaryRange(
  min: number,
  max: number,
  currency: SalaryCurrency,
): string {
  if (currency === "VND") {
    if (isRoundMillion(min) && isRoundMillion(max)) {
      return `${min / 1_000_000}m - ${max / 1_000_000}m VND`;
    }
    return `${formatVnd(min)} - ${formatVnd(max)} VND`;
  }
  return `${formatUsd(min)} - ${formatUsd(max)}$`;
}

export function formatSalaryRangeForFilter(
  min: number,
  max: number,
  currency: SalaryCurrency,
): string {
  if (currency === "VND") {
    if (isRoundMillion(min) && isRoundMillion(max)) {
      return `${min / 1_000_000}m - ${max / 1_000_000}m VND`;
    }
    return `${formatVnd(min)} - ${formatVnd(max)} VND`;
  }
  return `${formatUsd(min)}$ - ${formatUsd(max)}$`;
}

export function formatJobSalary(
  job: SalaryDisplayJob,
  negotiableLabel: string,
): string {
  if (job.salaryNegotiable) {
    return negotiableLabel;
  }
  if (
    job.salaryMin != null &&
    job.salaryMax != null &&
    job.salaryCurrency
  ) {
    return formatSalaryRange(job.salaryMin, job.salaryMax, job.salaryCurrency);
  }
  return job.salary?.trim() || negotiableLabel;
}
